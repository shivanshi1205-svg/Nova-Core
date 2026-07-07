import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderKanban, MoreVertical } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import useAuthStore from '../store/authStore';
import useProjectStore from '../store/projectStore';
import { Link } from 'react-router-dom';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
  const { user } = useAuthStore();
  const { projects, fetchProjects, isLoading, createProject } = useProjectStore();
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    if (user?.token) {
      fetchProjects(user.token);
    }
  }, [user, fetchProjects]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    await createProject(newProject, user.token);
    setShowModal(false);
    setNewProject({ title: '', description: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Completed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <PageWrapper className="space-y-6">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your active workspaces and teams.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
        >
          <Plus size={18} />
          New Project
        </button>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <motion.div variants={itemVariants} className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <FolderKanban size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No projects yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">Get started by creating your first project to manage tasks and collaborate with your team.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Create Project
          </button>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm flex-1 line-clamp-2 mb-6">{project.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-card flex items-center justify-center text-xs text-primary font-bold">U1</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-card flex items-center justify-center text-xs text-purple-400 font-bold">U2</div>
                </div>
                <Link 
                  to={`/dashboard/tasks?projectId=${project._id}`}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View Board &rarr;
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                  placeholder="e.g. Website Redesign" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground h-24 resize-none" 
                  placeholder="What is this project about?" 
                  required
                ></textarea>
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Projects;
