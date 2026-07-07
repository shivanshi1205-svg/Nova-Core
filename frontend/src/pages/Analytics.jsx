import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import PageWrapper from '../components/layout/PageWrapper';
import useAuthStore from '../store/authStore';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const data = [
  { name: 'Jan', revenue: 4000, tasks: 240, activeUsers: 2400 },
  { name: 'Feb', revenue: 3000, tasks: 139, activeUsers: 2210 },
  { name: 'Mar', revenue: 2000, tasks: 980, activeUsers: 2290 },
  { name: 'Apr', revenue: 2780, tasks: 390, activeUsers: 2000 },
  { name: 'May', revenue: 1890, tasks: 480, activeUsers: 2181 },
  { name: 'Jun', revenue: 2390, tasks: 380, activeUsers: 2500 },
  { name: 'Jul', revenue: 3490, tasks: 430, activeUsers: 2100 },
];

const Analytics = () => {
  const { user } = useAuthStore();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    if (user?.token) {
      fetch('http://localhost:5000/api/ai/insights', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
        .then(res => res.json())
        .then(data => setInsights(data.insights))
        .catch(console.error);
    }
  }, [user]);

  return (
    <PageWrapper className="space-y-6">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Real-time data visualization and AI-generated insights.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-6">Revenue & User Growth</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e81cff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#e81cff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="activeUsers" stroke="#e81cff" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live AI Insights
          </h3>
          <div className="flex-1 space-y-4">
            {insights.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">Generating insights...</div>
            ) : (
              insights.map((insight, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${
                  insight.type === 'warning' ? 'bg-orange-500/10 border-orange-500/20' :
                  insight.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20' :
                  'bg-blue-500/10 border-blue-500/20'
                }`}>
                  <h4 className={`text-sm font-bold mb-1 ${
                    insight.type === 'warning' ? 'text-orange-400' :
                    insight.type === 'success' ? 'text-emerald-400' :
                    'text-blue-400'
                  }`}>{insight.title}</h4>
                  <p className="text-xs text-muted-foreground">{insight.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Task Velocity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default Analytics;
