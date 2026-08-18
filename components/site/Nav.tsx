"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { ButtonLink } from "@/components/site/Button";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--nav-clearance)] max-w-[1280px] items-center gap-6 px-6 sm:px-8">
        <Logo />

        <nav className="hidden flex-1 justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <ButtonLink href="/careers" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Careers
          </ButtonLink>
          <ButtonLink href="/get-started" variant="solid" size="sm">
            Get started
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="inline-flex size-8 items-center justify-center lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-rule bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-6 sm:px-8">
            {[...NAV_LINKS, { href: "/careers", label: "Careers" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-4 text-base font-medium text-ink last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 8h16M4 16h16" />
      )}
    </svg>
  );
}
