import { motion } from 'framer-motion';
import { Mail, Phone, MoreVertical, Plus } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Lead Designer',
    email: 'sarah.j@novacore.ai',
    avatar: 'SJ',
    status: 'online',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    email: 'michael.c@novacore.ai',
    avatar: 'MC',
    status: 'online',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Emma Watson',
    role: 'Product Manager',
    email: 'emma.w@novacore.ai',
    avatar: 'EW',
    status: 'offline',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 4,
    name: 'David Miller',
    role: 'Data Scientist',
    email: 'david.m@novacore.ai',
    avatar: 'DM',
    status: 'online',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 5,
    name: 'Jessica Lee',
    role: 'UX Researcher',
    email: 'jessica.l@novacore.ai',
    avatar: 'JL',
    status: 'offline',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 6,
    name: 'Alex Rivera',
    role: 'DevOps Engineer',
    email: 'alex.r@novacore.ai',
    avatar: 'AR',
    status: 'online',
    color: 'from-indigo-500 to-blue-500',
  },
];

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Team = () => {
  return (
    <PageWrapper className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage your team and their roles across the workspace.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
          <Plus size={18} />
          Invite Member
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={member.id} className="glass-card p-6 flex flex-col relative group overflow-hidden">
            <div className="absolute top-4 right-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-foreground">
              <MoreVertical size={20} />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${member.status === 'online' ? 'bg-emerald-500' : 'bg-muted-foreground'}`}></div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-around">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={16} />
                Email
              </button>
              <div className="w-px h-4 bg-white/10"></div>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={16} />
                Call
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </PageWrapper>
  );
};

export default Team;
