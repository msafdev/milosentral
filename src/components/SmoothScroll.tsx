"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.8,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
