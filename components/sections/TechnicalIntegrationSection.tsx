"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// macOS-style terminal window with code snippet
function TerminalWindow() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl"
      style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}
      aria-hidden
    >
      {/* Title bar — macOS traffic lights */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1a1a] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span
          className="ml-4 text-[11px] text-white/50"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          load_dataset.py
        </span>
      </div>
      {/* Code content */}
      <div className="p-4 font-mono text-sm leading-relaxed md:p-5 md:text-[13px]" style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}>
        <div className="text-[#6b7280]">{"# Pipeline-ready: your schema, zero cleaning"}</div>
        <div className="mt-2">
          <span className="text-[#c084fc]">from</span>
          <span className="text-white"> adzzatlabs </span>
          <span className="text-[#c084fc]">import</span>
          <span className="text-white"> load_dataset</span>
        </div>
        <div className="mt-2">
          <span className="text-white">ds </span>
          <span className="text-white/70">= </span>
          <span className="text-white">load_dataset(</span>
          <span className="text-[#86efac]">&quot;agentic-traces&quot;</span>
          <span className="text-white/70">, </span>
          <span className="text-[#86efac]">&quot;train&quot;</span>
          <span className="text-white">)</span>
        </div>
        <div className="mt-2">
          <span className="text-[#c084fc]">for</span>
          <span className="text-white"> batch </span>
          <span className="text-[#c084fc]">in</span>
          <span className="text-white"> ds.iter_batches():</span>
        </div>
        <div className="ml-4 mt-0.5">
          <span className="text-white">train_step(</span>
          <span className="text-white">batch</span>
          <span className="text-white">)</span>
        </div>
      </div>
    </div>
  );
}

export function TechnicalIntegrationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.2"],
  });

  const accentLineOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.45]);
  const kickerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const kickerY = useTransform(scrollYProgress, [0, 0.1], [16, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.08, 0.22], [20, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.14, 0.36], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.14, 0.36], [16, 0]);
  const terminalOpacity = useTransform(scrollYProgress, [0.12, 0.38], [0, 1]);
  const terminalScale = useTransform(scrollYProgress, [0.12, 0.38], [0.96, 1]);

  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#050814] px-6 py-24 md:px-14 md:py-32"
        aria-labelledby="integration-heading"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(216, 109, 252, 0.04) 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <p
              className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-inter)", color: "var(--brand)" }}
            >
              Zero Friction Integration
            </p>
            <h2
              id="integration-heading"
              className="mb-6 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-white md:mb-8"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Native formatting for the frontier stack.
            </h2>
            <p
              className="text-white/80"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)",
                lineHeight: 1.65,
              }}
            >
              We don&apos;t just deliver data; we deliver pipeline-ready assets. Datasets arrive strictly formatted to your schema—whether you are orchestrating with Ray, fine-tuning via Mosaic ML, or pulling directly into standard Hugging Face dataset loaders.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg md:max-w-none">
              <TerminalWindow />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050814] px-6 py-24 md:px-14 md:py-32"
      aria-labelledby="integration-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(216, 109, 252, 0.04) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="pointer-events-none absolute right-6 top-[clamp(6rem,18vw,10rem)] select-none text-[clamp(4rem,18vw,12rem)] font-semibold leading-none tracking-tighter text-white md:right-14"
        style={{
          fontFamily: "var(--font-geist-sans)",
          opacity: 0.035,
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
        }}
        aria-hidden
      >
        07
      </div>

      <motion.div
        className="absolute left-1/2 top-[clamp(4rem,10vw,5rem)] h-px w-full max-w-[min(88vw,56rem)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--brand) 20%, var(--brand) 80%, transparent 100%)",
          opacity: accentLineOpacity,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <motion.p
            className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.35em]"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--brand)",
              opacity: kickerOpacity,
              y: kickerY,
            }}
          >
            Zero Friction Integration
          </motion.p>
          <motion.h2
            id="integration-heading"
            className="mb-6 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-white md:mb-8"
            style={{
              fontFamily: "var(--font-geist-sans)",
              opacity: headlineOpacity,
              y: headlineY,
            }}
          >
            Native formatting for the frontier stack.
          </motion.h2>
          <motion.p
            className="text-white/80"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)",
              lineHeight: 1.65,
              opacity: bodyOpacity,
              y: bodyY,
            }}
          >
            We don&apos;t just deliver data; we deliver pipeline-ready assets. Datasets arrive strictly formatted to your schema—whether you are orchestrating with Ray, fine-tuning via Mosaic ML, or pulling directly into standard Hugging Face dataset loaders.
          </motion.p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <motion.div
            className="w-full max-w-lg md:max-w-none"
            style={{
              opacity: terminalOpacity,
              scale: terminalScale,
            }}
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
