"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Code2, BrainCircuit, Lightbulb, TrendingUp } from "lucide-react";

const pillars = [
  {
    title: "Desenvolvimento de Software",
    desc: "Código de alta qualidade guiado por princípios SOLID, modularidade e performance excepcional no core.",
    icon: Code2,
  },
  {
    title: "Inteligência Artificial",
    desc: "Orquestração de modelos cognitivos avançados, prompts estruturados e integrações seguras com LLMs.",
    icon: BrainCircuit,
  },
  {
    title: "Resolução de Problemas",
    desc: "Mapeamento lógico de gargalos operacionais e tradução de regras de negócio em automações eficientes.",
    icon: Lightbulb,
  },
  {
    title: "Aprendizado Contínuo",
    desc: "Atualização diária em novas tecnologias, frameworks e melhores práticas do desenvolvimento moderno.",
    icon: GraduationCap,
  },
];

export default function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left: Wireframe Visual representation */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative h-[350px] sm:h-[450px] w-full max-w-[350px] sm:max-w-[400px] rounded-lg overflow-hidden border border-white/10 group"
            >
              {/* CAD Wireframe corner details */}
              <div className="absolute top-2 left-2 text-[8px] font-mono text-neutral-500 z-20">
                [GRID_MODEL_DITHER]
              </div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-neutral-500 z-20">
                X: 47_Y: 129
              </div>

              {/* Monochromatic overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

              <Image
                src="/Wireframe/download (21).jfif"
                alt="Digital Wireframe Hand and Sphere"
                fill
                sizes="(max-w-768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125"
                priority
              />

              {/* Tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass-card rounded-md p-4 z-20 border border-white/10 shadow-lg">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono block mb-1">
                  Full Stack Developer
                </span>
                <span className="text-white font-display text-sm font-semibold">
                  G. Deschamps
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Technical Bio & Pillars */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3 block">
              &gt; QUEM_SOU_EU
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Desenvolvimento de software focado em robustez e eficiência
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-8 font-mono text-justify">
              Sou desenvolvedor de software focado no desenvolvimento de sistemas robustos e eficientes. Especializado em arquitetar aplicações web completas, estruturar fluxos automatizados com n8n e integrar soluções de Inteligência Artificial para otimizar pipelines e processos técnicos.
            </p>

            {/* Pillars Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1 font-display">
                        {p.title}
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed font-light font-mono">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
