"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useState } from "react";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-data";

function extractGithubUsername(url: string) {
  const match = url.match(/github\.com\/([^/?#]+)/i);
  return match?.[1] ?? "";
}

export function GithubActivitySection() {
  const [graphFailed, setGraphFailed] = useState(false);
  const [snakeFailed, setSnakeFailed] = useState(false);
  const [snakeIndex, setSnakeIndex] = useState(0);
  const username = extractGithubUsername(siteConfig.github);
  const snakeRepo = "nextjsportfolio";

  if (!username) {
    return null;
  }

  const graphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=0a0a0a&color=ffb2b2&line=ff3b3b&point=ffffff&area=true&area_color=ff2c2c&hide_border=true`;
  const snakeUrls = [
    `https://raw.githubusercontent.com/${username}/${snakeRepo}/output/github-contribution-grid-snake.svg`,
    `https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg`,
  ];

  return (
    <section
      id="github-activity"
      data-fall
      className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <SectionHeading
        label="GitHub"
        title="Live coding activity"
        description="A real-time snapshot of contribution patterns, plus the snake animation across contribution cells."
      />

      <div className="grid gap-6">
        <InteractiveCard
          variant="crimson"
          className="rounded-3xl border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,0,0,0.08))] p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#ffd4d4]">
              <Activity size={16} /> Contribution Graph
            </p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white transition hover:border-[#ff5e5e] hover:text-[#ffd6d6]"
            >
              @{username}
            </a>
          </div>

          {graphFailed ? (
            <div className="grid min-h-44 place-items-center rounded-2xl border border-white/10 bg-[#070707] px-4 py-8 text-center text-sm text-[#d8b2b2]">
              GitHub contribution graph is temporarily unavailable.
            </div>
          ) : (
            <motion.img
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              src={graphUrl}
              alt={`${username} contribution graph`}
              loading="lazy"
              onError={() => setGraphFailed(true)}
              className="w-full rounded-2xl border border-white/10 bg-[#070707]"
            />
          )}
        </InteractiveCard>

        <InteractiveCard
          variant="amber"
          className="rounded-3xl border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,126,24,0.09))] p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#ffe2c2]">
              <Activity size={16} /> Snake Animation
            </p>
            <p className="text-xs text-[#f0c8a5]">Auto-updates from this portfolio repository action</p>
          </div>

          {snakeFailed ? (
            <div className="grid min-h-44 gap-2 rounded-2xl border border-white/10 bg-[#050505] px-4 py-8 text-center text-sm text-[#e8c9aa]">
              <p>Snake animation is not generated yet for @{username}.</p>
              <p className="text-xs text-[#d9b38f]">
                Run the GitHub snake workflow once and this section will auto-show animation.
              </p>
            </div>
          ) : (
            <motion.img
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              src={snakeUrls[snakeIndex]}
              alt={`${username} github snake animation`}
              loading="lazy"
              onError={() => {
                if (snakeIndex < snakeUrls.length - 1) {
                  setSnakeIndex((prev) => prev + 1);
                  return;
                }
                setSnakeFailed(true);
              }}
              className="w-full rounded-2xl border border-white/10 bg-[#050505] p-2"
            />
          )}
        </InteractiveCard>
      </div>
    </section>
  );
}
