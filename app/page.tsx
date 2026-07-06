"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock3,
  Mail,
  MailCheck,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  { icon: Shield, title: "Mail classification", copy: "Critical, important, spam, and scam threads are separated into clean review lanes.", reveal: "Know what needs action before opening the message." },
  { icon: Sparkles, title: "Message summaries", copy: "Dense snippets become concise, readable context with the next action surfaced.", reveal: "Less reading, faster decisions." },
  { icon: Calendar, title: "Calendar automation", copy: "Detected meetings and deadlines become schedule-ready Google Calendar actions.", reveal: "No more manual copy-paste from email." },
  { icon: Zap, title: "Load more analysis", copy: "Analyze inbox batches of five and keep expanding the stream as needed.", reveal: "Built for real inbox workflows." },
];

const marqueeItems = [
  "Mail classification",
  "Calendar automation",
  "Scam detection",
  "Priority stream",
  "Executive summaries",
  "Batch analysis",
  "Protected dashboard",
  "Persona settings",
];

const inboxRows = [
  ["Security vendor", "API key rotation due tomorrow", "critical", "text-rose-500"],
  ["Product lead", "Design review moved to 4 PM", "event", "text-brand-teal"],
  ["Founder update", "Metrics packet and investor notes", "important", "text-brand-amber"],
];

export default function LandingPage() {
  const [emailInput, setEmailInput] = useState("");

  const handleTryNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      window.location.href = `/auth/signup?email=${encodeURIComponent(emailInput)}`;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950 dark:bg-[#05070c] dark:text-white transition-colors duration-300">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-[#05070c]/65">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="font-mono text-2xl font-black tracking-tight">DONNA</Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
            <Link href="#features" className="transition hover:text-slate-950 dark:hover:text-white">Features</Link>
            <Link href="#workflow" className="transition hover:text-slate-950 dark:hover:text-white">Workflow</Link>
            <Link href="/pricing" className="transition hover:text-slate-950 dark:hover:text-white">Pricing</Link>
            <Link href="/enterprise" className="transition hover:text-slate-950 dark:hover:text-white">Enterprise</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login" className="hidden text-sm font-bold text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white sm:block">Login</Link>
            <Link href="/auth/signup" className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#05070c] shadow-xl shadow-black/20 transition hover:-translate-y-0.5">
              Start free
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen overflow-hidden pt-20">
          <div className="neural-bg" />
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="wave-line"
              style={{
                top: `${36 + line * 8}%`,
                "--r": `${line % 2 ? -4 : 5}deg`,
                "--y": `${line % 2 ? -22 : 18}px`,
                animationDelay: `${line * -1.2}s`,
              } as React.CSSProperties}
            />
          ))}

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-white/80 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
                AI inbox command center
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl">
                Your inbox, handled before you open it.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                DONNA classifies mail, extracts the next action, and moves calendar-worthy work into your schedule with a dashboard that feels alive.
              </p>

              <form onSubmit={handleTryNow} className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-[1.6rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="work@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="min-w-0 flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-[#05070c] shadow-xl shadow-white/10 transition hover:-translate-y-0.5">
                  Build my cockpit
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-slate-400">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-teal" /> Mail classification</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-teal" /> Calendar automation</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-teal" /> Scam detection</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotateY: -18 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.95, ease: "easeOut" }}
              className="lg:col-span-6"
              style={{ perspective: 1200 }}
            >
              <motion.div
                animate={{ rotateX: [2, -3, 2], rotateY: [-8, 8, -8], y: [0, -14, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto max-w-[560px] rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="rounded-[1.4rem] border border-white/10 bg-[#060914]/88 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Live Inbox</p>
                      <h3 className="text-xl font-black text-white">Priority stream</h3>
                    </div>
                    <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400">Analyzing</div>
                  </div>

                  <div className="space-y-3">
                    {inboxRows.map(([from, subject, badge, color], index) => (
                      <motion.div
                        key={subject}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.12 }}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-electric">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-white">{subject}</p>
                            <p className="truncate text-xs text-slate-500">{from}</p>
                          </div>
                        </div>
                        <span className={`shrink-0 text-[10px] font-black uppercase ${color}`}>{badge}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {["94% signal", "6m saved", "2 events"].map((stat) => (
                      <div key={stat} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center text-xs font-black text-white">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative border-y border-slate-200 bg-white py-5 dark:border-slate-800 dark:bg-[#05070c]">
          <div className="feature-marquee">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-black text-slate-600 dark:border-slate-800 dark:bg-[#0f141c] dark:text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-widest text-brand-electric">What ships today</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Built like a real operating system for email.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08 }}
                  className="reveal-card group min-h-[260px] rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-950/[0.04] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-[#0f141c]/80"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105 dark:bg-white dark:text-[#080b11]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.copy}</p>
                  <div className="reveal-panel mt-5 rounded-2xl border border-brand-amber/20 bg-brand-amber/10 p-3 text-xs font-bold text-slate-700 dark:text-slate-200">
                    {feature.reveal}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="workflow" className="bg-slate-950 px-6 py-24 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              [MailCheck, "1. Pull inbox batches", "Start with five emails, then load more as your queue grows."],
              [Sparkles, "2. Analyze the signal", "DONNA assigns category, summary, and risk context."],
              [Calendar, "3. Act instantly", "Schedule extracted events or keep reviewing the stream."],
            ].map(([Icon, title, copy], index) => (
              <motion.div
                key={title as string}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/20"
              >
                <Icon className="h-7 w-7 text-brand-teal" />
                <h3 className="mt-6 text-2xl font-black">{title as string}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{copy as string}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase tracking-widest text-brand-electric">Dashboard depth</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">More than a demo panel.</h2>
              <p className="mt-5 text-slate-600 dark:text-slate-400">
                The cockpit now includes live metrics, pagination, persona settings, integration rules, security visibility, and a documentation hub.
              </p>
            </div>
            <div className="grid gap-4 lg:col-span-7 md:grid-cols-2">
              {["Protected workspace", "Batch load more", "Persona memory", "Security overview"].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/[0.04] dark:border-slate-800 dark:bg-[#0f141c]">
                  <Clock3 className="h-5 w-5 text-brand-electric" />
                  <p className="mt-5 text-lg font-black">{item}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Designed to feel like an actual SaaS product, not a static project page.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-center text-white shadow-2xl dark:border-slate-800">
            <h2 className="text-4xl font-black tracking-tight">Ready to turn inbox noise into decisions?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">Start with your email, connect Google, and let DONNA build the priority stream.</p>
            <Link href="/auth/signup" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
              Open DONNA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
