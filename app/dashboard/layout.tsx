"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { supabase } from "@/lib/supabase";
import { User, Settings, FolderLock, HelpCircle, X, LogOut, LayoutGrid } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Workspace User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;

      const metadata = user.user_metadata || {};
      const name =
        metadata.display_name ||
        metadata.full_name ||
        metadata.name ||
        user.email?.split("@")[0] ||
        "Workspace User";

      setUserName(name);
      setUserEmail(user.email || "");
    });
  }, []);

  const firstLetter = useMemo(() => userName.charAt(0).toUpperCase(), [userName]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard Cockpit", icon: LayoutGrid },
    { href: "/dashboard/persona", label: "Persona Preferences", icon: User },
    { href: "/dashboard/rules", label: "Integration Rules", icon: Settings },
    { href: "/dashboard/security", label: "Security & Keys", icon: FolderLock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#06090e] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(13,148,136,0.12),transparent_24%)]" />
      
      {/* Ambient Sliding Left Workspace Drawer Layer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0f141c] border-r border-slate-200 dark:border-slate-800/80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Sidebar Navigation Header Panel */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-electric flex items-center justify-center text-white text-sm font-black shadow shadow-brand-electric/40">
                {firstLetter}
              </div>
              <div className="text-left">
                <p className="text-sm font-extrabold text-slate-950 dark:text-white leading-tight">{userName}</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{userEmail}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-50 dark:bg-[#080b11] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Staging Links Matrix for Future System Adaptations */}
          <nav className="space-y-2 flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 block mb-1">Navigation Console</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`w-full flex items-center space-x-3.5 px-3 py-3 rounded-xl text-xs text-left transition-all group ${
                    active
                      ? "bg-brand-blue/5 text-brand-electric border border-brand-blue/10 font-bold shadow-sm"
                      : "hover:bg-slate-100 dark:hover:bg-[#080b11] text-slate-500 hover:text-slate-950 dark:hover:text-white font-medium"
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors ${active ? "text-brand-electric" : "text-slate-400 group-hover:text-brand-electric"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Layer */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <Link 
            href="/dashboard/help"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center space-x-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Documentation Hub</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 text-xs font-bold text-rose-500 transition-all text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Dimmed Background Backdrop Mask Layer */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fadeIn"
        />
      )}

      {/* Top Application Header Control Strip */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0f141c]/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          
          {/* Interactive User Account Initial Circle Trigger */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-[#080b11] font-black text-xs flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-brand-electric"
            title="Open Account Console"
          >
            {firstLetter}
          </button>

          <Link href="/" className="text-xl font-black font-mono tracking-tight uppercase text-slate-950 dark:text-white hover:opacity-90 transition-opacity">
            DONNA
          </Link>
          <span className="hidden sm:inline-block text-[10px] bg-brand-blue/10 text-brand-electric px-2.5 py-0.5 rounded font-bold uppercase tracking-wide">
            Workspace Cockpit
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="hidden sm:inline-block text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800"
          >
            Logout Session
          </button>
        </div>
      </header>

      {/* Core App Main Panel Viewport View */}
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex-grow flex flex-col overflow-hidden relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
}
