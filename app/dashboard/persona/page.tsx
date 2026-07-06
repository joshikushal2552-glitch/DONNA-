"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Save, Sparkles, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PersonaPage() {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Founder / Operator");
  const [tone, setTone] = useState("Concise, direct, polished");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const metadata = data.user?.user_metadata || {};
      setDisplayName(metadata.display_name || metadata.full_name || data.user?.email?.split("@")[0] || "");
      setRole(metadata.role || "Founder / Operator");
      setTone(metadata.tone || "Concise, direct, polished");
    });
  }, []);

  const savePersona = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(false);
    await supabase.auth.updateUser({
      data: {
        display_name: displayName,
        full_name: displayName,
        role,
        tone,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6 md:p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-950/[0.04] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brand-electric">Persona Preferences</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Teach DONNA how to represent you.</h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This identity is used across the cockpit and can power future reply generation.</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-blue text-white shadow-xl shadow-brand-blue/25">
              <User className="h-7 w-7" />
            </div>
          </div>
        </div>

        <form onSubmit={savePersona} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-950/[0.03] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f141c]/80 space-y-4">
            {[
              ["Display name", displayName, setDisplayName],
              ["Professional role", role, setRole],
              ["Preferred tone", tone, setTone],
            ].map(([label, value, setter]) => (
              <label key={label as string} className="block space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label as string}</span>
                <input
                  value={value as string}
                  onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-electric dark:border-slate-800 dark:bg-[#080b11]"
                />
              </label>
            ))}
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-[#080b11]">
              <Save className="h-4 w-4" />
              Save persona
            </button>
          </div>

          <div className="rounded-[1.75rem] border border-brand-electric/20 bg-brand-blue/10 p-6 shadow-xl shadow-brand-blue/[0.05]">
            <Sparkles className="h-6 w-6 text-brand-electric" />
            <h2 className="mt-4 text-xl font-black">Live identity card</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{displayName || "Your name"} is operating as {role} with a {tone.toLowerCase()} communication style.</p>
            {saved && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
