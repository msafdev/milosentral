"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export interface MemoryItem {
  id: string;
  src: string;
  place: string;
  detail: string;
  tilt: number;
}

const MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    src: "/images/snapshots/snapshot-1.jpg",
    place: "batu belig beach",
    detail: ".",
    tilt: -3,
  },
  {
    id: "mem-2",
    src: "/images/snapshots/snapshot-2.jpg",
    place: "pura geger beach",
    detail: "the earth will remember how soft you felt.",
    tilt: 2,
  },
  {
    id: "mem-3",
    src: "/images/snapshots/snapshot-3.jpg",
    place: "mandharu cafe",
    detail: "me, u, n fake butter",
    tilt: -2,
  },
  {
    id: "mem-4",
    src: "/images/snapshots/snapshot-4.jpg",
    place: "badung market",
    detail: "u look so close, yet so far away",
    tilt: 2.5,
  },
];

export default function MemoryCollage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MEMORIES[activeIndex];

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-6 my-6 sm:my-10 select-none">
      {/* Displaces ONLY SourceAlpha and masks the undistorted SourceGraphic with it */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="brushed-edge-only" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceAlpha"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              result="brushedAlpha"
            />
            <feComposite
              in="SourceGraphic"
              in2="brushedAlpha"
              operator="in"
            />
          </filter>
        </defs>
      </svg>

      {/* Main Snapshot Frame: 100% undistorted photo inside + clean jagged alpha edge */}
      <div className="relative w-full aspect-4/3 mx-auto p-1.5 sm:p-2">
        <div
          style={{ filter: "url(#brushed-edge-only)" }}
          className="relative w-full h-full rounded-3xl sm:rounded-[44px] overflow-hidden bg-[#EFECE4]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={active.src}
                alt={active.place}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                className="object-cover"
              />
              {/* Soft bottom gradient for handwritten caption legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Clean handwritten caption inside the lower shadow of the photo (no clunky beige pill box) */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active.id + "-detail"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3.5 sm:bottom-7 inset-x-3 sm:inset-x-6 text-center font-caveat text-[17px] sm:text-[23px] leading-tight sm:leading-normal text-[#FAF9F5] drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] pointer-events-none"
          >
            {active.detail}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Caption Line */}
      <div className="mt-3 text-center font-mine-sans text-[12.5px] sm:text-[14px] text-[#7E7B74] tracking-[-0.01em] px-2">
        We were last seen at{" "}
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % MEMORIES.length)
          }
          className="text-[#141413] font-medium underline decoration-dotted decoration-[#A8A49C] underline-offset-4 hover:decoration-[#141413] transition-colors cursor-pointer touch-manipulation"
        >
          {active.place}
        </button>
      </div>

      {/* Tactile Mini Photo Print Strip */}
      <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-4 touch-manipulation">
        {MEMORIES.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              initial={false}
              animate={{
                rotate: isSelected ? 0 : item.tilt,
                y: isSelected ? -4 : 0,
                scale: isSelected ? 1.05 : 1,
              }}
              whileHover={{ y: -4, scale: 1.06, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`relative w-13 h-9.75 sm:w-16 sm:h-12.5 p-0.5 sm:p-1 bg-[#FFFDF9] rounded-[3px] cursor-pointer touch-manipulation transition-opacity ${
                isSelected
                  ? "shadow-[0_8px_18px_-4px_rgba(20,20,19,0.18),0_0_0_1px_rgba(20,20,19,0.12)] opacity-100 z-10"
                  : "shadow-[0_2px_6px_rgba(20,20,19,0.08),0_0_0_1px_rgba(20,20,19,0.05)] opacity-65 hover:opacity-95"
              }`}
              title={item.place}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[1px] bg-[#EAE6DF]">
                <Image
                  src={item.src}
                  alt={item.place}
                  fill
                  sizes="68px"
                  className="object-cover"
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
