"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function HeaderNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[1.5px] bg-transparent z-50 pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-[#1C1B19]/35 origin-left"
      />
    </div>
  );
}
