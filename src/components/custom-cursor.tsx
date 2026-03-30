"use client";

import { isTouchDevice } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 500, damping: 38 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 38 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => {
      setEnabled(!mediaQuery.matches && !isTouchDevice());
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      setHovering(Boolean(target.closest("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-100 h-6 w-6 rounded-full border border-[#ff4d4d]/80 bg-[#ff1a1a]/20 shadow-[0_0_18px_rgba(255,26,26,0.9)] mix-blend-screen"
      style={{ x: smoothX, y: smoothY, scale: hovering ? 1.7 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    />
  );
}
