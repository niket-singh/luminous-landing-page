"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "adzzatlabs-dpdp-consent";
/** Held back briefly so the banner never competes with first paint. */
const APPEAR_DELAY_MS = 1200;

export type ConsentLevel = "all" | "essential" | null;

function getStoredConsent(): ConsentLevel {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "all" || value === "essential") return value;
  } catch {
    // Storage unavailable — treat as "not yet answered".
  }
  return null;
}

function setStoredConsent(value: "all" | "essential") {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Non-fatal: the choice applies for this session only.
  }
}

export function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentLevel>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored !== null) return;

    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const accept = (level: "all" | "essential") => {
    setStoredConsent(level);
    setConsent(level);
    setVisible(false);
  };

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-heading"
      aria-describedby="consent-description"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[100] border-t border-rule bg-paper/95 backdrop-blur-md",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10 sm:px-8">
        <div>
          <h2 id="consent-heading" className="text-sm font-semibold text-ink">
            Data &amp; cookie consent (India DPDP Act 2023)
          </h2>
          <p id="consent-description" className="t-small mt-1.5 max-w-[76ch]">
            We use cookies to run the site and, with your consent, to understand how it is used.
            Under the Digital Personal Data Protection Act 2023 we need your explicit consent
            before collecting or processing your data.{" "}
            <Link href="/privacy" className="text-ink underline underline-offset-4">
              Read our itemised privacy notice.
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => accept("essential")}
            className="rounded-full bg-paper-sunk px-4 py-2 text-[13px] font-medium text-ink transition-opacity duration-150 hover:opacity-70"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => accept("all")}
            className="rounded-full bg-shell px-4 py-2 text-[13px] font-medium text-shell-ink transition-opacity duration-150 hover:opacity-70"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
