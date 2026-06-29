"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whatsappNumber = "554799619049"; 
  const whatsappMessage = encodeURIComponent("Olá Gabriel, acessei seu portfólio de desenvolvimento e gostaria de conversar!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Animated Wireframe Hills (GLSL Hills 2D Canvas equivalent)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 26;
    const rows = 26;
    const spacing = 38;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.006; // Slow flowing waves speed

      const width = canvas.width;
      const height = canvas.height;

      // Camera transformation values (Perspective & Pitch)
      const camY = -140; 
      const camZ = 280;  
      const angleX = 0.42; 

      const points2D: { x: number; y: number; alpha: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points2D[r] = [];
        for (let c = 0; c < cols; c++) {
          const x3D = (c - cols / 2) * spacing;
          const z3D = (r - rows / 2) * spacing;

          // Rolling hills terrain calculation based on waves and distance
          const distanceToCenter = Math.sqrt(x3D * x3D + z3D * z3D);
          const y3D = 
            Math.sin(x3D * 0.015 + time) * Math.cos(z3D * 0.015 + time) * 35 +
            Math.sin(distanceToCenter * 0.009 - time * 1.2) * 12;

          const cosX = Math.cos(angleX);
          const sinX = Math.sin(angleX);

          // Position relative to camera
          const ty = y3D - camY;
          const tz = z3D + camZ;

          // Rotation around X-axis
          const ry = ty * cosX - tz * sinX;
          const rz = tz * cosX + ty * sinX;

          // Perspective Projection
          const focalLength = 340;
          const scale = focalLength / (rz + 220);
          const projX = x3D * scale + width / 2;
          const projY = ry * scale + height * 0.65; 

          // Fade out distant nodes (depth fog)
          const alpha = Math.max(0, Math.min(0.24, 1 - rz / 750));

          points2D[r][c] = { x: projX, y: projY, alpha };
        }
      }

      // Draw mesh wireframe lines
      ctx.lineWidth = 0.6;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = points2D[r][c];

          // Horizontal lines
          if (c < cols - 1) {
            const p2 = points2D[r][c + 1];
            const avgAlpha = (p1.alpha + p2.alpha) / 2;
            if (avgAlpha > 0) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Vertical lines
          if (r < rows - 1) {
            const p2 = points2D[r + 1][c];
            const avgAlpha = (p1.alpha + p2.alpha) / 2;
            if (avgAlpha > 0) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="contato" className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* GLSL Hills Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen pointer-events-none"
      />

      {/* Ambient glow fade */}
      <div className="absolute bottom-0 right-0 left-0 h-[300px] bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Only the floating Wireframe Connections Image (Cleaned, enlarged, no box background) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              animate={{
                y: [0, -10, 0]
              }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center pointer-events-none mix-blend-screen"
            >
              <Image
                src="/Wireframe/conattoimg.png"
                alt="Wireframe Connection Diagram"
                fill
                sizes="(max-w-1024px) 320px, 420px"
                className="object-contain filter grayscale contrast-125 brightness-110"
                priority
              />
            </motion.div>
          </div>

          {/* Right Side: Header and the Contact Card */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left relative z-10">
            {/* Header info */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2 block">
                &gt; CONTATO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Entre em contato
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed font-mono">
                Seja para discutir oportunidades de desenvolvimento, colaborações em projetos de software ou simplesmente trocar ideias sobre inteligência artificial, sinta-se à vontade para se conectar.
              </p>
            </div>

            {/* Glassmorphic Card for Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-lg p-6 sm:p-8 border border-white/10 relative w-full overflow-hidden shadow-2xl"
            >
              {/* Top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Email Contact */}
                <a
                  href="mailto:gabdeschamps1@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden font-mono">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 block mb-0.5">
                      E-mail
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      gabdeschamps1@gmail.com
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-md bg-white/5 border border-white/10">
                  <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="font-mono">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 block mb-0.5">
                      Localização
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Santa Catarina, Brasil
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Network Connections */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                  // CONECTE_SE_COMIGO
                </span>
                <div className="flex items-center gap-4">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/gabriel-deschamps-ba4a2b312/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <FaLinkedin className="h-5 w-5 group-hover:scale-105 transition-transform" />
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/gdeschampss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <FaGithub className="h-5 w-5 group-hover:scale-105 transition-transform" />
                  </a>

                  {/* WhatsApp Direct Text link */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <MessageSquare className="h-5 w-5 group-hover:scale-105 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-md bg-neutral-900 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        whileHover={{ rotate: 8 }}
      >
        <FaWhatsapp className="h-7 w-7" />
      </motion.a>

      {/* Footer copyright */}
      <div className="mt-24 sm:mt-32 border-t border-white/5 pt-8 text-center text-xs text-neutral-500 font-light font-mono">
        <p>&copy; {new Date().getFullYear()} G. Deschamps. Todos os direitos reservados. Desenvolvido com Next.js, React e Tailwind CSS.</p>
      </div>
    </section>
  );
}
