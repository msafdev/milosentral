"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import SmoothScroll from "@/components/SmoothScroll";
import HeaderNav from "@/components/HeaderNav";
import AudioCompanion from "@/components/AudioCompanion";
import LetterSection from "@/components/LetterSection";
import WordReveal from "@/components/WordReveal";
import MemoryCollage from "@/components/MemoryCollage";

const FLOATING_MILOS = [
  // Left side — spread well apart vertically & horizontally
  {
    id: "milo-1",
    src: "/images/chibis/milo-1.png",
    alt: "Cat in a slice of bread",
    position: "left-[2%] sm:left-[4%] lg:left-[6%] top-[15px] sm:top-[25px]",
    size: "w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16",
    rotate: -10,
    floatDelay: 0,
  },
  {
    id: "milo-2",
    src: "/images/chibis/milo-2.png?v=2",
    alt: "Tired cat doodle",
    position: "left-[8%] sm:left-[12%] lg:left-[16%] top-[165px] sm:top-[185px]",
    size: "w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px]",
    rotate: 8,
    floatDelay: 0.4,
  },
  {
    id: "milo-3",
    src: "/images/chibis/milo-3.png",
    alt: "Cozy blanket cat",
    position: "left-[3%] sm:left-[5%] lg:left-[8%] top-[320px] sm:top-[350px]",
    size: "w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px]",
    rotate: -6,
    floatDelay: 0.9,
  },
  // Right side — spread well apart vertically & horizontally
  {
    id: "milo-4",
    src: "/images/chibis/milo-4.png",
    alt: "Pixel blue pegasus",
    position: "right-[7%] sm:right-[11%] lg:right-[15%] top-[10px] sm:top-[20px]",
    size: "w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px]",
    rotate: 9,
    floatDelay: 0.2,
  },
  {
    id: "milo-5",
    src: "/images/chibis/milo-5.png",
    alt: "Pixel purple unicorn",
    position: "right-[2%] sm:right-[4%] lg:right-[6%] top-[165px] sm:top-[185px]",
    size: "w-14 h-14 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]",
    rotate: -9,
    floatDelay: 0.7,
  },
  {
    id: "milo-6",
    src: "/images/chibis/milo-6.png?v=2",
    alt: "Pixel yellow pegasus with pink mane",
    position: "right-[6%] sm:right-[10%] lg:right-[14%] top-[325px] sm:top-[355px]",
    size: "w-14 h-14 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]",
    rotate: 7,
    floatDelay: 1.1,
  },
];

// Scattered ONLY below the snapshots, placed on the opposite margins of the side PhotoCards
const LETTER_SCRIBBLES = [
  // Beside opening paragraph (no PhotoCard here)
  // Beside Section 1
  {
    id: "scribble-cloud",
    src: "/images/scribble-3.png",
    position: "left-[5%] xl:left-[12%] top-[30px]",
    size: "w-12 h-9 sm:w-14 sm:h-10",
    rotate: -8,
  },
  {
    id: "scribble-sun",
    src: "/images/scribble-7.png",
    position: "right-[6%] xl:right-[13%] top-[70px]",
    size: "w-11 h-11 sm:w-13 sm:h-13",
    rotate: 12,
  },
  // Opposite Section 1 (PhotoCard is on the left -> scribble on the right)
  {
    id: "scribble-yellow-flower",
    src: "/images/scribble-8.png",
    position: "right-[7%] xl:right-[15%] top-[340px]",
    size: "w-10 h-10 sm:w-11 sm:h-11",
    rotate: 14,
  },
  // Beside Passage 2 (thank you)
  {
    id: "scribble-orange-spiral",
    src: "/images/scribble-4.png",
    position: "left-[6%] xl:left-[14%] top-[660px]",
    size: "w-10 h-10 sm:w-11 sm:h-11",
    rotate: 15,
  },
  // Opposite Section 2 (PhotoCard is on the right -> scribble on the left)
  {
    id: "scribble-green-star",
    src: "/images/scribble-6.png",
    position: "left-[6%] xl:left-[14%] top-[980px]",
    size: "w-10 h-13 sm:w-12 sm:h-15",
    rotate: -11,
  },
  // Opposite Section 3 (PhotoCard is on the left -> scribble on the right)
  {
    id: "scribble-blue-waves",
    src: "/images/scribble-9.png",
    position: "right-[7%] xl:right-[14%] top-[1300px]",
    size: "w-12 h-11 sm:w-14 sm:h-12",
    rotate: -6,
  },
  // Beside Passage 4 (showing feelings)
  {
    id: "scribble-heart-rays",
    src: "/images/scribble-2.png",
    position: "left-[8%] xl:left-[16%] top-[1620px]",
    size: "w-12 h-8 sm:w-14 sm:h-9",
    rotate: -9,
  },
  // Opposite Section 4 (PhotoCard is on the right -> scribble on the left)
  {
    id: "scribble-green-hearts",
    src: "/images/scribble-10.png",
    position: "left-[5%] xl:left-[12%] top-[1940px]",
    size: "w-16 h-8 sm:w-20 sm:h-10",
    rotate: -7,
  },
  // Beside Passage 5 (fond memories)
  {
    id: "scribble-red-flower",
    src: "/images/scribble-5.png",
    position: "right-[7%] xl:right-[15%] top-[2240px]",
    size: "w-9 h-9 sm:w-10 sm:h-10",
    rotate: 12,
  },
  // Near closing passage
  {
    id: "scribble-red-star",
    src: "/images/scribble-11.png",
    position: "left-[8%] xl:left-[15%] top-[2480px]",
    size: "w-10 h-10 sm:w-11 sm:h-11",
    rotate: -12,
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const floatSlow = useTransform(scrollY, [0, 600], [0, -24]);
  const floatFast = useTransform(scrollY, [0, 600], [0, -42]);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen text-[#141413] overflow-x-clip paper-surface">
        {/* Initial 1.2s Full-Screen Blur & Fade-In Overlay */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1, backdropFilter: "blur(20px)" }}
          animate={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            transitionEnd: { display: "none" },
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-xl pointer-events-none select-none"
        />

        <HeaderNav />
        <AudioCompanion />

        {/* ===============================================================
            1. TOP PAINTERLY BLUE HEADER BLEED (Softened & Blurred Bottom)
            =============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden"
        >
          {/* SVG filter for impressionistic vertical oil-brush strokes (blue-shifted & softer) */}
          <svg className="sr-only" aria-hidden="true">
            <defs>
              <filter id="painterly-wash" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6 30" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0.08 0.15 0.35 0 0.06
                          0.14 0.50 0.22 0 0.15
                          0.18 0.32 0.75 0 0.24
                          0    0    0    1 0"
                />
              </filter>
            </defs>
          </svg>

          {/* Soft blue painterly wash with seamless multi-stop bottom fade */}
          <div
            aria-hidden="true"
            className="relative w-full h-60 sm:h-71.25 overflow-hidden pointer-events-none select-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 22%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.10) 72%, transparent 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 22%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.10) 72%, transparent 92%, transparent 100%)",
            }}
          >
            {/* Base cerulean/sky canvas */}
            <div className="absolute inset-0 bg-linear-to-b from-[#2E6EA6] via-[#6AA4D6] via-50% to-[#FAF9F5]" />

            {/* Impressionistic vertical brushed photography layer */}
            <div
              style={{ filter: "url(#painterly-wash)" }}
              className="absolute -inset-16 opacity-65 scale-110"
            >
              <Image
                src="/images/photo-1.jpg"
                alt=""
                fill
                sizes="100vw"
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Subtle vertical canvas brush lines */}
            <div
              className="absolute inset-0 opacity-15 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 4px)",
              }}
            />

            {/* Seamless paper-color feather gradient (no backdrop-blur box edge) */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#FAF9F5]/45 via-60% to-[#FAF9F5]" />
          </div>
        </motion.div>

        {/* ===============================================================
            2. HERO HEADLINE + FLOATING MILO CHARACTER STICKERS ONLY
            =============================================================== */}
        <div className="relative z-10 w-full -mt-14 sm:-mt-20 pb-32">
          {/* Mobile curated stickers floating gently in margins (does not overlap text) */}
          <div
            aria-hidden="true"
            className="md:hidden absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Top Left: Milo in bread */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.34, 1.35, 0.64, 1] }}
              className="absolute left-2 top-0 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-11 h-11 rotate-[-8deg] drop-shadow-[0_4px_10px_rgba(20,20,19,0.10)]"
              >
                <Image
                  src="/images/chibis/milo-1.png"
                  alt="Cat in a slice of bread"
                  fill
                  sizes="48px"
                  unoptimized
                  className="object-contain select-none"
                />
              </motion.div>
            </motion.div>

            {/* Top Right: Pixel Pegasus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.34, 1.35, 0.64, 1] }}
              className="absolute right-2 top-0 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="relative w-11 h-11 rotate-[8deg] drop-shadow-[0_4px_10px_rgba(20,20,19,0.10)]"
              >
                <Image
                  src="/images/chibis/milo-4.png"
                  alt="Pixel blue pegasus"
                  fill
                  sizes="48px"
                  unoptimized
                  className="object-contain select-none"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Milo character stickers around the hero (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-x-0 -top-4 h-130 max-w-7xl mx-auto pointer-events-none"
          >
            {FLOATING_MILOS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.72, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.28 + index * 0.08,
                  ease: [0.34, 1.35, 0.64, 1],
                }}
                className={`pointer-events-auto absolute ${item.position}`}
              >
                <motion.div
                  style={{
                    y: index % 2 === 0 ? floatSlow : floatFast,
                    rotate: item.rotate,
                  }}
                  whileHover={{ scale: 1.15, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3.4 + (index % 3) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.floatDelay,
                    }}
                    className={`relative ${item.size} drop-shadow-[0_6px_14px_rgba(20,20,19,0.12)]`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="80px"
                      unoptimized
                      className="object-contain select-none"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Prominent Serif Hero Title */}
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-2 pb-5 sm:pt-4 sm:pb-10 mb-2 sm:mb-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-serif text-[2.15rem] min-[390px]:text-[2.5rem] sm:text-[3.85rem] md:text-[4.85rem] leading-[1.08] sm:leading-[1.02] tracking-[-0.035em] text-[#141413] font-normal"
            >
              <span className="block">The Things I</span>
              <span className="block">Couldn&apos;t Say To You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-6 max-w-lg mx-auto font-mine-sans text-[14px] sm:text-[16px] leading-[1.6] text-[#6E6C65] tracking-[-0.015em] px-2 sm:px-0"
            >
              A personal note to Milo (Sentral), with a few memories from Bali
              and a lot of feelings I was too shy to say while you were here.
            </motion.p>
          </div>

          {/* ===============================================================
              3. INTERACTIVE MEMORY COLLAGE & STAMP STRIP
              =============================================================== */}
          <motion.div
            id="collage-view"
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.15, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-20"
          >
            <MemoryCollage />
          </motion.div>

          {/* ===============================================================
              4. THE LETTER: Prominent Dual-Tone Typography
                 + Taped Side Snapshots & Scattered Crayon Scribbles Below Snapshots
              =============================================================== */}
          <div className="relative">
            {/* Scattered crayon scribbles ONLY below the snapshots */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-0 max-w-7xl mx-auto pointer-events-none"
            >
              {LETTER_SCRIBBLES.map((scribble) => (
                <div
                  key={scribble.id}
                  style={{ transform: `rotate(${scribble.rotate}deg)` }}
                  className={`absolute ${scribble.position} ${scribble.size} opacity-85`}
                >
                  <Image
                    src={scribble.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain select-none"
                  />
                </div>
              ))}
            </div>

            <div
              id="letter-start"
              className="w-full max-w-lg mx-auto px-4 sm:px-6 mt-12 sm:mt-24 mb-6 sm:mb-8 scroll-mt-24"
            >
              {/* Salutation */}
              <h2 className="font-display-serif text-[28px] sm:text-[33px] text-[#141413] tracking-[-0.03em] mb-6 font-normal">
                Dear Milo,
              </h2>

              {/* Paragraph 1 */}
              <WordReveal text="i dont think i’ve fully processed the fact that *you came all the way to bali, alone, just to see me.* out of all people, out of all the places you could’ve been, all the things you could’ve done, and all the ways you could’ve spent your time, *you chose to be here w me,* n i don’t think u understand *how much that means to me.*" />
            </div>

            {/* Section 1 (Left Washi-Taped Polaroid 1) */}
            <LetterSection
              id="section-1"
              photo={{
                src: "/images/polaroids/polaroid-1.jpg",
                alt: "Polaroid 1",
                side: "left",
              }}
              paragraph="we went to sum places, planned and unplanned, walked around the beach(es), *thrifted TWICE,* shared little awkward moments, and made memories that might seem ordinary to anyone else, but to me *that was a week where i feel like im on top of the world.* n i know we can’t keep those moments forever, and *maybe that’s part of what makes them so precious to me.*"
            />

            {/* Paragraph 3 (Center Passage) */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-6 my-9 sm:my-16 md:my-20">
              <WordReveal text="*thank you for making the trip,* for covering A LOT of our expenses, and just for being there for me (and for urself). *thank you for choosing to spend your time with me.*" />
            </div>

            {/* Section 2 (Right Washi-Taped Polaroid 2) */}
            <LetterSection
              id="section-2"
              photo={{
                src: "/images/polaroids/polaroid-2.jpg",
                alt: "Polaroid 2",
                side: "right",
              }}
              paragraph="there's actually a lot of things i wish we could've done differently. *i kinda regret not making a proper itinerary,* or at least having a better idea of where to go and when. there were places i wanted to take you, things i wanted us to see, but somehow we ran out of time. i keep thinking about the places we didn't get to visit, and *i wish we had a few more days to fit them all in.* i guess that's something i'll have to make up for next time."
            />

            {/* Section 3 (Left Washi-Taped Polaroid 3) */}
            <LetterSection
              id="section-3"
              photo={{
                src: "/images/polaroids/polaroid-3.jpg",
                alt: "Polaroid 3",
                side: "left",
              }}
              paragraph="*i think what i miss most are the little things.* sleeping next to you, waking up beside you, the little kisses, your embarrassed face and the sounds you make when you're shy. *i miss having you close enough that i didn't have to think twice about reaching for you.* i didn't realise how much i'd get attached to those little moments until i had to go back to not having them."
            />

            {/* Paragraph 6 (Center Passage) */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-6 my-9 sm:my-16 md:my-20">
              <WordReveal text="i also feel like i didn't do the best job of showing you how i feel about you while you were here. maybe i got shy, maybe i just didn't know how to put everything into words, but *i hope you know that you mean a lot to me.* i want you to know *how deserving you are of being loved, and how easy you make it to love you.* you don't have to do anything special or be anyone other than yourself for me to feel that way. i just wish i could've made you feel it a little more." />
            </div>

            {/* Section 4 (Right Washi-Taped Polaroid 4) */}
            <LetterSection
              id="section-4"
              photo={{
                src: "/images/polaroids/polaroid-4.jpg",
                alt: "Polaroid 4",
                side: "right",
              }}
              paragraph="next time, *i want to ask you out properly.* i want to be less shy about how i feel, say the things i sometimes keep to myself, and *make sure you never have to guess how much you mean to me.* i want to take you to all the places we missed, actually have an itinerary this time (i promise), and *hopefully have more time together.*"
            />

            {/* Paragraph 8 (Center Passage) */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-6 my-9 sm:my-16 md:my-20">
              <WordReveal text="i hope you had as good a time here as i did. *i hope you took home some memories that you'll look back on fondly,* because i know i will. and even though i wish we had more time, *i wouldn't trade the week we had for anything.* i'm really, really glad you came, Milo." />
            </div>

            {/* ===============================================================
                5. WARM, SIMPLE SIGN-OFF
                =============================================================== */}
            <div
              id="letter-close"
              className="w-full max-w-lg mx-auto px-4 sm:px-6 mt-12 sm:mt-24 pb-8 sm:pb-12 scroll-mt-24"
            >
              <WordReveal
                startOffset="start 0.88"
                endOffset="start 0.65"
                text="*i miss you already, and i love u :3*"
              />

              {/* Clean separator + well-spaced personal sign-off */}
              <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-black/8 flex items-end justify-between gap-3 sm:gap-6">
                <div className="min-w-0">
                  <p className="font-caveat text-[22px] sm:text-[27px] text-[#7E7B74] leading-none">
                    ur gf,
                  </p>

                  <div className="mt-2 sm:mt-3 flex items-center gap-2.5 sm:gap-3">
                    <p className="font-mine-sans font-semibold text-[28px] sm:text-[38px] text-[#141413] tracking-[-0.04em] leading-none">
                      mon
                    </p>
                    <div className="relative w-9 h-5 sm:w-11 sm:h-6.5 -rotate-6 opacity-90 select-none">
                      <Image
                        src="/images/scribble-12.png"
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="mt-5 sm:mt-8 font-caveat text-[18px] sm:text-[24px] text-[#6E6B64] leading-snug">
                    p.s. ur next babi guling is on me.
                  </p>
                </div>

                <motion.div
                  initial={{ rotate: 4 }}
                  whileHover={{ rotate: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 drop-shadow-[0_4px_10px_rgba(20,20,19,0.08)] select-none"
                >
                  <Image
                    src="/images/chibis/bottom.png"
                    alt="Cat holding a love letter"
                    fill
                    sizes="112px"
                    unoptimized
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
