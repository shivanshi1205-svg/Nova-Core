import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import useProjectStore from '../store/projectStore';
import PageWrapper from '../components/layout/PageWrapper';
import { format } from 'date-fns';

const COLUMNS = ['Todo', 'In Progress', 'Review', 'Done'];

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Tasks = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const navigate = useNavigate();
  
  const { user } = useAuthStore();
  const { projects, tasks, fetchTasks, createTask, updateTask } = useProjectStore();
  
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', status: 'Todo' });

  // Get current project details
  const project = projects.find(p => p._id === projectId);

  useEffect(() => {
    if (!projectId) {
      navigate('/dashboard/projects');
      return;
    }
    if (user?.token) {
      fetchTasks(projectId, user.token);
    }
  }, [projectId, user, fetchTasks, navigate]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destStatus = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceStatus === destStatus && result.source.index === result.destination.index) {
      return;
    }

    // Update locally and in DB
    if (sourceStatus !== destStatus) {
      await updateTask(projectId, taskId, { status: destStatus }, user.token);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    await createTask(projectId, newTask, user.token);
    setShowModal(false);
    setNewTask({ title: '', description: '', priority: 'Medium', status: 'Todo' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Medium': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Low': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  if (!project) return null;

  return (
    <PageWrapper className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <button 
            onClick={() => navigate('/dashboard/projects')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Projects
          </button>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl truncate">{project.description}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm text-primary font-bold z-10">U1</div>
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-background flex items-center justify-center text-sm text-purple-400 font-bold z-0">U2</div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex-1 min-h-[600px] overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 h-full min-w-max">
            {COLUMNS.map(columnId => {
              const columnTasks = tasks.filter(t => t.status === columnId);
              
              return (
                <div key={columnId} className="w-80 flex flex-col bg-card/20 rounded-xl border border-white/5 h-full overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-card/40">
                    <h3 className="font-bold flex items-center gap-2">
                      {columnId}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground font-medium">
                        {columnTasks.length}
                      </span>
                    </h3>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}`}
                      >
                        {columnTasks.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`glass-card p-4 hover:border-primary/30 transition-colors cursor-grab active:cursor-grabbing ${snapshot.isDragging ? 'rotate-2 shadow-2xl scale-105 border-primary/50' : ''}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </div>
                                </div>
                                <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                                {task.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{task.description}</p>}
                                
                                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar size={12} />
                                    <span>{format(new Date(task.createdAt), 'MMM d')}</span>
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-bold">
                                    ?
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </motion.div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                  placeholder="e.g. Design Landing Page" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground h-24 resize-none" 
                  placeholder="Task details..." 
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  >
                    {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  >
                    {['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all shadow-lg shadow-primary/25"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Tasks;
