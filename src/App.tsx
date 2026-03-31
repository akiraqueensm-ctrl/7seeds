/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

// --- Components ---

const NoiseOverlay = () => (
  <div className="noise-overlay" />
);

const Scanline = () => (
  <div className="scanline" />
);

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

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-20">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter ${light ? 'text-white' : 'text-white'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-white/40 max-w-2xl text-xl font-serif italic leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 1, ease: "circOut" }}
      className="h-px w-32 bg-accent mt-8 origin-left"
    />
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-2xl font-display font-bold tracking-tight group-hover:text-accent transition-colors">{question}</span>
        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 border-accent text-accent bg-accent/5' : 'text-white/30'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-white/40 leading-relaxed text-lg font-light max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-black">
      <NoiseOverlay />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Scanline />
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="inline-block px-6 py-2 bg-accent/5 text-accent text-xs font-bold uppercase rounded-full mb-8 border border-accent/20 backdrop-blur-sm"
            >
              Interactive Mystery Experience
            </motion.span>
            <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-display font-bold tracking-tighter mb-12 leading-[0.8] mix-blend-difference">
              SEVENTH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">SEEDS</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-serif italic leading-relaxed"
            >
              "The roots run deeper than the concrete. The seeds are waiting in the dark."
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group relative px-10 py-5 bg-accent text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,255,136,0.3)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-3 tracking-widest">
                  <Play size={20} fill="currentColor" />
                  ENTER THE TUNNELS
                </span>
              </a>
              <a href="#about" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all backdrop-blur-md tracking-widest">
                THE CONCEPT
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Scroll to descend</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-48 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <SectionHeading subtitle="Seventh Seeds is a living, breathing puzzle set in a dark, atmospheric world of found-footage mystery.">
                The Descent
              </SectionHeading>
              <div className="space-y-8 text-white/50 leading-relaxed text-xl font-light">
                <p>
                  Follow the perspective of explorers trapped in a sprawling network of subterranean tunnels. Every video is a piece of a larger narrative, captured in a raw, POV style that blurs the line between fiction and reality.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-8 glass-card rounded-3xl border-accent/20 bg-accent/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex gap-6 relative z-10">
                    <Info className="text-accent shrink-0" size={28} />
                    <p className="text-sm font-mono tracking-wide leading-relaxed">
                      <span className="text-accent font-bold">SYSTEM_NOTE:</span> Our videos are crafted using advanced AI generation tools. While you may notice minor visual inconsistencies, every clue, number, and symbol is placed with absolute intention.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 group shadow-2xl shadow-black"
            >
              <img 
                src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80" 
                alt="Dark tunnel" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-12">
                <div className="flex justify-between items-start">
                  <div className="px-4 py-1 bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-mono tracking-widest rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE_FEED
                  </div>
                  <span className="text-white/20 font-mono text-[10px]">03:35:18:00</span>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Sector_07</span>
                  <h4 className="text-3xl font-display font-bold tracking-tighter">THE FORGOTTEN VEINS</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-48 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="The mystery isn't just in the footage. You must look closer than the average viewer.">
            The Protocol
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search className="text-accent" size={32} />,
                title: "Deep Analysis",
                desc: "Clues are scattered everywhere: hidden in video frames, encoded in titles, buried in thumbnails, or pinned in the comments section. Some may even lead to external websites."
              },
              {
                icon: <TrendingUp className="text-accent" size={32} />,
                title: "Escalation",
                desc: "The first few seeds are simple. As the story progresses, the puzzles become exponentially harder, requiring collaboration, deep research, and lateral thinking."
              },
              {
                icon: <ShieldCheck className="text-accent" size={32} />,
                title: "Zero Assistance",
                desc: "We do not explain solutions. The community must figure it out together. Every discovery is a step closer to the final objective."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="p-12 glass-card rounded-[40px] hover:border-accent/50 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed text-lg font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Objective */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vault/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-vault/20 rounded-full flex items-center justify-center mx-auto mb-12 border border-vault/30">
              <Lock className="text-vault" size={40} />
            </div>
            <SectionHeading subtitle="At the end of the journey lies the Seventh Seed.">
              The Objective
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
              <div className="p-8 glass-card rounded-3xl border-vault/20">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-vault" />
                  The Locked Vault
                </h4>
                <p className="text-white/60">
                  There is a digital vault containing the final reward. It is protected by a complex, multi-layered password that can only be constructed by solving every mystery in the series.
                </p>
              </div>
              <div className="p-8 glass-card rounded-3xl border-vault/20">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-vault" />
                  Winner Takes All
                </h4>
                <p className="text-white/60">
                  Only one person can be the first to unlock the vault. The moment the password is used and the reward is claimed, the game officially ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reward System */}
      <section id="reward" className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 skew-y-3 translate-y-24" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1">
              <SectionHeading subtitle="The prize is real, verifiable, and secured by the blockchain.">
                The Reward
              </SectionHeading>
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Wallet className="text-accent" size={28} />
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight">USDC Vault</h4>
                  <p className="text-white/40 leading-relaxed">The reward is held in a public USDC wallet, ensuring stability and instant global accessibility.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="text-accent" size={28} />
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight">Compounding Pool</h4>
                  <p className="text-white/40 leading-relaxed">The prize pool grows with every interaction, donation, and video release.</p>
                </div>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full lg:w-[500px] p-12 glass-card rounded-[60px] border-accent/30 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-6 -right-6 px-6 py-3 bg-accent text-black font-bold text-xs rounded-full shadow-[0_0_30px_rgba(0,255,136,0.4)] tracking-[0.2em]">
                LIVE_ASSETS
              </div>
              <div className="text-center py-12 relative z-10">
                <span className="text-white/30 text-xs font-mono uppercase tracking-[0.4em] mb-6 block">Vault_Balance</span>
                <motion.div 
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  className="text-7xl font-display font-bold text-accent glow-text mb-8 tracking-tighter"
                >
                  $12,450
                </motion.div>
                <div className="text-white/20 text-[10px] font-mono break-all bg-black/60 p-4 rounded-2xl border border-white/5 mb-10">
                  0x71C765...d8976F
                </div>
                <button className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase">
                  <ExternalLink size={14} />
                  Verify on Blockchain
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Participation */}
      <section className="py-48 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Become part of the narrative. Your presence can be immortalized in the tunnels.">
            The Economy
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Graffiti System */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="p-12 glass-card rounded-[60px] border-white/5 hover:border-accent/20 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <PenTool className="text-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-bold tracking-tight">Graffiti System</h3>
                    <p className="text-accent text-sm font-mono tracking-[0.2em] uppercase mt-1">Permanent Inscription</p>
                  </div>
                </div>
                <p className="text-white/50 mb-10 leading-relaxed text-xl font-light">
                  Users can pay to have their name or custom tag placed as graffiti in future videos. As the project gains more viewers, the cost to leave a mark increases.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-white/30 text-[10px] font-mono uppercase block mb-2">Entry_Cost</span>
                    <span className="text-2xl font-bold text-white">$1.00</span>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-white/30 text-[10px] font-mono uppercase block mb-2">Status</span>
                    <span className="text-2xl font-bold text-accent">OPEN</span>
                  </div>
                </div>
                <button className="w-full py-6 bg-accent text-black font-bold rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,136,0.2)] tracking-widest uppercase text-sm">
                  Inscribe Your Name
                </button>
              </div>
            </motion.div>

            {/* Revenue & Donations */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <div className="p-10 glass-card rounded-[50px] border-white/5">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="text-white/70" size={28} />
                  </div>
                  <h4 className="text-2xl font-display font-bold tracking-tight">Revenue Allocation</h4>
                </div>
                <div className="space-y-10">
                  <div>
                    <div className="flex justify-between text-sm mb-4 font-mono uppercase tracking-widest">
                      <span className="text-white/30">Prize Pool Contribution</span>
                      <span className="text-accent font-bold">40%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(0,255,136,0.5)]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-4 font-mono uppercase tracking-widest">
                      <span className="text-white/30">Infrastructure & Creator</span>
                      <span className="text-white/70 font-bold">60%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-white/20 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-10 text-sm text-white/30 leading-relaxed italic">
                  "Every contribution fuels the mystery. Every tag builds the prize."
                </p>
              </div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="p-10 glass-card rounded-[40px] border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DollarSign className="text-accent" size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-bold tracking-tight">Direct Contribution</h4>
                    <p className="text-white/30 text-sm font-serif italic">Increase the stakes immediately</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
                  <ChevronDown className="-rotate-90" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-48 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading subtitle="The game is built on a foundation of absolute, mathematical fairness.">
            The Covenant
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-16 mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,255,136,0.1)]">
                <ShieldCheck className="text-accent" size={36} />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight">Immutable Ledger</h3>
              <p className="text-white/40 text-base leading-relaxed font-light">The USDC wallet is public. Anyone can verify the balance and transaction history at any time on the blockchain.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,255,136,0.1)]">
                <Lock className="text-accent" size={36} />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight">Static Cipher</h3>
              <p className="text-white/40 text-base leading-relaxed font-light">The final password is fixed from the start. We do not change it based on who is winning. The solution is already out there.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,255,136,0.1)]">
                <HelpCircle className="text-accent" size={36} />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight">Logical Integrity</h3>
              <p className="text-white/40 text-base leading-relaxed font-light">Every clue is solvable. We do not use "troll" clues or impossible riddles. If it looks like a clue, it probably is.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-48 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading subtitle="Everything you need to know before you descend.">
            Intelligence
          </SectionHeading>
          <div className="mt-20">
            <FAQItem 
              question="Is the reward real?" 
              answer="Yes. The reward is held in a public USDC wallet (0x71C765...d8976F). You can verify the balance on Etherscan or any other blockchain explorer. The winner will receive the private keys to the wallet or a direct transfer upon providing the correct password." 
            />
            <FAQItem 
              question="Can anyone win?" 
              answer="Absolutely. There are no geographical or age restrictions. The first person to solve the mystery and unlock the vault wins the entire balance. Collaboration is encouraged, but only one person can ultimately claim the prize." 
            />
            <FAQItem 
              question="Are clues fair?" 
              answer="We strive for a balance between difficulty and fairness. While the puzzles become very difficult, they are all based on logic, pattern recognition, and observation. We do not use 'moon logic' or clues that require insider knowledge." 
            />
            <FAQItem 
              question="Are videos AI-generated?" 
              answer="Yes, we use cutting-edge AI video generation tools to create the atmospheric environments of the tunnels. This allows us to create high-quality, immersive visuals. Any 'glitches' or inconsistencies are usually a byproduct of the tech, but we ensure all intended clues are clearly visible." 
            />
            <FAQItem 
              question="Can I participate for free?" 
              answer="Yes! Watching the videos and solving the puzzles is 100% free. The Graffiti system and donations are optional ways to support the project and increase the prize pool, but they are not required to win." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
            <div className="flex flex-col items-start gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                  <span className="text-black font-bold text-sm">7S</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tighter">SEVENTH SEEDS</span>
              </div>
              <p className="text-white/20 text-lg max-w-sm font-serif italic leading-relaxed">
                "The roots run deeper than the concrete. The seeds are waiting in the dark."
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
              <div className="space-y-6">
                <h5 className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">Navigation</h5>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#about" className="text-white/60 hover:text-accent transition-colors">The Descent</a></li>
                  <li><a href="#how-it-works" className="text-white/60 hover:text-accent transition-colors">The Protocol</a></li>
                  <li><a href="#reward" className="text-white/60 hover:text-accent transition-colors">The Reward</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">Social</h5>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#" className="text-white/60 hover:text-accent transition-colors flex items-center gap-2"><Youtube size={14} /> YouTube</a></li>
                  <li><a href="#" className="text-white/60 hover:text-accent transition-colors flex items-center gap-2"><Search size={14} /> Community</a></li>
                </ul>
              </div>
              <div className="space-y-6 col-span-2 md:col-span-1">
                <h5 className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">Legal</h5>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#" className="text-white/60 hover:text-accent transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/60 hover:text-accent transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/10 font-mono uppercase tracking-[0.4em]">
            <p>© 2026 SEVENTH SEEDS PROJECT. ALL RIGHTS RESERVED.</p>
            <p>Designed for the subterranean</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
