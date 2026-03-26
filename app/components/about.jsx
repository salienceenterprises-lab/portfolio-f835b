"use client"
import React from 'react';
import { User, Sparkles } from 'lucide-react';

export default function PortfolioAbout({ data }) {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Animated Background Blob - Replaced motion with Tailwind pulse */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-on-load">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-violet-400">
              <Sparkles className="w-3 h-3" /> About
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-tight">
            A bit about me
          </h2>
        </div>

        <div className="relative group animate-on-load">
          {/* Decorative Border Gradient */}
          <div className="absolute -inset-px bg-gradient-to-b from-violet-500/40 via-transparent to-cyan-500/30 rounded-2xl group-hover:from-violet-400 transition-colors duration-500 opacity-50" />

          <div className="relative bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-white/[0.06] overflow-hidden">
            <div className="flex items-start gap-5">
              {/* Icon Container */}
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-violet-500/10 items-center justify-center flex-shrink-0 mt-1 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-transform duration-700 group-hover:scale-110">
                <User className="w-5 h-5 text-violet-400" />
              </div>

              <div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {data.bio}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {data.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-full cursor-default transition-all hover:scale-105 hover:bg-violet-500/20 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                  
                  {data.skills.length > 6 && (
                    <a
                      href="#skills"
                      className="px-4 py-2 text-xs font-medium text-white/40 hover:text-white/80 bg-white/5 border border-white/10 rounded-full transition-all cursor-pointer"
                    >
                      +{data.skills.length - 6} more
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
