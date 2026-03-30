"use client";

import Image from "next/image";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";

const visuals = [
  {
    id: "quickstay-proof",
    title: "QuickStay Deployment Snapshot",
    category: "Project Visual",
    image: "https://opengraph.githubassets.com/visual-1/shivam6677ojh/QuickStay-HotelBooking",
    source: "https://github.com/shivam6677ojh/QuickStay-HotelBooking",
  },
  {
    id: "chat-proof",
    title: "ChatSphere Repository Snapshot",
    category: "Project Visual",
    image: "https://opengraph.githubassets.com/visual-2/shivam6677ojh/chatting-platform",
    source: "https://github.com/shivam6677ojh/chatting-platform",
  },
  {
    id: "certificate-proof",
    title: "VanillaKart Internship Certificate",
    category: "Certificate Visual",
    image:
      "https://raw.githubusercontent.com/shivam6677ojh/shivam-certificate/main/Vanillakart%20internship%20certificate%20for%20Shivam.jpg",
    source:
      "https://github.com/shivam6677ojh/shivam-certificate/blob/main/Vanillakart%20internship%20certificate%20for%20Shivam.jpg",
  },
];

export function VisualsSection() {
  return (
    <section id="visuals" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="Visual Proof"
        title="Project and credential visuals"
        description="A dedicated gallery to showcase real screenshots and certification artifacts for trust and verification."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {visuals.map((item) => (
          <InteractiveCard
            key={item.id}
            variant="cyan"
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/70"
          >
            <a href={item.source} target="_blank" rel="noreferrer" className="block">
              <div className="relative h-52">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ff4d4d]">{item.category}</p>
                <p className="mt-2 text-sm font-semibold text-[#f4f4f4]">{item.title}</p>
              </div>
            </a>
          </InteractiveCard>
        ))}
      </div>
    </section>
  );
}
