"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

function EyeGlyph({ x, y, className }: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring>; className: string }) {
  const pupilX = useTransform(x, [0, 1], [-8, 8]);
  const pupilY = useTransform(y, [0, 1], [-6, 6]);

  return (
    <div className={className}>
      <div className="flex h-20 w-32 items-center justify-center rounded-4xl border border-[#ff4d4d]/30 bg-black/45 backdrop-blur-xl">
        <div className="relative h-10 w-10 rounded-full border border-[#ff8f8f]/40 bg-[#220909]">
          <motion.div
            style={{ x: pupilX, y: pupilY }}
            className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff1a1a] shadow-[0_0_16px_rgba(255,26,26,0.9)]"
          />
        </div>
      </div>
    </div>
  );
}

export function SiteBackground() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const smoothX = useSpring(mx, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(my, { stiffness: 80, damping: 24 });

  const blobOneX = useTransform(smoothX, [0, 1], [-120, 120]);
  const blobOneY = useTransform(smoothY, [0, 1], [-80, 80]);
  const blobTwoX = useTransform(smoothX, [0, 1], [100, -100]);
  const blobTwoY = useTransform(smoothY, [0, 1], [70, -70]);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => {
        const left = ((index * 37) % 100) + "%";
        const top = ((index * 53) % 100) + "%";
        const size = 1 + ((index * 11) % 3);
        const duration = 2.5 + ((index * 7) % 6) * 0.35;
        const delay = ((index * 17) % 100) / 10;
        const opacity = 0.3 + ((index * 5) % 6) * 0.1;

        return { left, top, size, duration, delay, opacity };
      }),
    [],
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mx.set(event.clientX / window.innerWidth);
      my.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(35,89,255,0.15),transparent_40%),radial-gradient(circle_at_82%_68%,rgba(255,45,45,0.18),transparent_45%),linear-gradient(140deg,#02040b_0%,#05070f_48%,#0a0608_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0.2px,transparent_0.2px)] bg-size-[3px_3px] opacity-20" />

      {stars.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className="space-star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <div className="shooting-star shooting-star--one" />
      <div className="shooting-star shooting-star--two" />

      <motion.div
        style={{ x: blobOneX, y: blobOneY }}
        className="absolute -left-36 top-20 h-72 w-72 rounded-full bg-[#3c5dff]/20 blur-3xl"
      />
      <motion.div
        style={{ x: blobTwoX, y: blobTwoY }}
        className="absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-[#ff4d4d]/14 blur-3xl"
      />

      <EyeGlyph x={smoothX} y={smoothY} className="absolute left-[4%] top-[28%] hidden opacity-55 md:block" />
      <EyeGlyph x={smoothX} y={smoothY} className="absolute right-[5%] top-[55%] hidden opacity-45 md:block" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(0,0,0,0.7)_78%)]" />
    </div>
  );
}
