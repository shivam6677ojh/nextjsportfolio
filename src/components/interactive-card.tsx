"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "crimson" | "cyan" | "violet" | "amber";
};

export function InteractiveCard({ children, className = "", variant = "crimson" }: InteractiveCardProps) {
  return (
    <motion.div
      className={`card-fx card-fx--${variant} ${className}`.trim()}
      onMouseMove={(event) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;

        target.style.setProperty("--mx", `${px}%`);
        target.style.setProperty("--my", `${py}%`);
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
