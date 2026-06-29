"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 3D Wireframe Globe
    const globeRadius = Math.min(width, height) * 0.38;
    const centerX = width / 2;
    const centerY = height / 2;

    const points: { x: number; y: number; z: number }[] = [];
    const latitudeBands = 14;
    const longitudeBands = 14;

    for (let lat = 0; lat <= latitudeBands; lat++) {
      const theta = (lat * Math.PI) / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= longitudeBands; lon++) {
        const phi = (lon * 2 * Math.PI) / longitudeBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = globeRadius * sinTheta * cosPhi;
        const y = globeRadius * cosTheta;
        const z = globeRadius * sinTheta * sinPhi;

        points.push({ x, y, z });
      }
    }

    let angleX = 0.001;
    let angleY = 0.002;
    let targetAngleX = 0.001;
    let targetAngleY = 0.002;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      targetAngleY = (mx / width) * 0.015;
      targetAngleX = (my / height) * 0.015;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate rotation angles based on mouse positioning
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected: { x: number; y: number; z: number }[] = [];

      points.forEach((p) => {
        // Rotate around Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective factor
        const distance = globeRadius * 2.2;
        const scale = distance / (distance + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({ x: projX, y: projY, z: z2 });
      });

      // Update positions for automatic orbital rotation
      points.forEach((p) => {
        const speedY = 0.0015;
        const speedX = 0.0006;
        const cy = Math.cos(speedY);
        const sy = Math.sin(speedY);
        const cx = Math.cos(speedX);
        const sx = Math.sin(speedX);

        // Rotate around Y
        let x1 = p.x * cy - p.z * sy;
        let z1 = p.z * cy + p.x * sy;

        // Rotate around X
        let y2 = p.y * cx - z1 * sx;
        let z2 = z1 * cx + p.y * sx;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      ctx.lineWidth = 0.45;

      // Draw latitude/longitude wireframe lines
      for (let lat = 0; lat <= latitudeBands; lat++) {
        for (let lon = 0; lon < longitudeBands; lon++) {
          const i1 = lat * (longitudeBands + 1) + lon;
          const i2 = i1 + 1;
          const i3 = (lat + 1) * (longitudeBands + 1) + lon;

          // Latitudinal grid lines
          if (projected[i1] && projected[i2]) {
            const zAvg = (projected[i1].z + projected[i2].z) / 2;
            const alpha = Math.max(0.04, 0.22 - zAvg / (globeRadius * 2.2));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i1].x, projected[i1].y);
            ctx.lineTo(projected[i2].x, projected[i2].y);
            ctx.stroke();
          }

          // Longitudinal grid lines
          if (lat < latitudeBands && projected[i1] && projected[i3]) {
            const zAvg = (projected[i1].z + projected[i3].z) / 2;
            const alpha = Math.max(0.04, 0.22 - zAvg / (globeRadius * 2.2));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i1].x, projected[i1].y);
            ctx.lineTo(projected[i3].x, projected[i3].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes/dots on intersection points
      projected.forEach((p) => {
        const alpha = Math.max(0.05, 0.35 - p.z / (globeRadius * 2.2));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Headline and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left">
          
          {/* Badge (Wireframe style) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/20 bg-white/5 text-xs font-mono tracking-wide text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            PORTFOLIO_STATE // READ_ONLY
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Bem vindo ao meu Portfólio!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed font-light font-mono"
          >
            Apresento os meus estudos e projetos de arquiteturas de software, fluxos automatizados com n8n e integrações de LLMs em projetos práticos e funcionais.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-neutral-200 transition-all font-mono text-sm border border-white"
            >
              Ver Projetos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 hover:border-white/30 transition-all font-mono text-sm backdrop-blur-sm"
            >
              Contato
            </a>
          </motion.div>
        </div>

        {/* Right Side: Abstract CAD Viewport with Globe and Head GIF */}
        <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 w-full h-full glass-card rounded-lg overflow-hidden border border-white/10"
          >
            {/* Viewport UI Grid Elements */}
            <div className="absolute top-3 left-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest z-20">
              VIEWPORT // PERSPECTIVE_3D
            </div>
            <div className="absolute top-3 right-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest z-20">
              GRID: ON // 40PX
            </div>
            <div className="absolute bottom-3 left-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest z-20">
              SCALE: 1.00 // FOCAL
            </div>
            <div className="absolute bottom-3 right-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest z-20">
              RENDER: WIREFRAME_MESH
            </div>

            {/* The Dynamic 3D Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

            {/* Centered Wireframe Head GIF */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-0">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-44 w-44 opacity-80 mix-blend-screen"
              >
                <Image
                  src="/Wireframe/download.gif"
                  alt="3D Wireframe Render"
                  fill
                  sizes="176px"
                  className="object-contain filter grayscale brightness-125"
                  priority
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity font-mono"
        onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-light">Explore</span>
        <ArrowDown className="h-4 w-4 text-white animate-bounce" />
      </motion.div>
    </section>
  );
}
