"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiOpenai,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const technologies = [
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
  { name: "OpenAI API", icon: SiOpenai, color: "text-[#412991]" },
  { name: "n8n", label: "n8n", color: "text-[#FF6C37]" }, // Custom text/logo fallback for n8n
  { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
  { name: "Git", icon: SiGit, color: "text-[#F05032]" },
  { name: "Vercel", icon: SiVercel, color: "text-white" },
  { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
];

export default function TechStack() {
  // Duplicate array to enable seamless marquee effect
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    <section className="relative py-16 bg-deep-black/60 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-deep-black z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-xs uppercase tracking-widest text-soft-gray font-semibold font-display">
          Stack de Alta Performance & Produção
        </h2>
      </div>

      {/* Marquee Track */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="flex gap-8 py-4 animate-marquee whitespace-nowrap min-w-full">
          {marqueeItems.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card hover:border-white/10 transition-colors"
              >
                {Icon ? (
                  <Icon className={`h-5 w-5 ${tech.color}`} />
                ) : (
                  <span className={`text-sm font-bold font-display ${tech.color}`}>
                    {tech.label}
                  </span>
                )}
                <span className="text-sm font-medium text-white/90 font-display">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
