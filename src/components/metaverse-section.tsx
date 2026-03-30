"use client";

import { Cuboid, Orbit, Radar } from "lucide-react";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";

const metaverseTracks = [
  {
    id: "world-building",
    title: "Immersive World Layer",
    description:
      "Building spatial web scenes with interactive 3D objects, depth-driven motion, and smooth camera storytelling.",
    icon: Cuboid,
    tags: ["R3F", "Three.js", "Shader-ready"],
    variant: "cyan" as const,
  },
  {
    id: "identity-presence",
    title: "Identity and Presence",
    description:
      "Designing real-time presence systems with avatar states, room-aware interactions, and event streams.",
    icon: Orbit,
    tags: ["Socket.io", "Realtime", "Presence"],
    variant: "violet" as const,
  },
  {
    id: "ai-spaces",
    title: "AI-Native Spatial UX",
    description:
      "Combining assistant agents with 3D interfaces to create guided, context-aware metaverse product journeys.",
    icon: Radar,
    tags: ["Agent UX", "Context AI", "Spatial UI"],
    variant: "amber" as const,
  },
];

export function MetaverseSection() {
  return (
    <section id="metaverse" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="Metaverse"
        title="Metaverse-ready product direction"
        description="A future-facing layer focused on immersive 3D environments, real-time presence, and intelligent spatial experiences."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {metaverseTracks.map((track) => {
          const Icon = track.icon;

          return (
            <InteractiveCard
              key={track.id}
              variant={track.variant}
              className="rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-2xl"
            >
              <article>
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/6">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#f4f4f4]">{track.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#cfcfcf]">{track.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {track.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-[#e8e8e8]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </InteractiveCard>
          );
        })}
      </div>
    </section>
  );
}
