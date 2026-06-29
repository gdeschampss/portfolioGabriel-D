"use client";

import { motion } from "framer-motion";
import { ClipboardList, Network, Code, GitPullRequest, ShieldCheck, TrendingUp } from "lucide-react";
import { FaFigma } from "react-icons/fa";

const steps = [
  {
    num: "01",
    title: "Requisitos",
    desc: "Mapeamento e análise detalhada dos requisitos do sistema para desenhar a melhor solução técnica.",
    icon: ClipboardList,
  },
  {
    num: "02",
    title: "Arquitetura",
    desc: "Modelagem do banco de dados, design dos endpoints e especificação dos microsserviços de dados e IA.",
    icon: Network,
  },
  {
    num: "03",
    title: "UI/UX",
    desc: "Criação de interfaces minimalistas focadas em fluidez, responsividade e engajamento do usuário final.",
    icon: FaFigma,
  },
  {
    num: "04",
    title: "Desenvolvimento",
    desc: "Programação de alta qualidade com Next.js, TypeScript e APIs assíncronas rápidas e escaláveis.",
    icon: Code,
  },
  {
    num: "05",
    title: "Automação",
    desc: "Configuração de workflows integrados com n8n, bots de IA e sincronização autônoma de dados.",
    icon: GitPullRequest,
  },
  {
    num: "06",
    title: "Deploy",
    desc: "Subida em nuvem rápida e segura (Vercel/AWS), com CI/CD, testes automatizados e cache global.",
    icon: ShieldCheck,
  },
  {
    num: "07",
    title: "Evolução",
    desc: "Análise de métricas, refatoração de código e refinamento de prompts para otimização contínua.",
    icon: TrendingUp,
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3 block">
            &gt; CICLO_DE_DESENVOLVIMENTO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Desenvolvimento de precisão em todas as etapas
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed font-mono">
            Uma abordagem sistemática para planejar, arquitetar e implantar soluções robustas e de alto desempenho.
          </p>
        </div>

        {/* Steps Pipeline */}
        <div className="relative">
          {/* Vertical/Horizontal Connective Dashed Line */}
          <div className="absolute left-[39px] lg:left-0 lg:top-[40px] lg:right-0 lg:h-[1px] w-[1px] lg:w-full bottom-0 top-[20px] border-l lg:border-l-0 lg:border-t border-dashed border-white/10 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="flex lg:flex-col items-start gap-6 lg:gap-4 relative group"
                >
                  {/* Outer wireframe node */}
                  <div className="relative z-10">
                    <div className="h-20 w-20 rounded-md border border-white/15 bg-black flex items-center justify-center relative transition-all duration-300 group-hover:border-white/40 group-hover:scale-105">
                      {/* Step number badge (Wireframe style) */}
                      <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold text-white bg-black border border-white/20 h-5 w-5 rounded-md flex items-center justify-center">
                        {step.num}
                      </span>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex-1 lg:mt-4">
                    <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-neutral-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed lg:max-w-[160px] font-mono">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
