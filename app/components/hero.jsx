"use client"
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, FileDown, ArrowDown } from 'lucide-react';

export default function PortfolioHero({ data }) {
  const { scrollY } = useScroll();

  // Parallax for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 250]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]">
      
      {/* BACKGROUND LAYER: Industry-Agnostic "Data Grid" */}
      <div className="absolute inset-0 z-0">
        {/* Animated Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,0,64,1)_0%,rgba(3,0,20,1)_100%)]" />
        
        {/* Scanning Grid Line */}
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent z-10"
        />

        {/* Static Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* FLOATING ORBS: Parallax depth */}
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        
        {/* Top Feature Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-violet-300 font-bold">
            {data.title}
          </span>
        </motion.div>

        {/* Massive Minimalist Typography */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-[10rem] font-black tracking-tighter leading-[0.8] text-white"
          >
            {data.name.split(' ')[0]}
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/80 to-white">
              {data.name.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.6 }} 
            className="text-lg sm:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed tracking-tight"
          >
            {data.sloganHeroSection}
          </motion.p>
        </div>

        {/* Premium Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.9 }} 
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.2)" }} 
            whileTap={{ scale: 0.95 }} 
            href="/resume.pdf" 
            download="My_Resume.pdf"
            className="group flex items-center gap-3 px-10 py-5 bg-violet-600 text-white text-sm font-bold rounded-full transition-all"
          >
            <FileDown className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            Download Resume
          </motion.a>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }} 
            whileTap={{ scale: 0.95 }} 
            onClick={scrollToContact}
            className="group flex items-center gap-3 px-10 py-5 border border-white/20 text-white text-sm font-bold rounded-full backdrop-blur-sm transition-all"
          >
            <Mail className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform" />
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent z-10" />

      {/* Minimal Scroll Icon */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Explore</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-violet-500/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
