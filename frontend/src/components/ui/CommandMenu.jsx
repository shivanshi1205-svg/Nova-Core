import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderKanban, CheckSquare, Users, Settings, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const commands = [
  { id: 'projects', title: 'Projects', icon: FolderKanban, path: '/dashboard/projects' },
  { id: 'tasks', title: 'Tasks', icon: CheckSquare, path: '/dashboard/tasks' },
  { id: 'team', title: 'Team', icon: Users, path: '/dashboard/team' },
  { id: 'analytics', title: 'Analytics', icon: PieChart, path: '/dashboard/analytics' },
  { id: 'settings', title: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

const CommandMenu = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  const filteredCommands = commands.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl bg-card border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-white/5">
              <Search className="text-muted-foreground mr-3" size={20} />
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-4 outline-none text-foreground text-lg"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">ESC</span>
            </div>
            
            <div className="p-2 max-h-80 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No results found.</div>
              ) : (
                filteredCommands.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={command.id}
                      onClick={() => handleSelect(command.path)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors text-left"
                    >
                      <Icon size={18} />
                      <span className="font-medium">{command.title}</span>
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
