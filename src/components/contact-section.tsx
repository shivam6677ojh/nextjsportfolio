"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Could not send message.");
      }

      setSuccess(true);
      setForm(initialState);
      setTimeout(() => setSuccess(false), 2800);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" data-fall className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        label="Contact"
        title="Let&apos;s build something exceptional"
        description="Send your requirement directly and I will respond with a clear implementation plan."
      />

      <motion.form
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-3xl gap-4 rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl sm:p-8"
      >
        <label className="grid gap-2 text-sm text-[#d5d5d5]">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-xl border border-white/15 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff4d4d]"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2 text-sm text-[#d5d5d5]">
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-xl border border-white/15 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff4d4d]"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm text-[#d5d5d5]">
          Message
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="rounded-xl border border-white/15 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff4d4d]"
            placeholder="Tell me about your idea, timeline, and goals."
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff1a1a] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(255,26,26,0.5)] transition hover:bg-[#ff4d4d] disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : null}
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-sm text-green-300"
          >
            <CheckCircle2 size={16} /> Message sent successfully.
          </motion.p>
        ) : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </motion.form>
    </section>
  );
}
