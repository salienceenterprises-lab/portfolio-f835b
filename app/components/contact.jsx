"use client"
//"use client"; // This must be the very first line

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Github, Linkedin, CheckCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function PortfolioContact({ data }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  // Safeguard: Check if Web3Forms key exists
  const hasForm = !!data?.web3forms_key;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasForm) return; // Prevention if key is missing

    setStatus("loading");

    const submissionData = {
      ...formData,
      access_key: data.web3forms_key, 
      subject: `New Portfolio Message from ${formData.name}`,
      from_name: "Portfolio Contact Form",
      botcheck: "" 
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  // Filter links safely using optional chaining
  const contactLinks = [
    { show: data?.email, icon: Mail, label: "Email", value: data?.email, href: `mailto:${data?.email}`, color: "text-violet-400", bg: "bg-violet-500/10" },
    { show: data?.github, icon: FaGithub, label: "GitHub", value: "View Profile", href: data?.github, color: "text-white/60", bg: "bg-white/10" },
    { show: data?.linkedin, icon: FaLinkedin, label: "LinkedIn", value: "Connect", href: data?.linkedin, color: "text-blue-400", bg: "bg-blue-500/10" }
  ].filter(item => item.show);

  // If there are no links and no form, we don't render the section
  if (!hasForm && contactLinks.length === 0) return null;

  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden bg-[#0a0a0f]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={!hasForm ? "text-center" : ""}
        >
          <div className={`flex items-center gap-3 mb-3 ${!hasForm ? "justify-center" : ""}`}>
            <div className="w-8 h-[1px] bg-gradient-to-r from-violet-500 to-transparent" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-violet-400">Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Get in Touch</h2>
          <p className={`text-white/40 max-w-lg mb-14 ${!hasForm ? "mx-auto" : ""}`}>
            {hasForm ? "Have a project in mind or want to chat? Drop me a message." : "Let's connect across the web."}
          </p>
        </motion.div>

        <div className={`grid gap-10 ${hasForm ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1 max-w-md mx-auto"}`}>
          
          <motion.div
            initial={{ opacity: 0, x: hasForm ? -40 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`${hasForm ? "lg:col-span-2" : ""} space-y-4`}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${link.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <link.icon className={`w-4.5 h-4.5 ${link.color}`} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-0.5">{link.label}</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {hasForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 ml-1">Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 ml-1">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 ml-1">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all resize-none" />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  whileHover="hover" // This triggers the "hover" variant in all children
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 ${
                    status === "success" ? "bg-green-500 text-white" : "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </motion.div>
                    ) : status === "success" ? (
                      <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Sent!
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                        <span>Send Message</span>
                        {/* THE AIRPLANE ANIMATION */}
                        <motion.div
                          variants={{
                            hover: { 
                              x: [0, 5, -20, 40], 
                              y: [0, -5, 10, -40], 
                              opacity: [1, 1, 0, 1],
                              transition: { duration: 0.6, ease: "easeInOut" } 
                            }
                          }}
                        >
                          <Send className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
