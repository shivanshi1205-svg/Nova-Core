import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AIGlobe from '../components/AIGlobe';
import MagneticButton from '../components/ui/MagneticButton';

const titleText = "The Next-Generation AI Operating System";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Helmet>
        <title>Nova-Core | Next-Generation AI Operating System</title>
        <meta name="description" content="Build for the future with Nova-Core. Manage your enterprise with advanced AI analytics, 3D visualizations, and real-time collaboration tools." />
        <meta property="og:title" content="Nova-Core | AI Operating System" />
        <meta property="og:description" content="Advanced AI analytics, 3D visualizations, and real-time collaboration." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* 3D Animated Background */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen">
        <AIGlobe />
      </div>

      {/* Background gradients for added depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-foreground">Nova-Core</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
          <MagneticButton>
            <Link to="/register" className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 inline-block">Get Started</Link>
          </MagneticButton>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-primary font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Nova-Core v1.0 is live
        </motion.div>

        <div className="flex flex-col items-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-2">
            The Next-Generation
          </h1>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight flex">
            {titleText.split(" ").slice(2).map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, type: "spring" }}
                className="text-gradient mr-4 inline-block origin-bottom"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12"
        >
          Manage your enterprise with advanced AI analytics, 3D visualizations, and real-time collaboration tools. Build for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton>
            <Link to="/register" className="px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 inline-flex">
              Start for free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/contact" className="px-8 py-4 rounded-full glass-panel font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 inline-flex">
              Book a Demo
            </Link>
          </MagneticButton>
        </motion.div>

      </main>
    </div>
  );
};

export default LandingPage;
