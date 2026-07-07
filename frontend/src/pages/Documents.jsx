import { motion } from 'framer-motion';
import { FileText, Folder, MoreVertical, Plus, UploadCloud } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const recentDocs = [
  { id: 1, name: 'Q3 Financial Report.pdf', type: 'file', size: '2.4 MB', date: '2 hrs ago' },
  { id: 2, name: 'Project Phoenix Assets', type: 'folder', size: '--', date: '5 hrs ago' },
  { id: 3, name: 'Design System Guidelines.fig', type: 'file', size: '15.8 MB', date: '1 day ago' },
  { id: 4, name: 'API Documentation.md', type: 'file', size: '45 KB', date: '2 days ago' },
];

const Documents = () => {
  return (
    <PageWrapper className="space-y-8">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents & Assets</h1>
          <p className="text-muted-foreground mt-1">Manage all your files in the Nova-Core decentralized vault.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/10">
            <Folder size={18} />
            New Folder
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            <UploadCloud size={18} />
            Upload
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {recentDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${doc.type === 'folder' ? 'bg-blue-500/10 text-blue-400' : 'bg-primary/10 text-primary'}`}>
                      {doc.type === 'folder' ? <Folder size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 hover-3d flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img 
            src="/holo-docs.png" 
            alt="Holographic Documents" 
            className="w-48 h-48 object-cover rounded-xl mb-6 shadow-[0_0_30px_rgba(79,70,229,0.2)] transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <h3 className="text-xl font-bold mb-2">Decentralized Storage</h3>
          <p className="text-sm text-muted-foreground mb-6">Your files are encrypted and distributed across the Nova-Core network for ultimate security.</p>
          <button className="bg-white/10 hover:bg-white/20 text-foreground px-6 py-2 rounded-full text-sm font-medium transition-colors border border-white/10">
            View Storage Settings
          </button>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default Documents;
