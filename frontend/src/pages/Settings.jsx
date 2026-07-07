import { motion } from 'framer-motion';
import { User, Lock, Bell, Palette, Database, Shield } from 'lucide-react';
import useAuthStore from '../store/authStore';
import PageWrapper from '../components/layout/PageWrapper';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Settings = () => {
  const { user } = useAuthStore();

  return (
    <PageWrapper className="max-w-4xl space-y-8">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, workspace, and AI preferences.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium transition-colors">
            <User size={18} />
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
            <Shield size={18} />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={18} />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
            <Palette size={18} />
            Appearance
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
            <Database size={18} />
            Data & Storage
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-card p-6 hover-3d">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <button className="bg-white/10 hover:bg-white/20 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                    Change Avatar
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input type="email" defaultValue={user?.email} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-foreground" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 hover-3d">
            <h3 className="text-xl font-bold mb-4">AI Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                <div>
                  <h4 className="font-medium text-foreground">Proactive AI Insights</h4>
                  <p className="text-sm text-muted-foreground">Allow AI to analyze your workspace and provide suggestions.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default Settings;
