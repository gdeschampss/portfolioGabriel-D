"use client";

import { motion } from "framer-motion";

export default function GlowBackground() {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden bg-black">
      {/* Moving Grid Overlay */}
      <div className="absolute inset-0 grid-pattern grid-mask opacity-80 animate-grid-move" />

      {/* Subtle Monochrome Glow Blobs (pure light gray depth, very dim) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full bg-white/[0.015] blur-[130px] pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CRT Screen Scanline Overlay */}
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
    </div>
  );
}
