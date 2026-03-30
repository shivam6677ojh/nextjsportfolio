"use client";

import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site-data";
import type { Project } from "@/lib/types";

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeOverview, setActiveOverview] = useState(0);

  const total = projects.length;

  const activeProject = projects[activeOverview];

  const goPrev = () => {
    setActiveOverview((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveOverview((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (total < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveOverview((prev) => (prev + 1) % total);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [total]);

  const panelOffsets = useMemo(
    () =>
      projects.map((_, index) => {
        let offset = index - activeOverview;
        if (offset > total / 2) {
          offset -= total;
        }
        if (offset < -total / 2) {
          offset += total;
        }
        return offset;
      }),
    [activeOverview, total],
  );

  return (
    <section id="projects" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="Projects"
        title="Real products, real repositories, real deployment proof"
        description="Each project card links directly to repository and live deployment, with additional proof snapshots inside the modal."
      />

      <div className="mb-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,40,40,0.06))] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-[#ff9c9c]">Moving Project Overview</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="rounded-full border border-white/15 bg-black/40 p-2 text-white transition hover:border-[#ff5d5d] hover:text-[#ffd0d0]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="rounded-full border border-white/15 bg-black/40 p-2 text-white transition hover:border-[#ff5d5d] hover:text-[#ffd0d0]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative h-[310px] sm:h-[360px] [perspective:1300px]">
          {projects.map((project, index) => {
            const offset = panelOffsets[index];
            const isVisible = Math.abs(offset) <= 1;

            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => setActiveOverview(index)}
                className={`absolute left-1/2 top-1/2 h-[260px] w-[72vw] max-w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.6rem] border border-white/15 bg-black/45 text-left backdrop-blur-xl sm:h-[310px] sm:max-w-[360px] ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{
                  x:
                    offset === 0
                      ? 0
                      : offset < 0
                        ? -Math.min(300, 200 + Math.abs(offset) * 70)
                        : Math.min(300, 200 + Math.abs(offset) * 70),
                  y: offset === 0 ? 0 : 8,
                  scale: offset === 0 ? 1 : 0.9,
                  rotateY: offset === 0 ? 0 : offset < 0 ? 21 : -21,
                  opacity: Math.abs(offset) <= 1 ? 1 : 0,
                  zIndex: offset === 0 ? 40 : 20,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={project.previewImage}
                  alt={`${project.title} overview`}
                  fill
                  sizes="(max-width: 640px) 72vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/5" />
                <div className="absolute bottom-0 w-full p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb2b2]">{project.subtitle}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#f7f7f7] sm:text-xl">{project.title}</h3>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-[#f4f4f4]">{activeProject.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#cdcdcd]">{activeProject.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeProject.techStack.slice(0, 6).map((tech) => (
              <span key={tech} className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-[#ead9d9]">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ff4d4d] hover:text-[#ffb7b7]"
            >
              <ExternalLink size={14} /> GitHub
            </a>
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff1a1a] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(255,26,26,0.55)] transition hover:bg-[#ff4d4d]"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <button
              type="button"
              onClick={() => {
                setSelected(activeProject);
                setActiveImage(0);
              }}
              className="rounded-full border border-[#ff4d4d]/70 px-4 py-2 text-xs font-semibold text-[#ffcccc] transition hover:bg-[#ff1a1a]/20"
            >
              View Proof
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveOverview(index)}
              aria-label={`Open ${project.title}`}
              className={`h-2.5 rounded-full transition ${index === activeOverview ? "w-8 bg-[#ff4d4d]" : "w-2.5 bg-white/35 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <InteractiveCard
            key={project.id}
            variant="crimson"
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/70 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
          >
            <article>
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#f4f4f4]">{project.title}</h3>
                  <p className="mt-1 text-sm text-[#ff8181]">{project.subtitle}</p>
                </div>
                <p className="text-sm leading-relaxed text-[#c7c7c7]">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#ff4d4d]/35 bg-[#2b0e0e] px-3 py-1 text-xs text-[#ffc8c8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ff4d4d] hover:text-[#ffb7b7]"
                  >
                    <ExternalLink size={14} /> GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ff1a1a] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(255,26,26,0.55)] transition hover:bg-[#ff4d4d]"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(project);
                      setActiveImage(0);
                    }}
                    className="rounded-full border border-[#ff4d4d]/70 px-4 py-2 text-xs font-semibold text-[#ffcccc] transition hover:bg-[#ff1a1a]/20"
                  >
                    View Proof
                  </button>
                </div>
              </div>
            </article>
          </InteractiveCard>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-85 grid place-items-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white"
            >
              <X size={16} />
            </button>

            <div className="relative h-64 w-full sm:h-80">
              <Image
                src={selected.screenshots[activeImage]}
                alt={`${selected.title} screenshot ${activeImage + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage((prev) => (prev - 1 + selected.screenshots.length) % selected.screenshots.length)
                  }
                  className="rounded-full border border-white/30 bg-black/60 p-2 text-white"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage((prev) => (prev + 1) % selected.screenshots.length)}
                  className="rounded-full border border-white/30 bg-black/60 p-2 text-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <h4 className="text-2xl font-semibold text-[#f3f3f3]">{selected.title}</h4>
              <ul className="space-y-2 text-sm text-[#cccccc]">
                {selected.highlights.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/2 px-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white"
                >
                  Repository Proof
                </a>
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#ff1a1a] px-4 py-2 text-xs font-semibold text-white"
                >
                  Open Live Product
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
