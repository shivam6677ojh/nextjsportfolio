"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starter: Message[] = [
  {
    role: "assistant",
    content:
      "Hi, I am Shivam's CV assistant. Ask about summary, skills, projects, education, certificates, resume, or contact details.",
  },
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(starter);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: text } as Message];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });

      if (!response.ok) {
        throw new Error("Unable to reach assistant right now.");
      }

      const payload = (await response.json()) as { reply: string };
      setMessages((prev) => [...prev, { role: "assistant", content: payload.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I cannot answer at the moment. You can still reach Shivam directly via the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        aria-label="Open CV assistant"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-92 grid h-14 w-14 place-items-center rounded-full border border-[#ff4d4d]/70 bg-[#150707] text-[#ffb9b9] shadow-[0_0_30px_rgba(255,26,26,0.65)] transition hover:scale-105"
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-91 w-[min(94vw,380px)] overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e0e]/95 shadow-2xl backdrop-blur-xl"
          >
            <header className="border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-[#f2f2f2]">CV Assistant</p>
              <p className="text-xs text-[#afafaf]">Answers only from Shivam&apos;s CV data.</p>
            </header>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    message.role === "assistant"
                      ? "bg-white/8 text-[#f0f0f0]"
                      : "ml-auto bg-[#ff1a1a]/20 text-[#ffe6e6]"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {loading ? <p className="text-xs text-[#ffb5b5]">Thinking...</p> : null}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#0a0a0a] px-3 py-2 text-xs text-white outline-none focus:border-[#ff4d4d]"
                placeholder="Ask about projects, resume, education, skills..."
              />
              <button
                disabled={loading}
                className="rounded-xl bg-[#ff1a1a] px-3 text-white transition hover:bg-[#ff4d4d] disabled:opacity-60"
                type="submit"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
