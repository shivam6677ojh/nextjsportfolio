"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Visuals", href: "#visuals" },
  { label: "Certificates", href: "#certificates" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      data-fall
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <nav className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a href="#home" className="text-xs font-semibold tracking-[0.25em] text-[#e5e5e5] sm:text-sm">
            SHIVAM OJHA
          </a>
          <ul className="hidden items-center gap-6 text-sm text-[#cfcfcf] md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a className="transition hover:text-[#ff4d4d]" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#projects"
            className="rounded-full border border-[#ff4d4d]/70 px-3 py-1.5 text-[11px] font-semibold text-[#ffe5e5] shadow-[0_0_20px_rgba(255,26,26,0.35)] transition hover:border-[#ff1a1a] hover:bg-[#ff1a1a]/20 sm:px-4 sm:text-xs"
          >
            Explore Work
          </a>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-white/18 bg-black/35 px-3 py-1.5 text-[11px] text-[#f1dada] transition hover:border-[#ff4d4d]/70"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
