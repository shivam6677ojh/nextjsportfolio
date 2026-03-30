"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BootLoader() {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    let startedAt = 0;

    const loop = (time: number) => {
      if (!startedAt) {
        startedAt = time;
      }

      const elapsed = time - startedAt;
      const duration = 2400;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 4);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(loop);
      }
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDisplayProgress((value) => {
        if (value >= progress) {
          return value;
        }
        return value + Math.max((progress - value) * 0.18, 0.7);
      });
    }, 20);

    return () => window.clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    if (displayProgress < 100) {
      document.body.style.overflow = "hidden";
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 460);

    return () => window.clearTimeout(exitTimer);
  }, [displayProgress]);

  if (!visible) {
    return null;
  }

  const uiProgress = Math.min(Math.round(displayProgress), 100);

  return (
    <AnimatePresence>
      <motion.div
        key="boot-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: uiProgress >= 100 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="fixed inset-0 z-120 flex items-center justify-center bg-[#050505]"
      >
        <div className="boot-loader-grid" />
        <div className="boot-loader-vignette" />
        <div className="boot-loader-stars" />

        <div className="relative z-10 w-[min(92vw,620px)] rounded-3xl border border-[#ff4d4d]/30 bg-black/70 px-6 py-8 backdrop-blur-2xl sm:px-10">
          <div className="boot-loader-scanline" />

          <p className="mb-2 text-center text-[11px] uppercase tracking-[0.38em] text-[#ff8f8f]">Next.js Warp Sequence</p>
          <h1 className="text-center text-3xl font-semibold tracking-[0.12em] text-[#ffeaea] sm:text-4xl">SHIVAM OJHA</h1>

          <div className="mt-7 flex items-center justify-center gap-4">
            <div className="robot-eye-unit">
              <div className="robot-eye-core" />
            </div>
            <div className="robot-eye-unit">
              <div className="robot-eye-core" />
            </div>
          </div>

          <div className="mt-8">
            <div className="h-2.5 overflow-hidden rounded-full border border-[#ff4d4d]/35 bg-[#140707]">
              <motion.div
                className="h-full bg-linear-to-r from-[#ff1a1a] via-[#ff7b3d] to-[#ff1a1a] shadow-[0_0_24px_rgba(255,56,56,0.95)]"
                animate={{ width: `${uiProgress}%` }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#ffc1c1]">
              <span>Hydrating Interface</span>
              <span>{uiProgress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
