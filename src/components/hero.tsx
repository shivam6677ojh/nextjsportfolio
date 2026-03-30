"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { RobotEyesBackdrop } from "@/components/robot-eyes-backdrop";
import { certificates, education, projects, siteConfig } from "@/lib/site-data";

const HeroCanvas = dynamic(() => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
});

export function Hero() {
  const [canvasEnabled, setCanvasEnabled] = useState(false);
  const [isProfilePreviewOpen, setIsProfilePreviewOpen] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const x = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 120, damping: 20 });
  const y = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 120, damping: 20 });

  const background = useMemo(
    () =>
      "radial-gradient(circle at 8% 8%, rgba(255,26,26,0.24), rgba(10,10,10,0.95) 34%), radial-gradient(circle at 82% 65%, rgba(255,77,77,0.24), transparent 48%), linear-gradient(130deg, #0a0a0a, #080808)",
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCanvasState = () => {
      setCanvasEnabled(window.innerWidth > 768 && !mediaQuery.matches);
    };

    updateCanvasState();
    window.addEventListener("resize", updateCanvasState);
    mediaQuery.addEventListener("change", updateCanvasState);

    return () => {
      window.removeEventListener("resize", updateCanvasState);
      mediaQuery.removeEventListener("change", updateCanvasState);
    };
  }, []);

  return (
    <section
      id="home"
      data-fall
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background }}
      onMouseMove={(event) => {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - left) / width);
        mouseY.set((event.clientY - top) / height);
      }}
    >
      {canvasEnabled ? <HeroCanvas /> : null}
      <RobotEyesBackdrop mouseX={mouseX} mouseY={mouseY} />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-14 pt-24 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 lg:pt-20">
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, x: -90, y: -80, filter: "blur(14px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#ff4d4d]/35 bg-[#210808]/60 px-4 py-1.5 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#ff4d4d] shadow-[0_0_18px_rgba(255,77,77,0.9)]" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb1b1]">Available for Freelance</p>
            </div>
          </div>

          <h1 className="text-[clamp(2.2rem,6.4vw,5.5rem)] font-semibold leading-[0.95] text-[#f8f8f8]">
            Hi, I&apos;m
            <span className="block bg-linear-to-r from-[#ff4d4d] via-[#ffd6d6] to-[#ff1a1a] bg-clip-text text-transparent">
              SHIVAM OJHA
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#d0d0d0] sm:text-base lg:text-lg">
            {siteConfig.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group rounded-full bg-[#ff1a1a] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(255,26,26,0.58)] transition hover:scale-[1.04] hover:bg-[#ff4d4d]"
            >
              View Projects
              <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href={siteConfig.resumeUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#ff4d4d]/80 px-7 py-3 text-sm font-semibold text-[#ffdede] transition hover:bg-[#ff1a1a]/20"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              [`${projects.length}+`, "Project builds"],
              [`${certificates.length}+`, "Verified certificates"],
              ["7.49", "B.Tech CSE CGPA"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/12 bg-white/4 px-4 py-3 backdrop-blur-lg">
                <p className="text-xl font-semibold text-[#fff2f2]">{value}</p>
                <p className="text-xs text-[#c7c7c7]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <div className="inline-flex w-full items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setIsProfilePreviewOpen(true)}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-3 border-white/75 bg-black/45 shadow-[0_0_20px_rgba(255,26,26,0.35)]"
                aria-label="Open full profile image"
              >
                <Image
                  src={siteConfig.profileImage}
                  alt={`${siteConfig.name} profile image`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority
                />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff9f9f]">Profile</p>
                <p className="truncate text-base font-semibold text-[#fff5f5]">{siteConfig.name}</p>
                <p className="truncate text-xs text-[#d6d6d6]">{siteConfig.role}</p>
                <p className="mt-1 truncate text-[11px] text-[#bfbfbf]">{education[0]?.institution ?? "India"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          style={{ x: useTransform(x, (value) => value * -0.46), y: useTransform(y, (value) => value * -0.46) }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-6 hidden items-start justify-end lg:flex"
        >
          <div className="w-85 space-y-4">
            <div className="inline-flex w-full items-center gap-4 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setIsProfilePreviewOpen(true)}
                className="relative h-18 w-18 overflow-hidden rounded-full border-3 border-white/70 bg-black/45 shadow-[0_0_24px_rgba(255,26,26,0.4)] transition hover:scale-105"
                aria-label="Open full profile image"
              >
                <Image
                  src={siteConfig.profileImage}
                  alt={`${siteConfig.name} profile image`}
                  fill
                  sizes="72px"
                  className="object-cover"
                  priority
                />
              </button>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#ff9f9f]">Profile</p>
                <p className="text-lg font-semibold text-[#fff5f5]">{siteConfig.name}</p>
                <p className="text-xs text-[#cfcfcf]">{siteConfig.role}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/35 p-6 backdrop-blur-2xl">
              <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#ff1a1a]/30 blur-2xl" />
              <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-[#ff4d4d]/20 blur-2xl" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#ff9393]">Creative Engineering DNA</p>
              <ul className="mt-5 space-y-3 text-sm text-[#dddddd]">
                <li>Immersive web interfaces with 3D depth</li>
                <li>Secure Node.js and Express API architecture</li>
                <li>Reliable CI/CD and deployment confidence</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs text-[#d3d3d3] backdrop-blur-xl md:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4d4d]" />
        Scroll to explore proof of work
      </div>

      {isProfilePreviewOpen ? (
        <div
          className="fixed inset-0 z-90 flex items-center justify-center bg-black/88 p-4 backdrop-blur-md"
          onClick={() => setIsProfilePreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile image preview"
        >
          <button
            type="button"
            onClick={() => setIsProfilePreviewOpen(false)}
            className="absolute right-5 top-5 rounded-full border border-[#ff6f6f]/55 bg-[#140607]/75 px-3 py-1 text-sm font-semibold text-[#ffd8d8]"
            aria-label="Close profile image preview"
          >
            Close
          </button>
          <div
            className="relative h-[72vh] w-[min(92vw,760px)] overflow-hidden rounded-3xl border border-[#ff3a3a]/55 bg-[#090404] shadow-[0_0_55px_rgba(255,26,26,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={siteConfig.profileImage}
              alt={`${siteConfig.name} full profile preview`}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
