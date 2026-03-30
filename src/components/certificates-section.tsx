"use client";

import Image from "next/image";
import { ExternalLink, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { InteractiveCard } from "@/components/interactive-card";
import { SectionHeading } from "@/components/section-heading";
import { certificates } from "@/lib/site-data";
import type { Certificate } from "@/lib/types";

export function CertificatesSection() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="Certificates"
        title="Verification-focused credentials"
        description="Credential cards include issuer, date, ID, and verification links to maintain trust and authenticity."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {certificates.map((certificate) => (
          <InteractiveCard
            key={certificate.id}
            variant="violet"
            className="rounded-3xl border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,0,0,0.06))] p-5 backdrop-blur-xl"
          >
            <article>
              <div className="relative mb-4 h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c]">
                {certificate.previewImage ? (
                  <Image
                    src={certificate.previewImage}
                    alt={`${certificate.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,77,77,0.25),transparent_60%)]">
                    <ShieldCheck className="text-[#ff4d4d]" size={34} />
                  </div>
                )}
              </div>
              <h3 className="text-sm font-semibold text-[#f5f5f5]">{certificate.title}</h3>
              <p className="mt-1 text-xs text-[#ffabab]">{certificate.issuer}</p>
              <p className="mt-3 text-xs text-[#c8c8c8]">Issued: {certificate.issueDate}</p>
              <p className="mt-1 text-xs text-[#c8c8c8]">Credential ID: {certificate.credentialId}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActive(certificate)}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white"
                >
                  Preview
                </button>
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-[#ff1a1a] px-3 py-1.5 text-xs text-white"
                >
                  Verify <ExternalLink size={12} />
                </a>
              </div>
            </article>
          </InteractiveCard>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-86 grid place-items-center bg-black/80 p-4">
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#111111] p-5">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 rounded-full border border-white/20 p-2 text-white"
            >
              <X size={16} />
            </button>
            <h4 className="text-xl font-semibold text-[#f5f5f5]">{active.title}</h4>
            <p className="mt-1 text-sm text-[#ffb2b2]">{active.issuer}</p>
            <div className="mt-5 relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
              {active.previewImage ? (
                <Image
                  src={active.previewImage}
                  alt={`${active.title} full preview`}
                  fill
                  sizes="900px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[#cfcfcf]">
                  <ShieldCheck size={38} className="text-[#ff4d4d]" />
                  <p className="max-w-sm text-sm">
                    Official credential document is available via the verification link.
                  </p>
                </div>
              )}
            </div>
            <a
              href={active.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff1a1a] px-4 py-2 text-sm text-white"
            >
              Open Verification Source <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
