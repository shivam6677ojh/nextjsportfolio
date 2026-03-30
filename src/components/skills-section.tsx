"use client";

import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { skillGroups } from "@/lib/site-data";

export function SkillsSection() {
  return (
    <section id="skills" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="bg-linear-to-r from-[#ffb0b0] via-[#ff5757] to-[#ff1a1a] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          Skills & Technologies
        </h2>
        <div className="mx-auto mt-4 h-1 w-44 rounded-full bg-linear-to-r from-[#ff7a7a] to-[#ff1a1a] shadow-[0_0_20px_rgba(255,42,42,0.45)]" />
      </div>

      <div className="space-y-10">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: groupIndex * 0.06 }}
          >
            <h3 className="mb-4 text-center text-2xl font-semibold text-[#ff8e8e] sm:text-3xl">{group.title}</h3>
            <div className="flex flex-wrap items-stretch justify-center gap-3">
              {group.items.map((item) => (
                <InteractiveCard
                  key={item.id}
                  variant="crimson"
                  className="w-32 rounded-xl border border-[#ff2e2e]/65 bg-linear-to-br from-[#070404]/95 via-[#140708]/95 to-[#22080a]/92 px-2 py-4 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#ff3d3d]/60 bg-[#120607]/85 text-2xl font-semibold text-[#fff0f0]">
                    {item.mark}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#fff1f1]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#ffb3b3]">{item.detail}</p>
                </InteractiveCard>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
