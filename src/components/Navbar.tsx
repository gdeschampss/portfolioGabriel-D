"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Início", href: "#hero" },
  { name: "Especialidades", href: "#servicos" },
  { name: "Projetos", href: "#projetos" },
  { name: "Metodologia", href: "#metodologia" },
  { name: "Sobre", href: "#sobre" },
  { name: "GitHub", href: "#github" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo (Wireframe design) */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-md border border-white/20 bg-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-mono font-bold text-white text-sm">GD</span>
            </div>
            <span className="font-display font-semibold tracking-tight text-white transition-colors group-hover:text-neutral-300">
              Deschamps<span className="text-white">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-950/60 border border-white/10 p-1 rounded-md backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group font-mono"
              >
                {item.name}
                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-105" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-1 bg-white hover:bg-neutral-200 text-black font-semibold text-sm px-5 py-2 rounded-md transition-all font-mono border border-white"
            >
              Contato
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-lg flex flex-col justify-center px-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <nav className="flex flex-col gap-6 text-2xl font-display font-medium">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors flex items-center justify-between group border-b border-white/5 pb-4 font-mono text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                  <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full text-center bg-white text-black font-mono font-semibold py-4 rounded-md transition-all border border-white text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                Contato
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
