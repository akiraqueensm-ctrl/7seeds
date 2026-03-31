/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment,
  Text,
  Float as FloatDrei
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Play, 
  Search, 
  Lock, 
  Wallet, 
  PenTool, 
  ShieldCheck, 
  ChevronDown, 
  ExternalLink,
  Youtube,
  Info,
  HelpCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

// --- 3D Components ---

const Tunnel = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rings = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        z: -i * 4,
        rotation: Math.random() * Math.PI,
        scale: 1 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.getElapsedTime() * 2) % 4;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]} scale={ring.scale}>
          <ringGeometry args={[3.5, 4, 4, 1]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.1 - (i * 0.005)} wireframe />
        </mesh>
      ))}
    </group>
  );
};

const MysteriousObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial 
          color="#00ff88" 
          speed={4} 
          distort={0.6} 
          radius={1} 
          emissive="#00ff88"
          emissiveIntensity={1}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 300 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 40;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.z = state.clock.getElapsedTime() * 0.02;
      points.current.position.z = (state.clock.getElapsedTime() * 1) % 5;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ff88" transparent opacity={0.3} />
    </points>
  );
};

const TunnelScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 2]} intensity={2} color="#00ff88" />
        <Suspense fallback={null}>
          <Tunnel />
          <MysteriousObject />
          <Particles count={400} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60" />
    </div>
  );
};

// --- Components ---

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span 
        animate={{ 
          x: [-2, 2, -1, 0, 1],
          opacity: [0, 0.5, 0, 0.3, 0]
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
        className="absolute inset-0 text-red-500 z-0 select-none"
      >
        {text}
      </motion.span>
      <motion.span 
        animate={{ 
          x: [2, -2, 1, 0, -1],
          opacity: [0, 0.5, 0, 0.3, 0]
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
        className="absolute inset-0 text-blue-500 z-0 select-none"
      >
        {text}
      </motion.span>
    </div>
  );
};

const CrtEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    <motion.div 
      animate={{ y: ["-100%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-full h-[10%] bg-white/5 blur-xl pointer-events-none"
    />
  </div>
);

const NoiseOverlay = () => (
  <div className="noise-overlay fixed inset-0 z-[99] pointer-events-none opacity-[0.03]" />
);

const Scanline = () => (
  <div className="scanline fixed inset-0 z-[98] pointer-events-none" />
);

const GlitchOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.97) {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 50 + Math.random() * 150);
      }
    };
    const interval = setInterval(trigger, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden mix-blend-screen opacity-30">
      <div className="absolute inset-0 bg-accent/5" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-red-500 shadow-[0_0_10px_red]" style={{ transform: `translateY(${Math.random() * 100}vh)` }} />
      <div className="absolute top-3/4 left-0 w-full h-px bg-blue-500 shadow-[0_0_10px_blue]" style={{ transform: `translateY(${Math.random() * 100}vh)` }} />
    </div>
  );
};

const Terminal = ({ lines }: { lines: string[] }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (currentLine >= lines.length) return;

    let i = 0;
    const interval = setInterval(() => {
      setText(lines[currentLine].slice(0, i + 1));
      i++;
      if (i >= lines[currentLine].length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setText("");
        }, 1200);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentLine, lines]);

  return (
    <div className="font-mono text-[10px] text-accent/60 bg-accent/[0.02] p-6 border border-accent/10 rounded backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-accent/20" />
      <div className="flex items-center gap-3 mb-4 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="uppercase tracking-[0.3em]">System_Terminal // v0.9.4_BETA</span>
      </div>
      <div className="min-h-[6em] space-y-1">
        {lines.slice(0, currentLine).map((line, i) => (
          <div key={i} className="opacity-30">{`> ${line}`}</div>
        ))}
        {currentLine < lines.length && (
          <div className="flex items-center gap-1">
            <span className="text-accent">{`> ${text}`}</span>
            <motion.div 
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              className="w-1.5 h-3 bg-accent"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">7S</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">SEVENTH SEEDS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#how-it-works" className="hover:text-accent transition-colors">How it Works</a>
          <a href="#reward" className="hover:text-accent transition-colors">Reward</a>
          <a href="#faq" className="hover:text-accent transition-colors">FAQ</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
            <Youtube size={16} />
            Watch Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const RedactedText = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block group cursor-help">
    <span className="bg-white text-transparent select-none group-hover:bg-transparent group-hover:text-inherit transition-all duration-500 px-1">
      {children}
    </span>
  </span>
);

const SectionHeading = ({ children, subtitle, number }: { children: React.ReactNode, subtitle?: string, number?: string }) => (
  <div className="mb-32 relative">
    {number && (
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="absolute -left-12 top-0 text-accent font-mono text-xs tracking-[0.5em] vertical-text hidden lg:block"
      >
        SECTION_{number}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="text-6xl md:text-9xl font-display font-black mb-8 tracking-tighter uppercase leading-[0.8]"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-white/30 max-w-2xl text-xl md:text-2xl font-serif italic leading-tight tracking-tight"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-px w-full bg-white/5 mt-12" />
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-12">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase leading-none group-hover:text-accent transition-colors">{question}</span>
        <div className={`w-12 h-12 border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 border-accent text-accent bg-accent/5' : 'text-white/30'}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-12 text-white/20 leading-tight text-2xl font-serif italic max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ClueTree = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        ],
        size: 0.05 + Math.random() * 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <mesh position={node.position as any}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.8} />
          </mesh>
          {i > 0 && i < 10 && (
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...node.position, ...nodes[0].position])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color="#00ff88" transparent opacity={0.1} />
            </line>
          )}
          {i >= 10 && (
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...node.position, ...nodes[i-5].position])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color="#00ff88" transparent opacity={0.1} />
            </line>
          )}
        </React.Fragment>
      ))}
    </group>
  );
};

const NetworkScene = () => (
  <div className="absolute inset-0 z-0 opacity-40">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Suspense fallback={null}>
        <ClueTree />
        <Particles count={200} />
      </Suspense>
    </Canvas>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-black bg-black text-white">
      <CrtEffect />
      <NoiseOverlay />
      <GlitchOverlay />
      <Navbar />
      
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 right-12 z-[60] group flex items-center gap-4 bg-black/80 backdrop-blur-md border border-white/10 p-4 hover:border-accent transition-all duration-500"
      >
        <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 group-hover:text-accent uppercase">Return_to_Surface</span>
        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all rotate-180">
          <ChevronDown size={18} />
        </div>
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <Scanline />
        <TunnelScene />
        
        {/* Background Elements Overlays */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {/* Moving Atmospheric Light */}
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [-200, 200, -200],
              y: [-100, 100, -100]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent/10 rounded-full blur-[250px]"
          />
          
          {/* Static Background Image with Grain */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.07] grayscale scale-110 mix-blend-overlay" />
          
          {/* Dynamic Light Flickers */}
          <motion.div 
            animate={{ opacity: [0.01, 0.05, 0.01, 0.08, 0.01] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.3, 0.5, 1] }}
            className="absolute inset-0 bg-accent/5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* System Status Micro-text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="flex items-center justify-center gap-8 mb-12"
            >
              <div className="h-px w-16 bg-accent/30" />
              <span className="text-[10px] font-mono tracking-[0.8em] text-accent uppercase flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                SIGNAL_LOST // RECOVERING_DATA...
              </span>
              <div className="h-px w-16 bg-accent/30" />
            </motion.div>

            <div className="relative inline-block mb-12">
              <h1 className="text-6xl md:text-9xl lg:text-[13rem] font-display font-black leading-[0.75] tracking-tighter uppercase italic">
                <GlitchText text="THE ROOTS" /> <br />
                <span className="text-accent not-italic">RUN DEEPER</span> <br />
                <span className="text-white/10">THAN CONCRETE.</span>
              </h1>
              <div className="absolute -top-12 -right-12 w-32 h-32 border-t border-r border-accent/20 hidden lg:block" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 border-b border-l border-accent/20 hidden lg:block" />
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2.5 }}
              className="text-white/30 text-xl md:text-4xl max-w-4xl mx-auto mb-20 font-serif italic leading-[1.1] tracking-tight"
            >
              "They left it buried for a reason. The vault is waiting in the dark, and the first to solve the cipher claims the seeds."
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-16"
            >
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative px-20 py-10 bg-accent text-black font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_80px_rgba(0,255,136,0.2)]"
              >
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                <span className="relative flex items-center gap-8 tracking-[0.4em] text-xs font-mono">
                  INITIATE_DESCENT
                  <Play size={24} fill="currentColor" />
                </span>
              </a>
              
              <a 
                href="#about" 
                className="group px-20 py-10 bg-transparent hover:bg-accent/5 text-white/40 hover:text-accent border border-white/10 hover:border-accent/30 transition-all duration-700 relative overflow-hidden"
              >
                <span className="relative font-mono font-bold tracking-[0.4em] text-xs">
                  VIEW_PROTOCOL
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Depth Gauge / Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.8em] text-white/10 uppercase">Current Depth: 000m</span>
            <div className="w-px h-24 bg-gradient-to-b from-accent/50 via-accent/10 to-transparent" />
          </div>
          <span className="text-[11px] font-mono tracking-[0.5em] text-white/30 uppercase animate-pulse">Scroll to descend</span>
        </motion.div>
      </section>

      {/* About Section - Dossier Style */}
      <section id="about" className="py-80 relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/[0.02] -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-6">
              <SectionHeading number="01" subtitle="A living, breathing puzzle set in a dark, atmospheric world of found-footage mystery.">
                THE <br /> DESCENT
              </SectionHeading>
              <div className="space-y-16 text-white/50 leading-[1.1] text-3xl md:text-4xl font-serif italic">
                <p>
                  "Follow the perspective of explorers trapped in a sprawling network of subterranean tunnels. Every video is a piece of a larger narrative, captured in a raw, POV style that blurs the line between fiction and reality."
                </p>
                <Terminal lines={[
                  "ESTABLISHING_CONNECTION...",
                  "DECRYPTING_SECTOR_7_LOGS...",
                  "WARNING: DATA_CORRUPTION_DETECTED",
                  "RECOVERING_FRAGMENTED_COORDINATES...",
                  "LOCATION: [REDACTED]",
                  "STATUS: ACTIVE_SEARCH"
                ]} />
                <div className="p-12 border border-accent/10 bg-accent/[0.03] font-mono text-sm tracking-widest leading-relaxed uppercase relative">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-accent" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-accent" />
                  <span className="text-accent font-bold block mb-6 text-base tracking-[0.4em]">INTELLIGENCE_REPORT // 2026</span>
                  Our videos are crafted using advanced AI generation tools. While you may notice minor visual inconsistencies, every clue, number, and symbol is placed with absolute intention.
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="col-span-2 relative aspect-video overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80" 
                  alt="Dark tunnel" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute top-8 left-8 flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-mono tracking-[0.5em] text-red-500 uppercase font-bold">REC // SECTOR_07</span>
                </div>
                <div className="absolute bottom-8 right-8 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  TIMESTAMP: 02:52:59
                </div>
              </motion.div>
              <div className="aspect-square border border-white/5 flex flex-col justify-center p-10 bg-white/[0.02] hover:bg-accent/[0.05] transition-colors duration-500">
                <span className="text-[11px] font-mono text-accent mb-6 tracking-widest">DATA_POINT_A</span>
                <h4 className="text-4xl font-display font-black leading-none mb-6 uppercase tracking-tighter">RAW <br /> FOOTAGE</h4>
                <p className="text-xs text-white/20 font-mono leading-relaxed uppercase tracking-widest">UNFILTERED POV PERSPECTIVE FROM THE DEPTHS.</p>
              </div>
              <div className="aspect-square border border-white/5 flex flex-col justify-center p-10 bg-white/[0.02] hover:bg-accent/[0.05] transition-colors duration-500">
                <span className="text-[11px] font-mono text-accent mb-6 tracking-widest">DATA_POINT_B</span>
                <h4 className="text-4xl font-display font-black leading-none mb-6 uppercase tracking-tighter">AI <br /> SYNTHESIS</h4>
                <p className="text-xs text-white/20 font-mono leading-relaxed uppercase tracking-widest">ENVIRONMENTAL GENERATION VIA NEURAL NETWORKS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Technical Grid */}
      <section id="how-it-works" className="py-80 relative border-t border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/[0.01] skew-y-6 translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading number="02" subtitle="The mystery isn't just in the footage. You must look closer than the average viewer.">
            THE <br /> <GlitchText text="PROTOCOL" />
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 border-l border-t border-white/5">
            {[
              {
                title: "DEEP_ANALYSIS",
                desc: "Clues are scattered everywhere: hidden in video frames, encoded in titles, buried in thumbnails, or pinned in the comments section."
              },
              {
                title: "ESCALATION",
                desc: "The first few seeds are simple. As the story progresses, the puzzles become exponentially harder, requiring collaboration."
              },
              {
                title: "ZERO_ASSISTANCE",
                desc: "We do not explain solutions. The community must figure it out together. Every discovery is a step closer."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="p-20 border-r border-b border-white/5 group hover:bg-accent/[0.03] transition-all duration-700 relative"
              >
                <div className="absolute top-0 right-0 w-2 h-2 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-accent font-mono text-xs mb-16 block tracking-[0.4em]">STEP_0{i+1}</span>
                <h3 className="text-5xl font-display font-black mb-10 tracking-tighter uppercase leading-none group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-white/30 leading-[1.1] text-2xl font-serif italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Objective */}
      <section className="py-48 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-32 h-32 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-16 border border-accent/20 shadow-[0_0_50px_rgba(0,255,136,0.1)]">
              <Lock className="text-accent" size={48} />
            </div>
            <SectionHeading subtitle="At the end of the journey lies the Seventh Seed.">
              THE <br /> <GlitchText text="VAULT" />
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-12 text-left mt-24">
              <div className="p-12 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                <h4 className="text-3xl font-display font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  The Locked Vault
                </h4>
                <p className="text-white/30 text-xl font-serif italic leading-tight">
                  There is a digital vault containing the final reward. It is protected by a complex, multi-layered password that can only be constructed by solving every mystery in the series.
                </p>
              </div>
              <div className="p-12 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                <h4 className="text-3xl font-display font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Winner Takes All
                </h4>
                <p className="text-white/30 text-xl font-serif italic leading-tight">
                  Only one person can be the first to unlock the vault. The moment the password is used and the reward is claimed, the game officially ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reward System - Technical Dossier */}
      <section id="reward" className="py-80 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 text-[12rem] font-display font-black text-white/[0.02] select-none pointer-events-none">PRIZE</div>
              <SectionHeading number="03" subtitle="The prize is real, verifiable, and secured by the blockchain.">
                THE <br /> <GlitchText text="REWARD" />
              </SectionHeading>
              <div className="space-y-20">
                <div className="flex gap-10 group">
                  <span className="font-mono text-accent text-sm mt-2">01</span>
                  <div className="p-8 border-l border-white/10 group-hover:border-accent transition-colors">
                    <h4 className="text-4xl font-display font-black tracking-tight uppercase mb-6">USDC_VAULT</h4>
                    <p className="text-white/30 text-2xl font-serif italic leading-tight">The reward is held in a public USDC wallet, ensuring stability and instant global accessibility. No middlemen. No <RedactedText>delays</RedactedText>.</p>
                  </div>
                </div>
                <div className="flex gap-10 group">
                  <span className="font-mono text-accent text-sm mt-2">02</span>
                  <div className="p-8 border-l border-white/10 group-hover:border-accent transition-colors">
                    <h4 className="text-4xl font-display font-black tracking-tight uppercase mb-6">COMPOUNDING_POOL</h4>
                    <p className="text-white/30 text-2xl font-serif italic leading-tight">The prize pool grows with every interaction, donation, and video release. The stakes only go <RedactedText>up</RedactedText>.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2 bg-white/5 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-6 left-6 font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">Vault_Status: [ENCRYPTED]</div>
              <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">Network: ETH_MAINNET</div>
              
              <div className="bg-black p-20 text-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <span className="text-accent font-mono text-sm tracking-[0.6em] uppercase mb-12 block relative z-10">Current_Balance</span>
                <div className="text-8xl md:text-[10rem] font-display font-black text-white tracking-tighter mb-16 leading-none relative z-10">
                  $12,450
                </div>
                <div className="text-white/20 text-xs font-mono break-all mb-16 border border-white/10 p-6 bg-white/[0.02] relative z-10">
                  0x71C765...d8976F
                </div>
                <button className="relative z-10 w-full py-10 bg-accent text-black font-black text-sm tracking-[0.6em] uppercase hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(0,255,136,0.2)]">
                  VERIFY_ON_CHAIN
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Participation - Economy Dossier */}
      <section className="py-80 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-accent/5 -rotate-3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading subtitle="Become part of the narrative. Your presence can be immortalized in the tunnels.">
            THE <br /> <GlitchText text="ECONOMY" />
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-24">
            {/* Graffiti System */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="p-16 border border-white/10 bg-black relative overflow-hidden group"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-8 mb-12">
                  <div className="w-20 h-20 border border-accent/30 bg-accent/5 flex items-center justify-center">
                    <PenTool className="text-accent" size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-display font-black tracking-tight uppercase">Graffiti System</h3>
                    <p className="text-accent text-xs font-mono tracking-[0.4em] uppercase mt-2">Permanent_Inscription</p>
                  </div>
                </div>
                <p className="text-white/40 mb-12 leading-tight text-2xl font-serif italic">
                  Users can pay to have their name or custom tag placed as graffiti in future videos. As the project gains more viewers, the cost to leave a mark increases. Your legacy is <RedactedText>permanent</RedactedText>.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-16">
                  <div className="p-8 border border-white/5 bg-white/[0.02]">
                    <span className="text-white/20 text-[11px] font-mono uppercase block mb-4 tracking-widest">Entry_Cost</span>
                    <span className="text-4xl font-display font-black text-white tracking-tighter">$1.00</span>
                  </div>
                  <div className="p-8 border border-white/5 bg-white/[0.02]">
                    <span className="text-white/20 text-[11px] font-mono uppercase block mb-4 tracking-widest">Status</span>
                    <span className="text-4xl font-display font-black text-accent tracking-tighter">OPEN</span>
                  </div>
                </div>
                <button className="w-full py-10 bg-accent text-black font-black tracking-[0.5em] uppercase text-xs hover:bg-white transition-all shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                  INSCRIBE_YOUR_NAME
                </button>
              </div>
            </motion.div>

            {/* Revenue & Donations */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="space-y-16"
            >
              <div className="p-16 border border-white/10 bg-black relative">
                <div className="flex items-center gap-8 mb-12">
                  <div className="w-16 h-16 border border-white/20 bg-white/5 flex items-center justify-center">
                    <TrendingUp className="text-white/50" size={32} />
                  </div>
                  <h4 className="text-3xl font-display font-black tracking-tight uppercase">Revenue Allocation</h4>
                </div>
                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between text-xs mb-6 font-mono uppercase tracking-[0.4em]">
                      <span className="text-white/20">Prize Pool Contribution</span>
                      <span className="text-accent font-black">40%</span>
                    </div>
                    <div className="h-2 bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-accent shadow-[0_0_20px_rgba(0,255,136,0.5)]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-6 font-mono uppercase tracking-[0.4em]">
                      <span className="text-white/20">Infrastructure & Creator</span>
                      <span className="text-white/40 font-black">60%</span>
                    </div>
                    <div className="h-2 bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-white/20" 
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-sm text-white/20 leading-relaxed italic font-serif">
                  "Every contribution fuels the mystery. Every tag builds the prize. The cycle <RedactedText>continues</RedactedText>."
                </p>
              </div>

              <motion.div 
                whileHover={{ x: 20 }}
                className="p-12 border border-white/10 bg-black flex items-center justify-between group cursor-pointer hover:bg-accent/[0.05] transition-all duration-500"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 border border-accent/20 bg-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DollarSign className="text-accent" size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-display font-black tracking-tight uppercase">Direct Contribution</h4>
                    <p className="text-white/20 text-lg font-serif italic">Increase the stakes immediately</p>
                  </div>
                </div>
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
                  <ChevronDown className="-rotate-90" size={24} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section - The Covenant */}
      <section className="py-80 relative border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <SectionHeading subtitle="The game is built on a foundation of absolute, mathematical fairness.">
            THE <br /> <GlitchText text="COVENANT" />
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-24 mt-32">
            {[
              { icon: ShieldCheck, title: "Immutable Ledger", desc: <>The USDC wallet is public. Anyone can verify the balance and transaction history at any time on the blockchain. Transparency is <RedactedText>mandatory</RedactedText>.</> },
              { icon: Lock, title: "Static Cipher", desc: <>The final password is fixed from the start. We do not change it based on who is winning. The solution is already <RedactedText>out there</RedactedText>.</> },
              { icon: HelpCircle, title: "Logical Integrity", desc: <>Every clue is solvable. We do not use 'troll' clues or impossible riddles. If it looks like a clue, it probably <RedactedText>is</RedactedText>.</> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="space-y-10 group"
              >
                <div className="w-24 h-24 border border-accent/20 bg-accent/[0.02] flex items-center justify-center mx-auto mb-12 shadow-[0_0_60px_rgba(0,255,136,0.05)] group-hover:bg-accent/10 transition-all duration-700">
                  <item.icon className="text-accent" size={48} />
                </div>
                <h3 className="text-4xl font-display font-black tracking-tight uppercase">{item.title}</h3>
                <div className="text-white/30 text-xl leading-tight font-serif italic max-w-sm mx-auto">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Network Section */}
      <section className="py-80 relative border-t border-white/5 overflow-hidden">
        <NetworkScene />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <SectionHeading number="04" subtitle="The truth is not a straight line. It is a web of interconnected anomalies.">
              THE <br /> <GlitchText text="NETWORK" />
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-16 mt-24 text-left">
              <div className="p-12 border border-white/5 bg-black/60 backdrop-blur-xl relative group">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-accent/40">NODE_01 // ALPHA</div>
                <h4 className="text-3xl font-display font-black mb-6 uppercase tracking-tighter text-accent">Cross-Platform Clues</h4>
                <p className="text-white/40 text-xl font-serif italic leading-tight">
                  The mystery extends beyond YouTube. Check descriptions, source code of linked sites, and even metadata of shared files. Every byte could be a <RedactedText>seed</RedactedText>.
                </p>
              </div>
              <div className="p-12 border border-white/5 bg-black/60 backdrop-blur-xl relative group">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-accent/40">NODE_02 // BETA</div>
                <h4 className="text-3xl font-display font-black mb-6 uppercase tracking-tighter text-accent">Community Intelligence</h4>
                <p className="text-white/40 text-xl font-serif italic leading-tight">
                  No one person can solve this alone. Join the collective effort. Share your findings, debunk theories, and build the map together. The network is <RedactedText>watching</RedactedText>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Intelligence Debriefing */}
      <section id="faq" className="py-80 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeading subtitle="Everything you need to know before you descend.">
            INTELLIGENCE <br /> DEBRIEFING
          </SectionHeading>
          <div className="mt-32 space-y-4">
            <FAQItem 
              question="Is the reward real?" 
              answer={<>Yes. The reward is held in a public USDC wallet (0x71C765...d8976F). You can verify the balance on Etherscan or any other blockchain explorer. The winner will receive the private keys to the wallet or a direct transfer upon providing the correct password. This is <RedactedText>verified</RedactedText>.</>} 
            />
            <FAQItem 
              question="Can anyone win?" 
              answer={<>Absolutely. There are no geographical or age restrictions. The first person to solve the mystery and unlock the vault wins the entire balance. Collaboration is encouraged, but only one person can ultimately claim the prize. The clock is <RedactedText>ticking</RedactedText>.</>} 
            />
            <FAQItem 
              question="Are clues fair?" 
              answer={<>We strive for a balance between difficulty and fairness. While the puzzles become very difficult, they are all based on logic, pattern recognition, and observation. We do not use 'moon logic' or clues that require insider knowledge. The truth is <RedactedText>hidden in plain sight</RedactedText>.</>} 
            />
            <FAQItem 
              question="Are videos AI-generated?" 
              answer={<>Yes, we use cutting-edge AI video generation tools to create the atmospheric environments of the tunnels. This allows us to create high-quality, immersive visuals. Any 'glitches' or inconsistencies are usually a byproduct of the tech, but we ensure all intended clues are clearly visible. The machine <RedactedText>dreams</RedactedText>.</>} 
            />
            <FAQItem 
              question="Can I participate for free?" 
              answer={<>Yes! Watching the videos and solving the puzzles is 100% free. The Graffiti system and donations are optional ways to support the project and increase the prize pool, but they are not required to win. The descent is <RedactedText>open to all</RedactedText>.</>} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 border-t border-white/5 relative overflow-hidden bg-black">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-32">
            <div className="flex flex-col items-start gap-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                  <span className="text-black font-black text-lg">7S</span>
                </div>
                <span className="font-display font-black text-4xl tracking-tighter uppercase">SEVENTH SEEDS</span>
              </div>
              <p className="text-white/20 text-2xl max-w-md font-serif italic leading-tight">
                "The roots run deeper than the concrete. The seeds are waiting in the dark. End of <RedactedText>transmission</RedactedText>."
              </p>
              <div className="flex gap-8">
                <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Search size={20} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
              <div className="space-y-8">
                <h5 className="text-[11px] font-mono tracking-[0.5em] uppercase text-white/40 font-bold">Navigation</h5>
                <ul className="space-y-6 text-sm font-mono tracking-widest uppercase">
                  <li><a href="#about" className="text-white/30 hover:text-accent transition-colors">The_Descent</a></li>
                  <li><a href="#how-it-works" className="text-white/30 hover:text-accent transition-colors">The_Protocol</a></li>
                  <li><a href="#reward" className="text-white/30 hover:text-accent transition-colors">The_Reward</a></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h5 className="text-[11px] font-mono tracking-[0.5em] uppercase text-white/40 font-bold">Intelligence</h5>
                <ul className="space-y-6 text-sm font-mono tracking-widest uppercase">
                  <li><a href="#faq" className="text-white/30 hover:text-accent transition-colors">Debriefing</a></li>
                  <li><a href="#" className="text-white/30 hover:text-accent transition-colors">Archive</a></li>
                  <li><a href="#" className="text-white/30 hover:text-accent transition-colors">Terminal</a></li>
                </ul>
              </div>
              <div className="space-y-8 col-span-2 md:col-span-1">
                <h5 className="text-[11px] font-mono tracking-[0.5em] uppercase text-white/40 font-bold">Protocol</h5>
                <ul className="space-y-6 text-sm font-mono tracking-widest uppercase">
                  <li><a href="#" className="text-white/30 hover:text-accent transition-colors">Privacy_Lvl_0</a></li>
                  <li><a href="#" className="text-white/30 hover:text-accent transition-colors">Terms_of_Use</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-48 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] font-mono uppercase tracking-[0.6em] text-white/10">
            <p>© 2026 SEVENTH SEEDS PROJECT. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center gap-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              STATION_ID: ALPHA_SECTOR_7
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
