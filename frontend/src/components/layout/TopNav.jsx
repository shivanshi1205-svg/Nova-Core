import { useState, useRef, useEffect } from 'react';
import { Bell, Search, LogOut, Menu, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const TopNav = ({ onOpenCommandMenu }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-muted-foreground hover:text-foreground">
          <Menu size={20} />
        </button>
        
        {/* Global Search */}
        <div className="relative max-w-md w-full hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search across workspace (Ctrl+K)..." 
            className="w-full bg-black/20 border border-white/5 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground transition-all cursor-pointer"
            onClick={onOpenCommandMenu}
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <MagneticButton>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card"></span>
          </button>
        </MagneticButton>

        <AnimatePresence>
          {showNotifications && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full mt-4 right-0 w-80 glass-card bg-card/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold">Notifications</h3>
                <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                  <Check size={12} /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">New document shared</p>
                  <p className="text-xs text-muted-foreground mt-1">Sarah Jenkins shared "Q3 Financial Report" with you.</p>
                  <p className="text-xs text-primary mt-2">10 minutes ago</p>
                </div>
                <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer bg-primary/5">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">Project milestone reached</p>
                    <span className="w-2 h-2 rounded-full bg-primary mt-1"></span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">"Project Phoenix" has hit 90% completion. Great job team!</p>
                  <p className="text-xs text-primary mt-2">1 hour ago</p>
                </div>
                <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">System Update</p>
                  <p className="text-xs text-muted-foreground mt-1">Nova-Core v2.1 has been deployed successfully.</p>
                  <p className="text-xs text-primary mt-2">Yesterday</p>
                </div>
              </div>
              <div className="p-3 border-t border-white/10 text-center">
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-6 w-px bg-border mx-2"></div>
        
        <MagneticButton>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </MagneticButton>
      </div>
    </header>
  );
};

export default TopNav;
