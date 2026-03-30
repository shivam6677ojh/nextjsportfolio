"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const stopTimer = useRef<number | null>(null);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  const sparkX = useTransform(scrollYProgress, (value) => `${Math.min(Math.max(value * 100, 0), 100)}%`);

  useMotionValueEvent(scrollYProgress, "change", () => {
    setIsScrolling(true);

    if (stopTimer.current) {
      window.clearTimeout(stopTimer.current);
    }

    stopTimer.current = window.setTimeout(() => setIsScrolling(false), 140);
  });

  useEffect(() => {
    return () => {
      if (stopTimer.current) {
        window.clearTimeout(stopTimer.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-90">
      <motion.div
        className="fire-beam-core h-1 origin-left bg-linear-to-r from-[#ff1a1a] via-[#ff6a3d] to-[#ff1a1a]"
        style={{ scaleX }}
      />
      <motion.div
        className={`fire-beam-flame absolute inset-x-0 top-0 h-2 origin-left ${isScrolling ? "is-active" : ""}`}
        style={{ scaleX }}
      />
      <motion.div
        className={`fire-beam-spark absolute top-0.5 h-3 w-3 -translate-x-1/2 rounded-full ${isScrolling ? "is-active" : ""}`}
        style={{ left: sparkX }}
      />
    </div>
  );
}
