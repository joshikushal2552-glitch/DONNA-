"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail, Sparkles, User } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const initialEmail = new URLSearchParams(window.location.search).get("email");
    if (initialEmail) setEmail(initialEmail);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username.trim(),
          display_name: username.trim(),
        },
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSuccessMsg("Registration initiated. Please verify your inbox via the secure link sent.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18),transparent_28%),#f8fafc] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.14),transparent_28%),#06090e] text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 relative transition-colors duration-300">
      <motion.div
        className="absolute left-[12%] top-[18%] h-56 w-56 rounded-[2rem] border border-white/20 bg-white/10 dark:bg-white/[0.04] backdrop-blur-xl shadow-2xl"
        animate={{ rotateX: [0, 12, 0], rotateY: [-18, 10, -18], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute bottom-[12%] right-[10%] h-40 w-40 rounded-full border border-brand-electric/30 bg-brand-blue/10 blur-[1px]"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[18%] top-[16%] h-0 w-0 border-l-[72px] border-r-[72px] border-b-[124px] border-l-transparent border-r-transparent border-b-brand-teal/10 drop-shadow-[0_0_22px_rgba(13,148,136,0.22)]"
        animate={{ y: [0, -16, 0], rotate: [8, -10, 8], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[18%] h-32 w-32 opacity-40"
        animate={{ y: [0, 18, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 rounded-full border border-rose-400/25 bg-rose-500/10 shadow-[0_0_28px_rgba(244,63,94,0.16)]" />
        <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 rounded-full border border-rose-400/25 bg-rose-500/10 shadow-[0_0_28px_rgba(244,63,94,0.16)]" />
      </motion.div>

      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/85 dark:bg-[#0f141c]/85 backdrop-blur-2xl border border-white/70 dark:border-slate-800/80 p-8 rounded-[2rem] shadow-2xl space-y-6 relative z-10"
      >
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Create your workspace</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Choose the name DONNA should use across your cockpit.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-500 font-medium text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              required
              type="text"
              placeholder="Your display name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              required
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              required
              type="password"
              placeholder="Secure Account Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-brand-electric text-white text-sm font-bold rounded-2xl shadow-xl shadow-brand-blue/25 hover:-translate-y-0.5 hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? "Creating workspace..." : "Create Workspace"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already verified?{" "}
          <Link href="/auth/login" className="text-brand-electric font-bold hover:underline">
            Login Access
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
