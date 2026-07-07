"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, Star, Search, FolderGit } from "lucide-react";
import Image from "next/image";

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const featuredProjects = [
  {
    title: "TradeCheck System",
    category: "Inteligência Artificial & Comércio Exterior",
    problem:
      "Morosidade e risco de erros humanos na validação crítica de documentos de carga internacional, como Sales Invoice e Packing List.",
    solution:
      "Desenvolvimento de sistema inteligente integrado com LLMs e prompts especializados para análise crítica de dados e relatórios automáticos de conformidade.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "API Integration", "OpenAI / LLMs"],
    result:
      "Aceleração do desembaraço aduaneiro com alta precisão e validação automática de dados fiscais.",
    link: "https://github.com/gdeschampss/TradeCheck_System",
    repoName: "TradeCheck_System",
    video: "/Wireframe/TradeChekVídeo.mp4",
  },
  {
    title: "Agente de IA & Automação de Vendas n8n",
    category: "Automação de Processos & IA",
    problem:
      "Dificuldade na triagem imediata de leads e sobrecarga comercial com atendimentos repetitivos e qualificação demorada.",
    solution:
      "Construção de fluxos de automação no n8n acoplados a agentes autônomos de IA que qualificam e realizam a conversão e fechamento de leads.",
    technologies: ["n8n", "OpenAI / LLMs", "Integrations", "Webhooks", "CRM API"],
    result:
      "Atendimento instantâneo de leads 24/7 com qualificação e sincronização automática em tempo real.",
    link: "https://github.com/gdeschampss/Artefact.pageINC",
    repoName: "Artefact.pageINC",
    image: "/Wireframe/AgentedeIA.png",
  },
  {
    title: "NeuroFlow Portal & Forms",
    category: "Inteligência Artificial & Saúde",
    problem:
      "Necessidade de digitalizar de forma segura e responsiva o processo de triagem e captação de dados de pacientes.",
    solution:
      "Desenvolvimento de formulários dinâmicos de triagem em React e implementação de pipelines seguros de envio de dados para processamento.",
    technologies: ["React", "JavaScript", "HTML/CSS", "API Integration", "Node.js"],
    result:
      "Otimização do tempo de pré-atendimento e centralização segura do fluxo de informações cadastrais.",
    link: "https://github.com/gdeschampss/react_neuroflow",
    repoName: "react_neuroflow",
  },
  {
    title: "Predictive Business Analytics",
    category: "Análise de Dados & Machine Learning",
    problem:
      "Necessidade de prever padrões de conversão de clientes e otimizar alocação de recursos digitais com base em dados de mercado.",
    solution:
      "Desenvolvimento de pipelines de análise e modelos estatísticos de regressão em Python para identificar fatores de conversão e mapear o retorno de mídia.",
    technologies: ["Python", "Jupyter Notebook", "Pandas", "Scikit-Learn", "Matplotlib"],
    result:
      "Mapeamento preditivo de conversão com validação estatística e aumento de eficiência nas campanhas.",
    link: "https://github.com/gdeschampss/-BussinesAnalyse_regressaoLogica",
    repoName: "-BussinesAnalyse_regressaoLogica",
  },
];

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/gdeschampss/repos");
        if (res.ok) {
          const data = (await res.json()) as GithubRepo[];
          const filtered = data.filter(
            (repo) =>
              !featuredProjects.some((fp) => fp.repoName.toLowerCase() === repo.name.toLowerCase()) &&
              repo.name !== "gdeschampss" &&
              repo.name !== "gabdeschamps"
          );
          filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(filtered);
        }
      } catch (err) {
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-3 block">
            &gt; PROJETOS_EM_DESTAQUE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Projetos desenvolvidos e estudos de caso
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed font-mono">
            Casos de estudo práticos abrangendo desenvolvimento web, automações de fluxos de trabalho e análise preditiva.
          </p>
        </div>

        {/* Featured Case Studies */}
        <div className="space-y-16">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="glass-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-white/10 shadow-2xl relative"
            >
              {/* Case Details */}
              <div className="lg:col-span-8 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-300 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">
                    {project.title}
                  </h3>

                  {/* Problem & Solution grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                        Problema
                      </h4>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light font-mono">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-200 mb-2 font-mono">
                        Solução
                      </h4>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light font-mono">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Techs & Results */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 block mb-2 font-mono">
                      Tecnologias
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono bg-white/5 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-md max-w-sm">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-1 font-mono">
                      Resultado Obtido
                    </span>
                    <span className="text-xs font-semibold text-white font-mono">
                      {project.result}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover visual representation (Conditional Video or Image showcase) */}
              <div className="lg:col-span-4 relative border-t lg:border-t-0 lg:border-l border-white/5 overflow-hidden flex flex-col items-center justify-center text-center group min-h-[250px]">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-50 transition-opacity duration-500"
                  />
                ) : (
                  <Image
                    src={project.image || "/Wireframe/Handmodeling#.jfif"}
                    alt={project.title}
                    fill
                    sizes="(max-w-768px) 100vw, 250px"
                    className="object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-500 filter grayscale"
                  />
                )}
                
                {/* Dark overlay to guarantee contrast for the GitHub repo CTA */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-0" />

                <div className="relative z-10 p-8 flex flex-col items-center justify-center">
                  <FolderGit className="h-10 w-10 text-white/30 group-hover:text-white/60 transition-colors duration-300 mb-4" />
                  
                  <h4 className="font-mono text-xs font-semibold text-white/80 mb-4">
                    CÓDIGO_FONTE
                  </h4>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 transition-all font-mono text-xs px-5 py-2.5 rounded-md backdrop-blur-sm"
                  >
                    GitHub Repo
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other GitHub Repositories Grid */}
        <div className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Outros Repositórios do GitHub
              </h3>
              <p className="text-neutral-400 text-sm font-light font-mono">
                Repositórios adicionais contendo scripts, ferramentas auxiliares e testes técnicos.
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Pesquisar repositório..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md pl-11 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full border border-t-white border-r-transparent animate-spin" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredRepos.slice(0, 9).map((repo) => (
                  <motion.div
                    key={repo.name}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card glass-card-hover rounded-lg p-6 flex flex-col justify-between border border-white/10"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4 font-mono">
                        <span className="text-[10px] font-semibold text-neutral-400 truncate">
                          {repo.language || "Shell / Config"}
                        </span>
                        
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>

                      <h4 className="font-display font-semibold text-white text-base mb-2 group-hover:text-white truncate">
                        {repo.name}
                      </h4>

                      <p className="text-neutral-400 text-xs font-light line-clamp-3 leading-relaxed mb-6 font-mono">
                        {repo.description || "Nenhuma descrição fornecida pelo autor no GitHub."}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto text-neutral-400 font-mono">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Star className="h-3.5 w-3.5 fill-white/5 text-neutral-400" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredRepos.length === 0 && (
                <div className="col-span-full text-center py-12 border border-dashed border-white/10 rounded-md">
                  <p className="text-neutral-400 text-sm font-mono">Nenhum repositório encontrado para a sua busca.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
