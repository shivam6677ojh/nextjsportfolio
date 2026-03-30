"use client";

import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/interactive-card";
import { education } from "@/lib/site-data";

export function EducationSection() {
  return (
    <section id="education" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="bg-linear-to-r from-[#ffb0b0] via-[#ff5757] to-[#ff1a1a] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
          Education
        </h2>
        <div className="mx-auto mt-4 h-1 w-40 rounded-full bg-linear-to-r from-[#ff7a7a] to-[#ff1a1a] shadow-[0_0_20px_rgba(255,42,42,0.45)]" />
      </div>

      <div className="space-y-7">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <InteractiveCard
              variant="crimson"
              className="mx-auto max-w-5xl rounded-2xl border border-[#ff2e2e]/65 bg-linear-to-r from-[#080404]/95 via-[#1a090a]/94 to-[#30090c]/90 p-6 text-center sm:p-7"
            >
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-3xl font-semibold text-[#ff8f8f] sm:text-4xl">{item.institution}</h3>
                <p className="text-base text-[#ffb0b0] sm:text-lg">{item.period}</p>
              </div>

              <p className="mt-3 text-lg leading-relaxed text-[#fff1f1] sm:text-2xl">{item.qualification}</p>
              <p className="mt-3 text-base text-[#ffd3d3] sm:text-xl">{item.location}</p>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
