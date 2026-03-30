"use client";

import { motion } from "framer-motion";
import { certificates, projects, siteConfig } from "@/lib/site-data";

const separator = "★";

export function CredibilityStrip() {
  const tapeItems = [
    "Based in India",
    siteConfig.role,
    `${projects.length}+ Project Builds`,
    `${certificates.length}+ Verified Certificates`,
    "React • Next.js • Node.js",
    "Open for Freelance",
  ];

  const content = [...tapeItems, ...tapeItems];

  return (
    <section aria-label="Highlights" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="cross-boundary-frame overflow-hidden rounded-xs border border-black/85 bg-[#f6a303] shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
        <motion.div
          className="flex min-w-max items-center whitespace-nowrap py-3"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {content.map((item, index) => (
            <p
              key={`${item}-${index}`}
              className="px-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#090909] sm:text-[1.05rem]"
            >
              {item}
              <span className="ml-5">{separator}</span>
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
