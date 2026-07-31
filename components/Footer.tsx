"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070b18] px-6 py-10 text-sm text-white/70 md:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 max-w-sm">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/40">
            ADZZATLABS
          </p>
          <p className="text-sm text-white/75">
            Expert-curated evaluation and training data for foundation models.
          </p>
          <div className="mt-4 space-y-1 text-xs text-white/60">
            <p>contact@adzzat.com</p>
            <p>Bay Area · Mumbai</p>
          </div>
        </div>

        <div className="flex flex-1 flex-wrap gap-8 md:justify-end">
          <div className="min-w-[140px] space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Navigation
            </p>
            <nav className="flex flex-col gap-1.5 text-sm">
              <a href="#top" className="hover:text-white">
                Home
              </a>
              <a href="#benchmarks" className="hover:text-white">
                Benchmarks
              </a>
              <a href="#capabilities" className="hover:text-white">
                Capabilities
              </a>
              <a href="#about" className="hover:text-white">
                About
              </a>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          <div className="min-w-[160px] space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Company
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="https://www.linkedin.com/company/adzzatlabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-4 text-[11px] text-white/40 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} AdzzatLabs. All rights reserved.</p>
        <p className="max-w-md">
          Built for frontier AI teams that need high-signal human evaluation and
          training data, not commoditized crowdsourcing.
        </p>
      </div>
    </footer>
  );
}

