"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Layers, Palette, Link, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Inteligência Artificial",
    description:
      "Integração de modelos de linguagem (LLMs), desenvolvimento de agentes cognitivos autônomos e arquiteturas RAG (Retrieval-Augmented Generation) para processamento de informações.",
    benefit: "OpenAI API, LangChain, RAG, Vetores",
    icon: Brain,
  },
  {
    title: "Automação de Processos",
    description:
      "Criação de pipelines de dados e workflows automatizados utilizando n8n, Node.js e Python para integrar sistemas de forma eficiente.",
    benefit: "n8n, Webhooks, APIs REST, Node.js, Python",
    icon: Cpu,
  },
  {
    title: "Desenvolvimento Full Stack",
    description:
      "Arquitetura e desenvolvimento de aplicações web completas e responsivas utilizando React, Next.js, TypeScript e Node.js.",
    benefit: "Next.js, React, TypeScript, Tailwind CSS, API REST",
    icon: Layers,
  },
  {
    title: "UI/UX de Alto Padrão",
    description:
      "Implementação de interfaces modernas, responsivas e fluidas baseadas em padrões contemporâneos de design e micro-animações.",
    benefit: "Framer Motion, CSS, Figma, Design Responsivo",
    icon: Palette,
  },
  {
    title: "Integrações com APIs",
    description:
      "Desenvolvimento e documentação de APIs robustas (REST/GraphQL) e integrações seguras com serviços e SaaS de mercado.",
    benefit: "PostgreSQL, Express, Supabase, OAuth, JWT",
    icon: Link,
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    // Calculate width to scroll based on viewport
    const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const cardWidth = container.offsetWidth / visibleCards;
    
    // Add gap space to scroll distance
    const gap = 24; 
    const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="servicos" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Wireframe Animated GIF, covering the entire section background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen overflow-hidden pointer-events-none">
        <Image
          src="/Wireframe/download (1).gif"
          alt="Animated Wireframe Background Grid"
          fill
          unoptimized
          className="object-cover filter grayscale contrast-125 brightness-100"
        />
        {/* Ambient gradient fade to blend the image seamlessly at section boundaries */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Carousel Navigation controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="flex flex-col items-start max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3 block">
              &gt; AREAS_DE_ATUACAO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Especialidades e Foco Técnico
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed font-mono">
              Minha atuação técnica combina desenvolvimento de software full stack com automação inteligente de processos e integração de IA.
            </p>
          </div>

          {/* Navigation Controls (Enhanced visibility and hover animations) */}
          <div className="flex gap-3 font-mono shrink-0">
            <button
              onClick={() => scroll("left")}
              className="h-12 w-12 rounded-md border border-white/20 bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all text-white cursor-pointer active:scale-90 group"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-12 w-12 rounded-md border border-white/20 bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all text-white cursor-pointer active:scale-90 group"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 relative z-10"
          style={{ scrollPaddingLeft: "24px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] glass-card rounded-lg p-8 flex flex-col justify-between group overflow-hidden border border-white/10 hover:border-white/30"
              >
                <div>
                  {/* Icon */}
                  <div className="h-12 w-12 rounded-md border border-white/10 bg-white/5 flex items-center justify-center mb-6 text-white group-hover:border-white/30 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6 font-mono">
                    {service.description}
                  </p>
                </div>

                {/* Techs & Tools */}
                <div className="pt-6 border-t border-white/5 mt-auto">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 block mb-1 font-mono">
                    Tecnologias & Ferramentas
                  </span>
                  <span className="text-xs font-mono font-medium text-neutral-300">
                    {service.benefit}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
