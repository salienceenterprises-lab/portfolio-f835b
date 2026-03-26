"use client"
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

function ProjectCard({ project, index }) {
  // Guard against undefined project data
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute -inset-px bg-gradient-to-b from-white/[0.08] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 flex flex-col transition-all duration-500 group-hover:border-violet-500/30 group-hover:bg-white/[0.05]">
        
        <div className="flex items-center justify-between mb-5">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/10 flex items-center justify-center"
          >
            <Folder className="w-5 h-5 text-violet-400" />
          </motion.div>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-violet-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-cyan-400 transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-[18px] h-[18px]" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">
          {project.title || "Untitled Project"}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed flex-1 mb-5">
          {project.description || "No description provided."}
        </p>

        {/* Safe check for the tech stack array */}
        {project.stack && Array.isArray(project.stack) && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.stack.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-[11px] font-medium text-white/30 tracking-wide bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:border-violet-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioProjects({ data }) {
  // Comprehensive check for data and projects array
  if (!data?.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
    return null;
  }
  
  return (
    <section id="projects" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-violet-400">Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-white/40 max-w-lg mb-14">
            A curated look at my output—from experimental tools to complete, large-scale results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => (
            <ProjectCard 
              key={project.id || project.title || index} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
