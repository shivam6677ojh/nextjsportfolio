"use client";

import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig, skills } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="about" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="About"
        title="Engineering with reliability and design precision"
        description="I design and ship modern full-stack products where frontend quality and backend reliability move together."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <InteractiveCard
          variant="amber"
          className="grid gap-8 rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d4d]">Who I Am</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#f7f7f7]">{siteConfig.name}</h3>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c5c5c5] sm:text-base">{siteConfig.bio}</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d4d]">Core Skills</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#ff4d4d]/40 bg-[#210909]/70 px-4 py-2 text-xs font-medium text-[#ffd4d4]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </section>
  );
}
