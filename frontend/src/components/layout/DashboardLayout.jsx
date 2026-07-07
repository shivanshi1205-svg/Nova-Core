import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import FloatingAIWidget from '../FloatingAIWidget';
import { FloatingShapes } from '../ui/FloatingGeometry';
import CommandMenu from '../ui/CommandMenu';
import { useState } from 'react';
import { ParticleField } from '../BackgroundParticles';
import { Canvas } from '@react-three/fiber';

const DashboardLayout = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ParticleField />
          <FloatingShapes />
        </Canvas>
      </div>
      <CommandMenu isOpen={isCommandMenuOpen} setIsOpen={setIsCommandMenuOpen} />
      
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav onOpenCommandMenu={() => setIsCommandMenuOpen(true)} />
          <main className="flex-1 overflow-auto p-6 md:p-8 relative">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
        <FloatingAIWidget />
      </div>
    </div>
  );
};

export default DashboardLayout;
