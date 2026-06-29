"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Users, BookOpen, Terminal, Code2 } from "lucide-react";

interface ProfileData {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string;
  avatar_url: string;
}

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

const languageColors: Record<string, string> = {
  python: "bg-[#3776AB]",
  javascript: "bg-[#F7DF1E]",
  typescript: "bg-[#3178C6]",
  html: "bg-[#E34F26]",
  css: "bg-[#1572B6]",
  "jupyter notebook": "bg-[#F37626]",
};

export default function GitHubStats() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate simulated contributions data for calendar grid (53 weeks * 7 days)
  const [contributionGrid] = useState(() => {
    const grid = [];
    const states = [0, 0, 0, 1, 1, 2, 2, 3, 4]; // weights for empty, light green, dark green, purple glows
    for (let i = 0; i < 280; i++) {
      grid.push(states[Math.floor(Math.random() * states.length)]);
    }
    return grid;
  });

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch Profile
        const profileRes = await fetch("https://api.github.com/users/gdeschampss");
        let profileInfo: ProfileData | null = null;
        if (profileRes.ok) {
          profileInfo = await profileRes.json() as ProfileData;
          setProfile(profileInfo);
        }

        // Fetch Repos to compute languages and stars
        const reposRes = await fetch("https://api.github.com/users/gdeschampss/repos?per_page=100");
        if (reposRes.ok) {
          const repos = await reposRes.json() as any[];
          
          // Calculate stars
          const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
          setTotalStars(stars);

          // Calculate languages
          const langMap: Record<string, number> = {};
          let totalCount = 0;

          repos.forEach((repo) => {
            if (repo.language) {
              const lang = repo.language.toLowerCase();
              langMap[lang] = (langMap[lang] || 0) + 1;
              totalCount++;
            }
          });

          const formattedLanguages = Object.entries(langMap)
            .map(([name, count]) => {
              const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
              return {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                percentage,
                color: languageColors[name] || "bg-zinc-600",
              };
            })
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5); // Keep top 5

          setLanguages(formattedLanguages);
        }
      } catch (err) {
        console.error("Error fetching GitHub Stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="absolute top-1/3 left-1/4 h-[350px] w-[500px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest text-neon-purple font-semibold mb-3">
            Atividade Open Source
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Estatísticas & Consumo no GitHub
          </h2>
          <p className="text-soft-gray text-base sm:text-lg font-light leading-relaxed">
            Consumo em tempo real de informações públicas da API do GitHub, apresentando as principais linguagens e volume de contribuições.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-white/5" />
              <div className="absolute inset-0 rounded-full border-2 border-t-neon-purple border-r-transparent animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: GitHub Profile Info & Stats */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img
                    src={profile?.avatar_url || "https://github.com/gdeschampss.png"}
                    alt="GitHub Profile Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold font-display text-base">
                    {profile?.name || "G. Deschamps"}
                  </h3>
                  <a
                    href="https://github.com/gdeschampss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neon-purple font-mono hover:underline"
                  >
                    @{profile?.login || "gdeschampss"}
                  </a>
                </div>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                  <BookOpen className="h-5 w-5 text-neon-purple mb-4" />
                  <div>
                    <span className="text-2xl font-bold text-white block">
                      {profile?.public_repos || 30}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-soft-gray">
                      Repositórios
                    </span>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                  <Star className="h-5 w-5 text-neon-pink mb-4" />
                  <div>
                    <span className="text-2xl font-bold text-white block">
                      {totalStars}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-soft-gray">
                      Estrelas
                    </span>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                  <Users className="h-5 w-5 text-electric-blue mb-4" />
                  <div>
                    <span className="text-2xl font-bold text-white block">
                      {profile?.followers || 0}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-soft-gray">
                      Seguidores
                    </span>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                  <GitBranch className="h-5 w-5 text-white mb-4" />
                  <div>
                    <span className="text-2xl font-bold text-white block">
                      {profile?.following || 0}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-soft-gray">
                      Seguindo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Languages Chart & Activity Grid */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Top: Contribution Calendar Visual Mock */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-neon-purple" />
                    <h3 className="text-sm font-semibold text-white font-display">
                      Graph de Contribuições (Consolidado)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-soft-gray">
                    GitHub Activity Heatmap
                  </span>
                </div>

                {/* Calendar grid container */}
                <div className="w-full overflow-x-auto no-scrollbar">
                  <div className="flex gap-[3px] min-w-[500px]">
                    {/* Render grid chunks representing weeks */}
                    <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-full">
                      {contributionGrid.map((val, idx) => (
                        <div
                          key={idx}
                          className={`h-[9px] w-[9px] rounded-[1px] transition-all hover:scale-125 duration-100 ${
                            val === 0
                              ? "bg-white/[0.03]"
                              : val === 1
                              ? "bg-emerald-950"
                              : val === 2
                              ? "bg-emerald-800"
                              : val === 3
                              ? "bg-neon-purple/40"
                              : "bg-neon-purple"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-[10px] text-soft-gray">
                  <span>Junho, 2025</span>
                  <div className="flex items-center gap-1.5">
                    <span>Menos</span>
                    <div className="h-2 w-2 rounded-[1px] bg-white/[0.03]" />
                    <div className="h-2 w-2 rounded-[1px] bg-emerald-950" />
                    <div className="h-2 w-2 rounded-[1px] bg-emerald-800" />
                    <div className="h-2 w-2 rounded-[1px] bg-neon-purple/40" />
                    <div className="h-2 w-2 rounded-[1px] bg-neon-purple" />
                    <span>Mais</span>
                  </div>
                  <span>Junho, 2026</span>
                </div>
              </div>

              {/* Bottom: Languages Stats */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className="h-4 w-4 text-electric-blue" />
                  <h3 className="text-sm font-semibold text-white font-display">
                    Principais Linguagens (Cálculo de Volume)
                  </h3>
                </div>

                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between text-xs font-medium text-white mb-2 font-display">
                        <span>{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          className={`h-full ${lang.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {languages.length === 0 && (
                    <p className="text-xs text-soft-gray py-4">
                      Aguardando dados das linguagens do repositório...
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </section>
  );
}
