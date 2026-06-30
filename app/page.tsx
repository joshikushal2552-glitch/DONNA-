"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Shield, Calendar, Sparkles, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const [emailInput, setEmailInput] = useState("");

  const handleTryNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      window.location.href = `/auth/signup?email=${encodeURIComponent(emailInput)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      
      {/* Background Ambience Elements for Dark Mode */}
      <div className="hidden dark:block top-0 left-1/4 glow-orb-blue" />
      <div className="hidden dark:block top-1/3 right-1/4 glow-orb-orange" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-brand-dark/70 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent uppercase font-mono">
              DONNA
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Link href="#features" className="hover:text-slate-950 dark:hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="hover:text-slate-950 dark:hover:text-white transition-colors">Pricing</Link>
              <Link href="/enterprise" className="hover:text-slate-950 dark:hover:text-white transition-colors">Enterprise</Link>
              <Link href="#help" className="hover:text-slate-950 dark:hover:text-white transition-colors">Help</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <Link href="/auth/login" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="text-sm font-medium bg-slate-950 text-white dark:bg-white dark:text-brand-dark px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md">
              Try started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Call to Action Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-950 dark:text-white">
            Achieve Inbox Zero <br />
            <span className="bg-gradient-to-r from-brand-blue to-brand-electric bg-clip-text text-transparent">
              with AI Email Assistant.
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Let AI organize your email. Automatically sort, archive, and craft replies so you can get to what matters. No more inbox clutter.
          </p>

          <form onSubmit={handleTryNow} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-md w-full">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-electric text-white font-medium rounded-xl hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Try it now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Graphical Visual Showcase Component */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-[440px] rounded-3xl relative overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-[#0f141c] dark:to-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-8 shadow-2xl flex items-center justify-center">
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-[12px] border-brand-blue/30 dark:border-brand-blue/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute w-48 h-48 rounded-full border-[6px] border-dashed border-brand-amber/40 dark:border-brand-amber/20 animate-spin" style={{ animationDuration: '10s' }} />
            </div>

            <div className="z-10 bg-white/80 dark:bg-[#080b11]/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 w-full shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-brand-electric bg-brand-blue/10 px-2 py-0.5 rounded">AI Engine Active</span>
              </div>
              
              <div className="space-y-2.5">
                <div className="p-3 bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-rose-500 h-4 w-4" />
                    <span className="text-xs font-medium">Urgent Security Request</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">CRITICAL</span>
                </div>

                <div className="p-3 bg-brand-amber/10 dark:bg-brand-amber/5 border border-brand-amber/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-brand-amber h-4 w-4" />
                    <span className="text-xs font-medium">Project Sync Meeting</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded">SCHEDULED</span>
                </div>

                <div className="p-3 bg-brand-teal/10 dark:bg-brand-teal/5 border border-brand-teal/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="text-brand-teal h-4 w-4" />
                    <span className="text-xs font-medium">Weekly Operations Report</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">ANALYZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Feature Deep Dive Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">An AI Assistant That Runs Your Inbox Completely</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you expect from an executive human assistant, automated locally with modern privacy controls.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4">
            <div className="p-3 bg-brand-blue/10 text-brand-electric w-fit rounded-xl"><Shield className="h-6 w-6" /></div>
            <h3 className="text-lg font-bold">Smart Classification</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Instantly segment threads into Important, Critical, Spam, or Scam buckets safely using structural data validation rules.</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4">
            <div className="p-3 bg-brand-amber/10 text-brand-amber w-fit rounded-xl"><Calendar className="h-6 w-6" /></div>
            <h3 className="text-lg font-bold">Calendar Auto-Mapping</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Extract text context dates, timelines, and action hours from raw email context data straight onto your Google Calendar automatically.</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4">
            <div className="p-3 bg-brand-teal/10 text-brand-teal w-fit rounded-xl"><Sparkles className="h-6 w-6" /></div>
            <h3 className="text-lg font-bold">Content Summarization</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Skim text summaries instead of wading through endless conversation loops. Understand payloads at a glance.</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 w-fit rounded-xl"><LayoutDashboard className="h-6 w-6" /></div>
            <h3 className="text-lg font-bold">Workspace Analytics</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Gain precise visibility into your communication metrics, tracking time saved and processing velocity visually.</p>
          </div>
        </div>
      </section>
    </div>
  );
}