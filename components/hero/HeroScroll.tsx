"use client";

import { useEffect } from "react";
import { HeroOverlay } from "./HeroOverlay";
import { usePrefersStaticHero } from "@/hooks/usePrefersStaticHero";

const LOOP_VIDEO = "/loop.mp4";

export function HeroScroll() {
  const preferStaticHero = usePrefersStaticHero();

  // Signal consent banner that hero is ready
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("adzzatlabs-hero-ready"));
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Desktop: looping video background */}
      {!preferStaticHero && (
        <video
          src={LOOP_VIDEO}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
      )}

      {/* Mobile/iOS: static gradient hero */}
      {preferStaticHero && (
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, #050505 0%, #0a0a0a 40%, #000 100%), radial-gradient(ellipse 80% 50% at 50% 30%, rgba(216, 109, 252, 0.08) 0%, transparent 50%)",
          }}
          aria-hidden
        />
      )}

      {/* Dark overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-black/82"
        aria-hidden
      />

      {/* Hero text + CTAs — visible immediately */}
      <HeroOverlay show staticHero={preferStaticHero} />
    </section>
  );
}
