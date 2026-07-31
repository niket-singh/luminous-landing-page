"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "adzzatlabs-dpdp-consent";
const HERO_READY_EVENT = "adzzatlabs-hero-ready";
export type ConsentLevel = "all" | "essential" | null;

function getStoredConsent(): ConsentLevel {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "all" || v === "essential") return v;
  } catch (_) {}
  return null;
}

function setStoredConsent(value: "all" | "essential") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch (_) {}
}

export function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [mounted, setMounted] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setMounted(true);
  }, []);

  useEffect(() => {
    const onHeroReady = () => setHeroReady(true);
    window.addEventListener(HERO_READY_EVENT, onHeroReady);

    if (document.documentElement.dataset.adzzatlabsHeroReady === "true") {
      setHeroReady(true);
    }

    const fallback = setTimeout(() => setHeroReady(true), 14000);
    return () => {
      window.removeEventListener(HERO_READY_EVENT, onHeroReady);
      clearTimeout(fallback);
    };
  }, []);

  const handleAccept = (level: "all" | "essential") => {
    setStoredConsent(level);
    setConsent(level);
  };

  if (!mounted || consent !== null || !heroReady) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-100 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md"
        role="dialog"
        aria-labelledby="consent-heading"
        aria-describedby="consent-description"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-6">
          <div className="flex-1">
            <h2
              id="consent-heading"
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Data &amp; cookie consent (India DPDP Act 2023)
            </h2>
            <p
              id="consent-description"
              className="mt-1 text-xs leading-relaxed text-white/70 md:mt-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We use cookies and similar technologies to run the site, improve your experience, and (with your consent) to understand how you use our services. Under the Digital Personal Data Protection Act 2023, we need your explicit consent before collecting or processing your data. You can choose to accept all, or only essential cookies.{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-(--brand) focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Read our Itemized Privacy Notice here.
              </a>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleAccept("essential")}
              className="inline-flex items-center justify-center border border-white/25 bg-transparent px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => handleAccept("all")}
              className="inline-flex items-center justify-center border border-(--brand) bg-(--brand) px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:opacity-90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Accept all
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
