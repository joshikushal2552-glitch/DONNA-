"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Chrome, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      const nextUrl = new URLSearchParams(window.location.search).get("next") || "/dashboard";
      window.location.href = nextUrl;
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    
    // Explicitly call the component client to lock cookies in during redirect
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth-callback`,
        scopes: "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_25%_15%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(13,148,136,0.14),transparent_30%),#f8fafc] dark:bg-[radial-gradient(circle_at_25%_15%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_30%),#06090e] text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 relative transition-colors duration-300">
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
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-[#080b11] shadow-lg">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your AI email cockpit.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-500 font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/90 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-slate-950 dark:bg-white text-white dark:text-[#080b11] text-sm font-bold rounded-2xl shadow-xl hover:-translate-y-0.5 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">or integration profiles</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3.5 bg-slate-50/90 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800/80 rounded-2xl text-sm font-bold text-slate-800 dark:text-white flex items-center justify-center space-x-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
        >
          <Chrome className="h-4 w-4 text-brand-electric" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          New to the workspace?{" "}
          <Link href="/auth/signup" className="text-brand-electric font-bold hover:underline">
            Register Workspace
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
