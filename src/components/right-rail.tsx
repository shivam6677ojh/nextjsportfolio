"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-data";

function formatDateTime(date: Date) {
  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const timeLabel = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  return { dateLabel, timeLabel };
}

export function RightRail() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = now ? formatDateTime(now).dateLabel : "-- --- ----";
  const timeLabel = now ? formatDateTime(now).timeLabel : "--:--:-- --";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="pointer-events-none fixed right-4 top-20 z-45 hidden xl:block"
      aria-label="Quick links and live date-time"
    >
      <div className="pointer-events-auto text-right">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff9c9c]">Live Status</p>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-end gap-2 text-xs text-[#ffd6d6]">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded border border-[#ff9d9d]/50 text-[9px] font-semibold">D</span>
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-sm font-semibold text-[#fff4f4]">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded border border-[#ff9d9d]/50 text-[9px] font-semibold">T</span>
            <span>{timeLabel}</span>
          </div>
        </div>

        <div className="mt-3 grid justify-items-end gap-1.5 text-xs">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-b border-[#ff4d4d]/30 pb-0.5 text-[#ececec] transition hover:border-[#ff4d4d] hover:text-[#ffd4d4]"
          >
            <span>GitHub</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#ff4d4d]/35 text-[9px] font-semibold transition group-hover:rotate-6">GH</span>
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-b border-[#ff4d4d]/30 pb-0.5 text-[#ececec] transition hover:border-[#ff4d4d] hover:text-[#ffd4d4]"
          >
            <span>LinkedIn</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#ff4d4d]/35 text-[9px] font-semibold transition group-hover:-translate-y-0.5">IN</span>
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
