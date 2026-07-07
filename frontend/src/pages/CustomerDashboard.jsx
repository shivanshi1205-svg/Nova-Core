import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  FolderKanban, 
  CheckSquare,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from '../store/authStore';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import TiltCard from '../components/ui/TiltCard';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <PageWrapper className="space-y-8">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in your workspace today.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TiltCard className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Activity size={24} />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={16} className="mr-1" /> +12.5%
            </span>
          </div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">Active Projects</h3>
          <div className="text-3xl font-bold">24</div>
        </TiltCard>

        <TiltCard className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <Users size={24} />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={16} className="mr-1" /> +4.2%
            </span>
          </div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">Team Members</h3>
          <div className="text-3xl font-bold">142</div>
        </TiltCard>

        <TiltCard className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center text-sm font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
              <ArrowDownRight size={16} className="mr-1" /> -1.8%
            </span>
          </div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">Avg Completion</h3>
          <div className="text-3xl font-bold">4.2 Days</div>
        </TiltCard>

        <TiltCard className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
              <Zap size={24} />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={16} className="mr-1" /> +8.1%
            </span>
          </div>
          <h3 className="text-muted-foreground text-sm font-medium mb-1">System Load</h3>
          <div className="text-3xl font-bold">34%</div>
        </TiltCard>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 h-96 flex flex-col">
          <h3 className="text-lg font-bold mb-4">Revenue Overview</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenueDashboard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenueDashboard)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-6 h-96 flex flex-col">
          <h3 className="text-lg font-bold mb-4">AI Insights</h3>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary mb-1">Efficiency Drop Detected</p>
              <p className="text-xs text-muted-foreground">Team "Frontend" has a 15% drop in velocity this week. Consider reviewing the current sprint load.</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm font-medium text-purple-400 mb-1">Project Milestone</p>
              <p className="text-xs text-muted-foreground">"Project Phoenix" is 90% complete. AI predicts it will be finished 2 days ahead of schedule.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default CustomerDashboard;
