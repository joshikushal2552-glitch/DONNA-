"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Phone, Building, Mail, User, MessageSquare, Bot, Sparkles } from "lucide-react";

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company && formData.phone) {
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b11] text-slate-900 dark:text-slate-100 p-6 md:py-20 transition-colors duration-300 relative flex flex-col items-center justify-start">
      
      {/* Navigation Return Link */}
      <div className="absolute top-10 left-10 z-20">
        <Link href="/" className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-4xl space-y-16 pt-12">
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-brand-electric bg-brand-blue/10 px-3 py-1 rounded-full font-bold">
            Enterprise Upgrade
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            DONNA for Enterprise
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Deploy secure, isolated corporate email orchestration layers. Complete the setup details below to request custom production parameters.
          </p>
        </div>

        {/* FIRST: Request Consultation Input Form Block */}
        <div className="w-full max-w-xl bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 p-8 md:p-10 rounded-3xl shadow-xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Request Consultation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Submit your corporate deployment details below to initiate onboarding configurations.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                required
                type="text"
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all text-xs" 
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                required
                type="email"
                placeholder="Work Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all text-xs" 
              />
            </div>

            <div className="relative">
              <Building className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                required
                type="text"
                placeholder="Company / Organization Name" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all text-xs" 
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input 
                required
                type="tel"
                placeholder="Corporate Contact Phone Number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-electric transition-all text-xs" 
              />
            </div>

            <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-brand-electric text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-xs tracking-wide uppercase mt-2">
              Submit Request Details
            </button>
          </form>
        </div>

        {/* SECOND: Premium Features Grid Section (Uniform Visual Format) */}
        <div className="space-y-12 pt-12 border-t border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Included Premium Features</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Review the two new capabilities unlocked exclusively inside the corporate operational tier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Feature 1 Card */}
            <div className="p-6 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4 shadow-sm">
              <div className="p-3 bg-brand-blue/10 text-brand-electric w-fit rounded-xl">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Feature 1: Conversational AI Agent (Voice & Text)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Command your assistant naturally. Look up specific content inside deep threads, cancel schedules, or locate specific information vocally or textually with direct auditory responses.
              </p>
            </div>

            {/* Feature 2 Card */}
            <div className="p-6 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4 shadow-sm">
              <div className="p-3 bg-brand-teal/10 text-brand-teal w-fit rounded-xl">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Feature 2: Automated Mail Response Engine</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Draft contextually precise email replies automatically. The system reviews the inbound email payload and combines it with your unique professional persona details to craft perfect replies.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-xs text-brand-amber font-medium pt-4">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Isolated corporate database models are deployed natively per client request.</span>
          </div>
        </div>
      </div>

      {/* Success Notification Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Submission Successful</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your request has been securely received. The DONNA team will reach out to your organization shortly to coordinate your onboarding.
              </p>
            </div>
            <Link 
              href="/"
              className="block w-full py-3 bg-slate-950 text-white dark:bg-white dark:text-[#080b11] font-bold rounded-xl hover:opacity-90 transition-all text-xs tracking-wide uppercase"
            >
              Return to Workspace
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}