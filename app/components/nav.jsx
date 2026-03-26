"use client"
//"use client"; // This must be the very first line
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Safeguard: Early return if data is missing
  if (!data) return null;

  const allNavLinks = [
    { label: "About", href: "#about", key: "about" },
    { label: "Education", href: "#education", key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects", href: "#projects", key: "projects" },
    { label: "Skills", href: "#skills", key: "skills" },
    { label: "Impact", href: "#community", key: "community" },
    { label: "Contact", href: "#contact", key: "email" },
  ];

  // Defensive Filter: Checks if sections exist and have content
  const activeLinks = allNavLinks.filter(link => {
    if (link.label === "About") return true; 
    
    const sectionData = data?.[link.key];
    if (Array.isArray(sectionData)) return sectionData.length > 0;
    return !!sectionData;
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80; 
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Safe Name Check */}
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="text-lg font-semibold text-white tracking-tight">
          {data.name || "Portfolio"}<span className="text-violet-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {activeLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium text-white/45 hover:text-white/90 tracking-wide uppercase transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <AnimatePresence>
            {/* Safe Resume Check: Only shows if resume field exists in data */}
            {pastHero && data?.resume && (
              <motion.a
                href={data.resume} 
                download
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white text-xs font-medium rounded-full transition-all duration-300 shadow-md shadow-violet-500/20"
              >
                <FileDown className="w-3.5 h-3.5" />
                Resume
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 hover:text-white transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 pb-6 pt-2 overflow-hidden"
          >
            {activeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-3 text-sm text-white/60 hover:text-white transition-colors border-b border-white/[0.04] last:border-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
