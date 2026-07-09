"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lenis from "lenis";
import logoImg from "./logoo.png";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleTryNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/auth/signup?email=${encodeURIComponent(email)}`;
    } else {
      window.location.href = "/auth/signup";
    }
  };

  // Subtle, premium motion system
  const fadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  const pageStyle = {
    fontFamily: '"ULM Grotesk",  ui-sans-serif, system-ui, sans-serif',
  };

  return (
    <div className="min-h-screen bg-[#06070A] text-white relative selection:bg-[#F08049]/30 selection:text-white" style={pageStyle}>
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#06070A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image 
              src={logoImg} 
              alt="DONNA Logo" 
              width={24} 
              height={24} 
              className="object-contain"
              priority
            />
            <span className="text-sm font-medium tracking-tight text-white">DONNA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/pricing" className="hover:text-white transition-colors duration-150">Pricing</Link>
            <Link href="/enterprise" className="hover:text-white transition-colors duration-150">Enterprise</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="text-sm text-white/60 hover:text-white transition-colors duration-150">
              Log in
            </Link>
            <Link 
              href="/auth/signup" 
              className="text-sm bg-[#F08049] text-[#06070A] px-4 py-1.5 rounded-full font-medium hover:bg-[#F08049]/90 transition-colors duration-150"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-40 lg:pt-36 lg:pb-56 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center text-left"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.span 
            variants={fadeUp} 
            className="text-sm font-medium tracking-wider text-[#F08049] uppercase mb-6 block"
          >
            AI Chief of Staff
          </motion.span>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-[72px] md:text-[96px] lg:text-[120px] font-medium text-white tracking-[-0.08em] leading-[0.92] mb-8"
          >
            Donna already took care of it.
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="text-lg md:text-xl text-white/60 font-normal max-w-xl leading-relaxed mb-10"
          >
            She reads every email, finds what matters, books the meeting, drafts the reply, and leaves you with only the decisions.
          </motion.p>

          {/* Email Capture Form */}
          <motion.div variants={fadeUp} className="max-w-md w-full mb-6">
            <form onSubmit={handleTryNow} className="flex p-1 bg-white/[0.03] border border-white/10 rounded-full focus-within:border-[#F08049]/30 transition-colors duration-200">
              <input 
                type="email" 
                placeholder="Enter your work email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white placeholder:text-white/30 text-sm pl-5 pr-2 py-2.5 w-full focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-[#F08049] text-[#06070A] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#F08049]/90 whitespace-nowrap transition-colors duration-150"
              >
                See DONNA Work
              </button>
            </form>
          </motion.div>

          {/* Value Propositions */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><span className="text-[#F08049]">✓</span> Knows what matters</span>
            <span className="flex items-center gap-1.5"><span className="text-[#F08049]">✓</span> Protects your time</span>
            <span className="flex items-center gap-1.5"><span className="text-[#F08049]">✓</span> Never misses details</span>
          </motion.div>
        </motion.div>

        {/* Hero Right Panel */}
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-[32px] p-8 text-left tracking-tight">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-medium tracking-[0.2em] text-white/40">DONNA</span>
              <div className="w-2 h-2 rounded-full bg-[#F08049] shadow-[0_0_12px_rgba(240,128,73,0.4)]" />
            </div>

            <h3 className="text-2xl font-medium text-white mb-1">Good morning.</h3>
            <p className="text-white/40 text-sm mb-6">3 things need your attention.</p>

            <div className="border-t border-white/10 my-5" />

            <div className="space-y-5 py-2">
              <div>
                <h4 className="text-sm font-medium text-white">Investor Update</h4>
                <p className="text-xs text-white/40 mt-0.5">Requires response</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Board Meeting</h4>
                <p className="text-xs text-white/40 mt-0.5">Scheduled Thursday</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Partnership Contract</h4>
                <p className="text-xs text-white/40 mt-0.5">Review requested</p>
              </div>
            </div>

            <div className="border-t border-white/10 my-5" />

            <p className="text-sm text-white/60">Everything else is handled.</p>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Large Centered Statement */}
      <section className="max-w-7xl mx-auto px-8 py-48 lg:py-64 text-center">
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Most inboxes create work. <br />
          <span className="text-[#F08049]">Donna</span> removes it.
        </motion.h2>
      </section>

      {/* Section 3: Proposition Cards */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">She&apos;s not another inbox assistant.</h2>
          <p className="text-lg text-white/40 font-normal">She&apos;s the person everyone wishes they had.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Understands context", desc: "Maps your operational realities and flags nuanced opportunities immediately." },
            { title: "Protects your time", desc: "Deflects low-priority clutter and resolves scheduling friction autonomously." },
            { title: "Remembers details", desc: "Tracks operational histories and context across all historical threads." },
            { title: "Gets things done", desc: "Drafts comprehensive communications and coordinates standard workflows flawlessly." }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-colors duration-300 hover:border-[#F08049]/30"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <h3 className="text-lg font-medium text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-normal">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Vertical Timeline */}
      <section className="max-w-3xl mx-auto px-8 py-32 lg:py-48">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">A day of work. In 12 seconds.</h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-36 pl-8 space-y-14">
          {[
            { time: "08:02 AM", title: "238 emails analyzed", desc: "High-volume inputs contextually organized, matched, and classified correctly." },
            { time: "08:02 AM", title: "3 critical items surfaced", desc: "Surfaced urgent decisions requiring individual founder attention." },
            { time: "08:03 AM", title: "2 meetings scheduled", desc: "Cross-checked team calendars, resolved time zones, and distributed invites." },
            { time: "08:04 AM", title: "7 follow-ups drafted", desc: "Accurate, structured message responses staged inside your workspace." }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              className="relative"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#06070A] border-2 border-[#F08049]" />
              
              <div className="md:absolute md:-left-44 md:top-0 text-xs font-medium tracking-wider text-[#F08049] uppercase mb-2 md:mb-0 w-28 text-left">
                {item.time}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-8 py-32 lg:py-48 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16">
          <motion.div 
            className="flex flex-col justify-between"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-3xl md:text-4xl font-normal tracking-tight leading-relaxed text-white/90 mb-10">
              &ldquo;I stopped checking my inbox first thing in the morning.&rdquo;
            </p>
            <div>
              <p className="text-base font-medium text-white">Sarah Chen</p>
              <p className="text-xs tracking-wider text-white/40 uppercase mt-0.5">Founder</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-between"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-3xl md:text-4xl font-normal tracking-tight leading-relaxed text-white/90 mb-10">
              &ldquo;It feels like having a chief of staff who never sleeps.&rdquo;
            </p>
            <div>
              <p className="text-base font-medium text-white">Michael Vance</p>
              <p className="text-xs tracking-wider text-white/40 uppercase mt-0.5">Product Lead</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
          {[
            { metric: "4.3", label: "hours returned every week" },
            { metric: "98.4%", label: "classification accuracy" },
            { metric: "3 min", label: "average setup" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex flex-col"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-3">
                {stat.metric}
              </span>
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-8 pb-40 pt-12">
        <motion.div 
          className="w-full bg-white/[0.02] border border-white/10 rounded-[40px] py-24 px-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 max-w-2xl mx-auto leading-tight text-white">
            Email was never meant to be work.
          </h2>
          <p className="text-base md:text-lg text-white/40 max-w-md mx-auto mb-10 leading-relaxed font-normal">
            Let Donna handle the inbox. You handle everything else.
          </p>
          
          <Link 
            href="/auth/signup" 
            className="inline-block bg-[#F08049] text-[#06070A] px-8 py-3.5 rounded-full font-medium hover:bg-[#F08049]/90 transition-colors duration-150 text-base shadow-[0_0_40px_rgba(240,128,73,0.15)]"
          >
            Open DONNA
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 font-normal">
        <div className="flex items-center gap-2">
          <Image src={logoImg} alt="DONNA Logo" width={16} height={16} className="opacity-30" />
          <span>© 2026 DONNA. All rights reserved.</span>
        </div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-white/50 transition-colors duration-150">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/50 transition-colors duration-150">Terms of Service</Link>
        </div>
      </footer>

    </div>
  );
}