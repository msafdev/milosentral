"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function FoilSticker() {
  const stickerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);
  const glareX = useTransform(smoothX, [0, 1], ["-35%", "35%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!stickerRef.current) return;
    const rect = stickerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      className="relative inline-block select-none perspective-[500px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={stickerRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.04 }}
        className="relative w-12 h-12 rounded-full overflow-hidden border border-black/[0.12] shadow-[0_3px_8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center"
        title="sealed"
      >
        {/* Minimal brushed silver foil surface */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f5f5f4 0%, #d6d3d1 35%, #fafaf9 55%, #a8a29e 85%, #e7e5e4 100%)",
          }}
        />

        {/* Specular light band */}
        <motion.div
          style={{ x: glareX }}
          className="absolute -inset-4 pointer-events-none opacity-50"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.95) 50%, transparent 62%)",
            }}
          />
        </motion.div>

        {/* Quiet debossed inner ring & mark */}
        <div className="relative z-10 w-9 h-9 rounded-full border border-black/[0.1] flex items-center justify-center">
          <span className="text-[13px] text-[#44403C]/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
            ✦
          </span>
        </div>
      </motion.div>
    </div>
  );
}
