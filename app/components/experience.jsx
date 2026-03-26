"use client"
import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function PortfolioExperience({ data }) {
  // Enhanced validation: ensures 'data' exists, 'experience' exists, and it's a non-empty array
  if (!data?.experience || !Array.isArray(data.experience) || data.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-violet-500 to-transparent" 
            />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-violet-400">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Work History
          </h2>
          <p className="text-white/40 max-w-lg mb-14">
            Where I've worked and what I've built.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line with "Growing" animation */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-violet-500/60 via-white/10 to-transparent hidden sm:block origin-top" 
          />

          <div className="space-y-8">
            {data.experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100 
                }}
                className="relative sm:pl-12"
              >
                {/* Timeline dot with "Pulse" animation */}
                <div className="hidden sm:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-[#0a0a0f] border border-violet-500/30 items-center justify-center z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                  />
                </div>

                <motion.div 
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-b from-white/[0.06] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 transition-all duration-500 group-hover:border-white/[0.12] backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
                          {job.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-3.5 h-3.5 text-violet-400/70" />
                          <span className="text-sm text-violet-400/80 font-medium">{job.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                        <span className="text-xs font-medium text-white/30 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
                          {job.period}
                        </span>
                        {job.location && (
                          <span className="text-xs text-white/25">{job.location}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/50 leading-relaxed mb-5">
                      {job.description}
                    </p>

                    {/* Check if highlights exist before mapping */}
                    {job.highlights && Array.isArray(job.highlights) && (
                      <ul className="space-y-3 mb-5">
                        {job.highlights.map((h, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index * 0.1) + (i * 0.1) }}
                            className="flex items-start gap-2.5 text-sm text-white/40"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/60 flex-shrink-0" />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* Check if stack exists before mapping */}
                    {job.stack && Array.isArray(job.stack) && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                        {job.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium text-violet-300/60 bg-violet-500/[0.07] px-2.5 py-1 rounded-md border border-violet-500/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
