"use client";

import { motion } from "framer-motion";
import { BellRing, CalendarClock, Filter, MailCheck, Settings, ShieldAlert, ToggleRight } from "lucide-react";

const rules = [
  { icon: ShieldAlert, title: "Escalate critical risks", detail: "Security, access, billing, and incident language is pinned to the top of the cockpit.", enabled: true },
  { icon: CalendarClock, title: "Extract meeting windows", detail: "Dates and times are converted into calendar-ready suggestions before insertion.", enabled: true },
  { icon: MailCheck, title: "Summarize long threads", detail: "Dense snippets are compressed into one executive action summary.", enabled: true },
  { icon: BellRing, title: "Quiet promotional noise", detail: "Discounts, campaigns, and low-signal marketing are automatically softened.", enabled: false },
];

export default function RulesPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-950/[0.04] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-blue text-white shadow-xl shadow-brand-blue/25">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brand-electric">Integration Rules</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">Automation policy layer</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-950/[0.03] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-[#080b11]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black">{rule.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{rule.detail}</p>
                    </div>
                  </div>
                  <ToggleRight className={`h-7 w-7 ${rule.enabled ? "text-brand-teal" : "text-slate-400"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-[1.75rem] border border-brand-electric/20 bg-brand-blue/10 p-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-brand-electric" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Next upgrade: save custom user-defined rules in Supabase and apply them inside the AI prompt.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
