"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Fingerprint, FolderLock, KeyRound, Lock, ShieldCheck } from "lucide-react";

const checks = ["Supabase session cookies", "Google OAuth provider token", "Gmail readonly scope", "Calendar insertion scope"];

export default function SecurityPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-950/[0.04] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80">
            <p className="text-xs font-black uppercase tracking-widest text-brand-electric">Security & Keys</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">OAuth-first, token-aware workspace.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">DONNA uses Supabase Auth for identity and Google provider tokens for mailbox/calendar access. Secrets stay server-side through API routes.</p>
          </div>
          <motion.div animate={{ rotateX: [0, 8, 0], rotateY: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="rounded-[1.75rem] border border-brand-teal/20 bg-brand-teal/10 p-6 shadow-2xl shadow-brand-teal/[0.05]">
            <FolderLock className="h-8 w-8 text-brand-teal" />
            <p className="mt-6 text-4xl font-black">4</p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-300">security layers active</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {checks.map((check, index) => (
            <motion.div key={check} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-950/[0.03] dark:border-slate-800 dark:bg-[#0f141c]/80">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-teal" />
                <span className="text-sm font-black">{check}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            [KeyRound, "Provider token", "Read from Supabase session only inside protected route handlers."],
            [Fingerprint, "Identity boundary", "Dashboard routes redirect anonymous users back to login."],
            [Lock, "Secret handling", "Gemini and Groq keys are server environment variables."],
          ].map(([Icon, title, copy]) => (
            <div key={title as string} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-950/[0.03] dark:border-slate-800 dark:bg-[#0f141c]/80">
              <Icon className="h-6 w-6 text-brand-electric" />
              <h2 className="mt-4 text-lg font-black">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy as string}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
