"use client";

import { motion } from "framer-motion";
import { CalendarPlus, HelpCircle, MailSearch, RefreshCw, Sparkles } from "lucide-react";

const steps = [
  { icon: RefreshCw, title: "Sync stream", copy: "Pull the latest five Gmail messages, then keep loading more in batches." },
  { icon: Sparkles, title: "Analyze with AI", copy: "Gemini classifies and summarizes each message, with Groq and local fallbacks." },
  { icon: CalendarPlus, title: "Schedule events", copy: "Detected meetings and deadlines can be inserted into Google Calendar." },
  { icon: MailSearch, title: "Review outcomes", copy: "Use filters and the reading panel to inspect risk, signal, and event extraction." },
];

export default function HelpPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-950/[0.04] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-blue text-white shadow-xl shadow-brand-blue/25">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brand-electric">Documentation Hub</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">How DONNA works</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5, rotateX: 3 }}
                className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-950/[0.03] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80"
              >
                <Icon className="h-6 w-6 text-brand-electric" />
                <h2 className="mt-5 text-lg font-black">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{step.copy}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-[1.75rem] border border-brand-amber/20 bg-brand-amber/10 p-6">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">For live Gmail and Calendar, sign in with Google and make sure Supabase Google provider includes Gmail readonly and Calendar scopes.</p>
        </div>
      </motion.div>
    </div>
  );
}
