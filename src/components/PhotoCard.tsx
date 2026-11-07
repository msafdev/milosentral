"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface PhotoCardProps {
  src: string;
  alt: string;
  caption?: string;
  side: "left" | "right";
}

function FloweringWashiTape({
  side,
}: {
  side: "left" | "right";
}) {
  // Alternate pastel floral palette per side so each tape feels handmade
  const isWarm = side === "left";
  const tapeBg = isWarm ? "#FDF2EE" : "#EEF6FD";
  const tapeBorder = isWarm ? "#F3D5CC" : "#C9E0F6";
  const petalPrimary = isWarm ? "#F48B94" : "#68A8E8";
  const petalSecondary = isWarm ? "#F9C593" : "#F39BB2";
  const centerColor = "#F6C844";
  const leafColor = "#7FA982";

  return (
    <div
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-[84px] h-[24px] z-20 pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(20,20,19,0.08)] ${
        side === "left" ? "rotate-[-2deg]" : "rotate-[2deg]"
      }`}
    >
      <svg
        viewBox="0 0 84 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-92"
      >
        {/* Serrated washi tape strip body */}
        <path
          d="M2 1 L82 1 L80 4 L83 7 L80 10 L83 13 L80 16 L83 19 L81 23 L2 23 L4 19 L1 16 L4 13 L1 10 L4 7 L1 4 Z"
          fill={tapeBg}
          stroke={tapeBorder}
          strokeWidth="0.75"
        />

        {/* Little botanical leaves */}
        <ellipse
          cx="15"
          cy="13"
          rx="3"
          ry="1.4"
          transform="rotate(-28 15 13)"
          fill={leafColor}
          opacity="0.75"
        />
        <ellipse
          cx="23"
          cy="9"
          rx="2.8"
          ry="1.3"
          transform="rotate(24 23 9)"
          fill={leafColor}
          opacity="0.75"
        />
        <ellipse
          cx="38"
          cy="16"
          rx="3"
          ry="1.4"
          transform="rotate(-18 38 16)"
          fill={leafColor}
          opacity="0.75"
        />
        <ellipse
          cx="47"
          cy="11"
          rx="2.6"
          ry="1.3"
          transform="rotate(32 47 11)"
          fill={leafColor}
          opacity="0.75"
        />
        <ellipse
          cx="62"
          cy="14"
          rx="3"
          ry="1.4"
          transform="rotate(-25 62 14)"
          fill={leafColor}
          opacity="0.75"
        />
        <ellipse
          cx="71"
          cy="9"
          rx="2.5"
          ry="1.2"
          transform="rotate(20 71 9)"
          fill={leafColor}
          opacity="0.7"
        />

        {/* Flower 1 (left) */}
        <g transform="translate(19, 11)">
          <circle cx="0" cy="-3.2" r="2.2" fill={petalPrimary} />
          <circle cx="3" cy="-1" r="2.2" fill={petalPrimary} />
          <circle cx="1.9" cy="2.6" r="2.2" fill={petalPrimary} />
          <circle cx="-1.9" cy="2.6" r="2.2" fill={petalPrimary} />
          <circle cx="-3" cy="-1" r="2.2" fill={petalPrimary} />
          <circle cx="0" cy="0" r="1.7" fill={centerColor} />
        </g>

        {/* Tiny bud between Flower 1 & 2 */}
        <circle cx="31" cy="7.5" r="1.6" fill={petalSecondary} />
        <circle cx="33" cy="16.5" r="1.3" fill={centerColor} opacity="0.85" />

        {/* Flower 2 (center) */}
        <g transform="translate(43, 13)">
          <circle cx="0" cy="-3" r="2" fill={petalSecondary} />
          <circle cx="2.8" cy="-0.9" r="2" fill={petalSecondary} />
          <circle cx="1.7" cy="2.4" r="2" fill={petalSecondary} />
          <circle cx="-1.7" cy="2.4" r="2" fill={petalSecondary} />
          <circle cx="-2.8" cy="-0.9" r="2" fill={petalSecondary} />
          <circle cx="0" cy="0" r="1.5" fill={centerColor} />
        </g>

        {/* Tiny bud between Flower 2 & 3 */}
        <circle cx="55" cy="8" r="1.5" fill={petalPrimary} opacity="0.85" />

        {/* Flower 3 (right) */}
        <g transform="translate(66, 11.5)">
          <circle cx="0" cy="-3.1" r="2.1" fill={petalPrimary} />
          <circle cx="2.9" cy="-1" r="2.1" fill={petalPrimary} />
          <circle cx="1.8" cy="2.5" r="2.1" fill={petalPrimary} />
          <circle cx="-1.8" cy="2.5" r="2.1" fill={petalPrimary} />
          <circle cx="-2.9" cy="-1" r="2.1" fill={petalPrimary} />
          <circle cx="0" cy="0" r="1.6" fill={centerColor} />
        </g>
      </svg>
    </div>
  );
}

export default function PhotoCard({
  src,
  alt,
  side,
}: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const tilt = side === "left" ? -1.5 : 1.5;

  return (
    <div
      ref={cardRef}
      className="w-[205px] sm:w-[225px] shrink-0 pt-3 select-none touch-manipulation"
    >
      <motion.div
        style={{ y, rotate: tilt }}
        whileHover={{ rotate: 0, y: -3 }}
        whileTap={{ scale: 0.98, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative bg-[#FFFDF9] p-2.5 pb-4 rounded-[5px] border border-black/[0.08] shadow-[0_8px_22px_-8px_rgba(20,20,19,0.10),0_1px_3px_rgba(20,20,19,0.04)]"
      >
        {/* Cute flowering washi tape at the top */}
        <FloweringWashiTape side={side} />

        {/* Single clean photo print (no subtitle) */}
        <div className="relative w-full h-[205px] sm:h-[225px] overflow-hidden rounded-[2px] bg-[#EAE6DF]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 205px, 225px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
