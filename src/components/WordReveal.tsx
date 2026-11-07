"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  UseScrollOptions,
} from "motion/react";

type ScrollOffsetEdge = NonNullable<UseScrollOptions["offset"]>[number];

interface WordRevealProps {
  text: string;
  className?: string;
  startOffset?: ScrollOffsetEdge;
  endOffset?: ScrollOffsetEdge;
}

interface WordToken {
  word: string;
  isStrong: boolean;
}

interface WordProps {
  token: WordToken;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ token, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <>
      <motion.span
        style={{ opacity }}
        className={`inline-block select-text will-change-[opacity] ${
          token.isStrong
            ? "text-[#141413] font-medium"
            : "text-[#8C8982] font-normal"
        }`}
      >
        {token.word}
      </motion.span>{" "}
    </>
  );
}

/**
 * Parses text where phrases wrapped in *...* become strong dark ink (#141413)
 * and surrounding clauses stay in warm muted stone (#8C8982), matching Reference 1 ("Mine").
 */
function parseTokens(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  // Split by *...* segments
  const parts = text.split(/(\*[^*]+\*)/g);

  for (const part of parts) {
    if (!part.trim()) continue;
    const isStrong = part.startsWith("*") && part.endsWith("*");
    const cleanPart = isStrong ? part.slice(1, -1) : part;
    const words = cleanPart.trim().split(/\s+/);
    for (const w of words) {
      if (w) tokens.push({ word: w, isStrong });
    }
  }

  return tokens;
}

export default function WordReveal({
  text,
  className = "",
  startOffset = "start 0.8",
  endOffset = "start 0.46",
}: WordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startOffset, endOffset],
  });

  const tokens = parseTokens(text);
  const totalWords = tokens.length;

  return (
    <p
      ref={containerRef}
      className={`text-left font-mine-sans text-[1.125rem] min-[390px]:text-[1.18rem] sm:text-[1.42rem] leading-[1.48] sm:leading-[1.46] text-[#8C8982] select-text tracking-[-0.022em] ${className}`}
    >
      {tokens.map((token, i) => {
        const step = 1 / totalWords;
        const start = i * step;
        const end = Math.min(1, start + step * 1.35);

        return (
          <Word
            key={`${i}-${token.word}`}
            token={token}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}
