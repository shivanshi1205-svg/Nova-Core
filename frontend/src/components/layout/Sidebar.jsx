import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  FolderOpen, 
  PieChart, 
  MessageSquare,
  Settings
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import MagneticButton from '../ui/MagneticButton';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/dashboard/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'Documents', path: '/dashboard/documents', icon: FolderOpen },
    { name: 'Analytics', path: '/dashboard/analytics', icon: PieChart },
  ];

  return (
    <div className="w-64 h-screen bg-card/50 backdrop-blur-xl border-r border-border flex flex-col justify-between hidden md:flex sticky top-0 z-40">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-foreground">Nova-Core</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <MagneticButton key={item.name} className="w-full">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-primary' : ''} />
                  {item.name}
                </Link>
              </MagneticButton>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <MagneticButton className="w-full">
          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full ${
              location.pathname === '/dashboard/settings'
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <Settings size={18} />
            Settings
          </Link>
        </MagneticButton>
        
        <div className="mt-4 flex items-center gap-3 px-3 py-2 bg-black/20 rounded-lg border border-white/5">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
