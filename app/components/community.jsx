"use client"
import React from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

export default function PortfolioCommunity({ data }) {
  // Enhanced validation: ensures data exists and community is a non-empty array
  if (!data?.community || !Array.isArray(data.community) || data.community.length === 0) {
    return null;
  }

  return (
    <section id="community" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-violet-400">Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Community & Volunteering
          </h2>
          <p className="text-white/40 max-w-lg mb-14">
            Contributing to the community through shared resources, mentoring, and local initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.community.map((item, index) => {
            // Guard clause for individual items
            if (!item) return null;

            return (
              <motion.div
                key={item.id || `${item.organization}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1 
                }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 hover:border-violet-500/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    whileHover={{ scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.8 } }}
                    className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300 transition-colors relative"
                  >
                    <Heart className="w-5 h-5 fill-current opacity-0 group-hover:opacity-20 absolute" />
                    <Heart className="w-5 h-5 relative z-10" />
                  </motion.div>
                  
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/20 hover:text-violet-400 transition-colors"
                      aria-label={`Visit ${item.organization}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <h3 className="text-white font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  {item.role || "Contributor"}
                </h3>
                
                <p className="text-violet-400/80 text-xs font-medium mb-3 uppercase tracking-wider">
                  {item.organization || "Community Initiative"}
                </p>
                
                <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                  {item.description || "No description provided."}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
