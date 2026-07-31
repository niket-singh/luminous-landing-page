"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;

type HeroOverlayProps = {
  show: boolean;
  /** When true (iOS static hero), center content vertically to avoid empty top space */
  staticHero?: boolean;
};

export function HeroOverlay({ show, staticHero = false }: HeroOverlayProps) {
  return (
    <div
      className={`absolute inset-0 z-10 flex justify-center px-6 pt-12 md:justify-start md:pt-20 md:px-14 lg:px-20 ${staticHero
        ? "items-center pb-12 md:items-center md:pb-16"
        : "items-center pb-12 md:items-end md:pb-[clamp(4rem,15vw,10rem)]"
        } ${show ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <motion.div
        className="pointer-events-none absolute left-6 top-6 md:left-14 md:top-8 lg:left-20"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -6 }}
        transition={{ duration: 0.45, delay: show ? 0.08 : 0, ease: easing }}
      >
        <Image
          src="/nobg.png"
          alt="AdzzatLabs"
          width={170}
          height={52}
          priority
          unoptimized
          className="h-auto w-[150px] sm:w-[170px] md:w-[200px]"
        />
      </motion.div>

      <div className="flex max-w-2xl flex-col text-left">
        {/* Accent line — editorial detail */}
        <motion.div
          className="mb-6 h-px w-12 bg-(--brand)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: show ? 1 : 0 }}
          transition={{ duration: 0.6, delay: show ? 0.1 : 0, ease: easing }}
          style={{ originX: 0 }}
        />

        {/* Headline — one strong line, light weight, tight tracking */}
        <motion.h1
          className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.1] tracking-tight text-white"
          style={{ fontFamily: "var(--font-geist-sans), var(--font-inter), sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.7, delay: show ? 0.2 : 0, ease: easing }}
        >
          Powering Frontier AI with Imperative Data.
        </motion.h1>

        {/* Subheadline — sentence case, differentiator-focused (expert-curated, human intelligence) */}
        <motion.p
          className="mt-5 max-w-[42ch] text-[clamp(0.875rem,1.35vw,1rem)] leading-relaxed text-white/70"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
          transition={{ duration: 0.6, delay: show ? 0.4 : 0, ease: easing }}
        >
          Accelerate foundation model development with expert-curated datasets engineered for complex reasoning and agentic workflows. We source the human intelligence that synthetic data cannot replicate.
        </motion.p>

        {/* CTAs — primary: consultation; secondary: low-friction benchmarks */}
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
          transition={{ duration: 0.5, delay: show ? 0.6 : 0, ease: easing }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-medium tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:border-(--brand) hover:bg-white/10"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Schedule a Data Architecture Consultation
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded border border-white/15 bg-white/3 px-6 py-3.5 text-sm font-medium tracking-[0.06em] text-white/80 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/6 hover:text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Explore Evaluation Benchmarks
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
