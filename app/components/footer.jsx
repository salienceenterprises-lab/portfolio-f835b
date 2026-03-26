"use client"
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();

  // Guard against missing data object
  if (!data) return null;

  return (
    <footer className="border-t border-white/[0.06] py-10 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Safe Name Check */}
        <p className="text-xs text-white/30">
          &copy; {year} {data.name || "Portfolio"}  . All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {/* Conditional GitHub */}
          {data?.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {/* Conditional LinkedIn */}
          {data?.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          {/* Conditional Email */}
          {data?.email && (
            <a
              href={`mailto:${data.email}`}
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-xs text-white/20">
          Built with <span className="text-violet-400/60">Salience</span>
        </p>
      </div>
    </footer>
  );
}
