"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, CreditCard, ShieldCheck, Lock, Landmark, Bot, MessageSquare } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [transactionComplete, setTransactionComplete] = useState(false);

  const plans: Plan[] = [
    { 
      id: "1mo",
      name: "Standard Pilot", 
      price: "$29", 
      period: "per month",
      description: "Ideal for testing DONNA's core parsing filters.",
      features: ["AI Email Categorization", "Dynamic Summary Cards", "Google Calendar Sync", "Standard Support Access"]
    },
    { 
      id: "6mo",
      name: "Professional Core", 
      price: "$149", 
      period: "for 6 months",
      description: "Optimized value built for active developers and professionals.",
      features: ["All Standard Pilot Core Options", "Priority Voice Agent Access", "Deep Context Semantic Extraction", "Advanced Data Privacy Safe Guard"]
    },
    { 
      id: "1yr",
      name: "Infinite Executive", 
      price: "$249", 
      period: "per year",
      description: "Maximum efficiency alignment for long-term productivity optimization.",
      features: ["Full Executive Capabilities Unlocked", "Zero-Latency Agent Response Cycles", "Unlimited Custom Rules Engine", "Dedicated Account Orchestrator Line"]
    },
  ];

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionComplete(true);
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#080b11] text-slate-900 dark:text-slate-100 p-6 md:py-20 transition-colors duration-300 relative">
        <div className="absolute top-10 left-10">
          <Link href="/" className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto space-y-20 pt-12">
          {/* Header Copy Block */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-electric bg-brand-blue/10 px-3 py-1 rounded-full font-bold">Pricing Framework</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">Select Your Operational Tier</h1>
            <p className="text-slate-500 dark:text-slate-400">Unlock complete context automated oversight. Choose the perfect timeline for your workflow.</p>
          </div>

          {/* Pricing Grid Layout Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const isPopular = plan.id === "6mo";
              return (
                <div 
                  key={plan.id} 
                  className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular 
                      ? "bg-white dark:bg-[#0f141c] border-brand-electric shadow-xl scale-105 z-10" 
                      : "bg-white/60 dark:bg-[#0f141c]/40 border-slate-200 dark:border-slate-800/80 shadow-md hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-brand-blue to-brand-electric text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Most Selected Plan</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800" />

                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs text-slate-600 dark:text-slate-300">
                          <Check className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button 
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                        isPopular 
                          ? "bg-gradient-to-r from-brand-blue to-brand-electric text-white shadow-md hover:opacity-95" 
                          : "bg-slate-100 dark:bg-[#080b11] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      Activate {plan.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Capabilities Feature Grid Section (Uniform Visual Format) */}
          <div className="space-y-12 pt-12 border-t border-slate-200 dark:border-slate-800/80">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Premium Capabilities Showcase</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Advanced architectural add-ons packed directly into premium deployment configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4 shadow-sm">
                <div className="p-3 bg-brand-blue/10 text-brand-electric w-fit rounded-xl">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Conversational AI Agent (Voice & Text)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Command your assistant naturally. Query deep indices, find attachments, or modify scheduled calendars instantly via integrated browser speech parsing loops.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 rounded-2xl space-y-4 shadow-sm">
                <div className="p-3 bg-brand-teal/10 text-brand-teal w-fit rounded-xl">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Automated Mail Response Engine</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Draft contextually precise email replies automatically. The system reviews the inbound email payload and combines it with your unique professional persona details to craft perfect replies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080b11] text-slate-900 dark:text-slate-100 p-6 flex items-center justify-center relative transition-colors duration-300">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Side: Summary Info Layout */}
        <div className="md:col-span-5 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl space-y-6 shadow-xl">
          <button 
            onClick={() => { setSelectedPlan(null); setTransactionComplete(false); }}
            className="flex items-center space-x-2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Change Timeline Plan</span>
          </button>

          <div className="space-y-2">
            <span className="text-[10px] bg-brand-blue/10 text-brand-electric px-2.5 py-0.5 font-bold uppercase rounded tracking-wider">Checkout Configuration</span>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Order Summary</h2>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#080b11] rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedPlan.name}</span>
              <span className="text-xl font-black text-brand-electric">{selectedPlan.price}</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">{selectedPlan.description}</p>
            <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-200 dark:border-slate-800">Term schedule cycles: {selectedPlan.period}</p>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <Lock className="h-4 w-4 text-slate-400 shrink-0" />
              <span>Simulated Secure TLS Endpoint Encryption</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-brand-teal shrink-0" />
              <span>Identity Layer Verified Sandbox Env</span>
            </div>
          </div>
        </div>

        {/* Right Side: Secure Checkout Form Layout */}
        <div className="md:col-span-7 bg-white dark:bg-[#0f141c] border border-slate-200 dark:border-slate-800/80 p-8 rounded-3xl shadow-xl min-h-[460px] flex flex-col justify-between">
          {!transactionComplete ? (
            <form onSubmit={handleSimulatedPayment} className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">Payment Method</h3>
                  <p className="text-xs text-slate-400">Select a payment type to view the simulated layout forms.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border flex items-center justify-center space-x-3 text-xs font-bold transition-all ${
                      paymentMethod === "card"
                        ? "border-brand-electric bg-brand-blue/5 text-brand-electric"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080b11] text-slate-400"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-xl border flex items-center justify-center space-x-3 text-xs font-bold transition-all ${
                      paymentMethod === "upi"
                        ? "border-brand-electric bg-brand-blue/5 text-brand-electric"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080b11] text-slate-400"
                    }`}
                  >
                    <Landmark className="h-4 w-4" />
                    <span>Instant UPI Option</span>
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Cardholder Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Card Number</label>
                      <input required type="text" maxLength={19} placeholder="4111 2222 3333 4444" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Expiry Date</label>
                        <input required type="text" maxLength={5} placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric font-mono text-center" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Security Code (CVV)</label>
                        <input required type="password" maxLength={3} placeholder="•••" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric font-mono text-center" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Virtual Payment Address (VPA)</label>
                      <input required type="text" placeholder="success@donna" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-electric font-mono" />
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-electric text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all text-xs tracking-wide uppercase mt-6">
                Complete Sandbox Transaction
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fadeIn h-full my-auto">
              <div className="w-16 h-16 bg-brand-teal/10 dark:bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center border border-brand-teal/20 animate-bounce">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Simulated Activation Success</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your sandbox profile has successfully updated authorization status for the <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPlan.name}</span> tier configuration. No actual currency transaction took place.
                </p>
              </div>
              <Link 
                href="/"
                className="px-8 py-3 bg-slate-950 text-white dark:bg-white dark:text-[#080b11] font-bold rounded-xl hover:opacity-90 transition-all text-xs tracking-wide uppercase shadow-md"
              >
                Go to Workspace Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}