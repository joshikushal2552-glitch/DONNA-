"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, CheckCircle2, 
  Calendar, Sparkles, RefreshCw, Layers, Eye, ArrowRight, Loader2, Link2, KeyRound, BarChart3, Clock3
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  date: string;
  body: string;
  category: "critical" | "important" | "spam" | "scam";
  aiAnalysis: string;
  detectedEvent?: {
    title: string;
    date: string;
    time: string;
  };
}

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "critical" | "important" | "spam" | "scam">("all");
  const [activeEmail, setActiveEmail] = useState<EmailItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMode, setSyncMode] = useState<"idle" | "live" | "sandbox">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [calendarMessage, setCalendarMessage] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [nextSandboxOffset, setNextSandboxOffset] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [emails, setEmails] = useState<EmailItem[]>([]);

  const loadEmailBatch = async (mode: "replace" | "append") => {
    if (mode === "replace") {
      setIsSyncing(true);
      setNextPageToken(null);
      setNextSandboxOffset(null);
    } else {
      setIsLoadingMore(true);
    }

    setErrorMessage(null);
    
    try {
      const response = await fetch("/api/process-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageToken: mode === "append" ? nextPageToken : undefined,
          sandboxOffset: mode === "append" ? nextSandboxOffset : 0
        })
      });

      const jsonResult = await response.json();

      if (!response.ok || !jsonResult.success) {
        throw new Error(jsonResult.error || "Failed to process structural messaging stream pipelines.");
      }

      setEmails((current) => mode === "append" ? [...current, ...jsonResult.data] : jsonResult.data);
      setNextPageToken(jsonResult.nextPageToken || null);
      setNextSandboxOffset(jsonResult.nextSandboxOffset ?? null);
      setSyncMode(jsonResult.mode);
      
      if (mode === "replace" && jsonResult.data.length > 0) {
        setActiveEmail(jsonResult.data[0]);
      }
    } catch (err: any) {
      console.error("Data synchronization execution failure:", err);
      setErrorMessage(err.message || "Network timeout fault intersecting API processing nodes.");
    } finally {
      setIsSyncing(false);
      setIsLoadingMore(false);
    }
  };

  const triggerGmailSync = () => loadEmailBatch("replace");
  const hasMoreEmails = syncMode === "live" ? Boolean(nextPageToken) : nextSandboxOffset !== null;

  const handleScheduleEvent = async (event: any) => {
  // 1. Detect the user's timezone dynamically from their browser
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setCalendarMessage("Connecting to Google Calendar...");
        
    try {
        const response = await fetch("/api/schedule-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: event.title,
            date: event.date,
            time: event.time,
            timeZone: userTimeZone // 2. Pass this to the API
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to finalize structural calendar allocation entry.");
      }

      setCalendarMessage(`Flawlessly mapped "${event.title}" onto your Google Calendar!`);
    } catch (err: any) {
      console.error("Calendar scheduling error: ", err);
      setErrorMessage(`Calendar Insertion Fault: ${err.message || "Ensure your OAuth session is active."}`);
    } finally {
      setTimeout(() => setCalendarMessage(null), 4000);
    }
  };

  const filteredEmails = selectedCategory === "all" 
    ? emails 
    : emails.filter(e => e.category === selectedCategory);

  const stats = {
    total: emails.length,
    critical: emails.filter(e => e.category === "critical").length,
    events: emails.filter(e => e.detectedEvent).length,
    signal: emails.length ? Math.round((emails.filter(e => e.category !== "spam").length / emails.length) * 100) : 0
  };

  const statCards: Array<{ label: string; value: number; icon: LucideIcon }> = [
    { label: "Analyzed", value: stats.total, icon: BarChart3 },
    { label: "Critical", value: stats.critical, icon: Sparkles },
    { label: "Events", value: stats.events, icon: Calendar },
  ];

  const categoryColorMap = {
    critical: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    important: "bg-brand-amber/10 text-brand-amber border-brand-amber/20",
    spam: "bg-slate-500/10 text-slate-400 border-slate-700/40",
    scam: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  };

  return (
    <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-4rem)]">
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#05070c]/80 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] px-10 py-9 shadow-2xl">
              <div className="pl">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="pl__dot" />
                ))}
                <div className="pl__text">Syncing</div>
              </div>
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-white">Syncing Gmail</p>
                <p className="mt-2 text-xs text-slate-400">Classifying mail and finding calendar events</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Left Column Navigation List Pane */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="lg:col-span-4 border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#080b11]/90 backdrop-blur-xl flex flex-col overflow-y-auto"
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <div className="space-y-1 text-left">
            <h2 className="text-sm font-bold tracking-tight uppercase text-slate-400 flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>Inbox Processing Channel</span>
            </h2>
            {syncMode !== "idle" && (
              <span className={`inline-flex items-center space-x-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                syncMode === "live" 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse" 
                  : "bg-brand-amber/10 text-brand-amber border-brand-amber/20"
              }`}>
                {syncMode === "live" ? <Link2 className="h-2.5 w-2.5" /> : <KeyRound className="h-2.5 w-2.5" />}
                <span>{syncMode === "live" ? "Live Google Connection" : "Sandbox Simulation Profile"}</span>
              </span>
            )}
          </div>
          
          <button 
            onClick={triggerGmailSync}
            disabled={isSyncing}
            className="p-2.5 bg-brand-blue text-white hover:opacity-95 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50 shadow-md shadow-brand-blue/20 shrink-0 text-center"
          >
            {isSyncing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            <span>{isSyncing ? "Syncing..." : "Sync Gmail Stream"}</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-200 dark:border-slate-800/70 bg-slate-50/70 dark:bg-[#0f141c]/35">
          {statCards.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2, scale: 1.02 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#080b11]/70 p-3 text-left shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-brand-electric mb-2" />
              <p className="text-lg font-black text-slate-950 dark:text-white">{value}</p>
              <p className="text-[9px] uppercase tracking-widest text-slate-400 font-black">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Category Filtering Row Tabs */}
        <div className="p-3 bg-slate-100/60 dark:bg-[#0f141c]/40 border-b border-slate-200 dark:border-slate-800/60 grid grid-cols-5 gap-1.5 shrink-0 text-center">
          {(["all", "critical", "important", "spam", "scam"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wide border transition-all ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white border-brand-electric shadow"
                  : "bg-white dark:bg-[#0f141c] text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error Boundary Notification Block */}
        {errorMessage && (
          <div className="m-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        {/* Email Stream Lists */}
        <div className="flex-grow divide-y divide-slate-100 dark:divide-slate-800/60">
          {emails.length > 0 ? (
            <AnimatePresence mode="popLayout">
            {filteredEmails.map((email, index) => {
              const isSelected = activeEmail?.id === email.id;
              return (
                <motion.div
                  key={email.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setActiveEmail(email)}
                  className={`p-4 cursor-pointer transition-all flex flex-col space-y-2 text-left relative ${
                    isSelected 
                      ? "bg-brand-blue/[0.08] dark:bg-brand-blue/10 border-l-4 border-brand-electric shadow-inner" 
                      : "hover:bg-slate-100/70 dark:hover:bg-[#0f141c]/70 hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[180px] text-slate-700 dark:text-slate-300">
                      {email.sender}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-wider border px-2 py-0.5 rounded ${categoryColorMap[email.category]}`}>
                      {email.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white truncate">
                    {email.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {email.body}
                  </p>
                  <span className="text-[9px] text-slate-400 font-medium block pt-1">
                    {email.date}
                  </span>
                </motion.div>
              );
            })}
            </AnimatePresence>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 italic pt-20">
              No live messaging data synced into view viewport layer. Click the sync channel control button above to read stream values.
            </div>
          )}
        </div>

        {emails.length > 0 && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800/70 bg-white/90 dark:bg-[#080b11]/90">
            <button
              onClick={() => loadEmailBatch("append")}
              disabled={!hasMoreEmails || isLoadingMore}
              className="group w-full rounded-2xl border border-brand-electric/20 bg-brand-blue/10 px-4 py-3 text-xs font-black text-brand-electric transition hover:-translate-y-0.5 hover:bg-brand-blue/15 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 transition group-hover:rotate-180" />}
              {hasMoreEmails ? "Load 5 more emails" : "No more emails in this stream"}
            </button>
          </div>
        )}
      </motion.div>

      {/* Right Column: Reading Panel & Gemini Context Analyzer */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
        className="lg:col-span-8 bg-white/70 dark:bg-[#0f141c]/30 backdrop-blur-sm flex flex-col overflow-y-auto p-6 md:p-8 space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          {[
            ["Inbox signal", `${stats.signal}%`, "Non-spam relevance"],
            ["Queue depth", stats.total.toString(), "Messages analyzed"],
            ["Event hits", stats.events.toString(), "Calendar candidates"],
            ["Runtime", syncMode === "idle" ? "Ready" : syncMode, "Current pipeline"],
          ].map(([label, value, caption]) => (
            <div key={label} className="rounded-[1.25rem] border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f141c]/80 p-4 shadow-xl shadow-slate-950/[0.03]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">{label}</p>
                <Clock3 className="h-3.5 w-3.5 text-brand-electric" />
              </div>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white capitalize">{value}</p>
              <p className="mt-1 text-[11px] text-slate-400">{caption}</p>
            </div>
          ))}
        </motion.div>

        {calendarMessage && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-3 shadow animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{calendarMessage}</span>
          </div>
        )}

        {activeEmail ? (
          <motion.div
            key={activeEmail.id}
            initial={{ opacity: 0, y: 16, rotateX: -4 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-8 max-w-4xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            <div className="p-6 bg-white/90 dark:bg-[#0f141c]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-[1.5rem] shadow-2xl shadow-slate-950/[0.04] space-y-4 text-left">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Sender Origin Address</p>
                  <p className="text-sm font-bold text-brand-electric">{activeEmail.sender}</p>
                </div>
                <span className={`text-xs font-black tracking-widest uppercase border px-3 py-1 rounded-full ${categoryColorMap[activeEmail.category]}`}>
                  Status: {activeEmail.category}
                </span>
              </div>
              
              <hr className="border-slate-100 dark:border-slate-800/60" />
              
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Subject Payload Line</p>
                <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{activeEmail.subject}</h3>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 flex items-center space-x-2">
                <Eye className="h-4 w-4 text-slate-400" />
                <span>Original Message Data</span>
              </h4>
              <div className="p-6 bg-slate-50/90 dark:bg-[#080b11]/90 border border-slate-200 dark:border-slate-800/80 rounded-[1.5rem] text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap shadow-inner">
                {activeEmail.body}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="text-xs uppercase font-black tracking-widest text-brand-electric flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-brand-electric" />
                <span>DONNA AI Structural Content Analysis</span>
              </h4>
              <div className="p-6 bg-gradient-to-tr from-brand-blue/10 via-white to-transparent dark:from-brand-blue/10 dark:via-[#0f141c] dark:to-transparent border border-brand-electric/20 rounded-[1.5rem] space-y-3 shadow-xl shadow-brand-blue/[0.04]">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {activeEmail.aiAnalysis}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ["Classification", activeEmail.category, "Current mailbox lane"],
                ["Action weight", activeEmail.category === "critical" ? "High" : activeEmail.category === "spam" ? "Low" : "Medium", "Suggested attention level"],
                ["Calendar status", activeEmail.detectedEvent ? "Detected" : "None", "Scheduling opportunity"],
              ].map(([label, value, caption]) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, rotateX: 3 }}
                  className="reveal-card rounded-[1.35rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-950/[0.03] dark:border-slate-800 dark:bg-[#0f141c]/90"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                  <p className="mt-3 text-2xl font-black capitalize text-slate-950 dark:text-white">{value}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{caption}</p>
                  <div className="reveal-panel mt-4 rounded-xl bg-brand-blue/10 px-3 py-2 text-[11px] font-bold text-brand-electric">
                    Updated from selected email
                  </div>
                </motion.div>
              ))}
            </div>

            {activeEmail.detectedEvent && (
              <div className="space-y-3 text-left">
                <h4 className="text-xs uppercase font-black tracking-widest text-brand-amber flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-brand-amber" />
                  <span>Extracted Calendar Event Timeline Payload</span>
                </h4>
                <div className="p-6 bg-white/90 dark:bg-[#0f141c]/90 border border-brand-amber/20 rounded-[1.5rem] flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl shadow-brand-amber/[0.04]">
                  <div className="space-y-1.5">
                    <p className="text-sm font-extrabold text-slate-950 dark:text-white">{activeEmail.detectedEvent.title}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>Date Target: <strong className="text-slate-700 dark:text-slate-300 font-mono">{activeEmail.detectedEvent.date}</strong></span>
                      <span>Execution Hour: <strong className="text-slate-700 dark:text-slate-300 font-mono">{activeEmail.detectedEvent.time}</strong></span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleScheduleEvent(activeEmail.detectedEvent)}
                    className="px-6 py-3 bg-gradient-to-r from-brand-orange to-brand-amber text-white text-xs font-bold rounded-xl shadow hover:opacity-95 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shrink-0"
                  >
                    <span>Auto-Schedule Event</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-60 my-auto">
            <Mail className="h-12 w-12 text-slate-400 animate-pulse" />
            <div className="space-y-1 max-w-sm">
              <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">Workspace Terminal Idle</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your channel stream above. Live processing layers parse message structures instantly upon pipeline requests.
              </p>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  );
}
