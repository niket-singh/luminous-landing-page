"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TEAM = [
  {
    name: "Aryan Honawar",
    role: "CEO & Co‑Founder",
    bio: "Visionary leader driving AI innovation and data excellence.",
    email: "aryanhonawar@adzzatlabs.com",
    image: "/aryan.jpeg",
  },
  {
    name: "Nabeel",
    role: "COO & Co‑Founder",
    bio: "Operations expert ensuring seamless delivery and scalability.",
    email: "nabeel@adzzatlabs.com",
    image: "/nabeel.jpeg",
  },
  {
    name: "Eshu",
    role: "CTO",
    bio: "Founding technical leader architecting AdzzatLabs’s frontier data and infrastructure stack.",
    email: "eshu@adzzatlabs.com",
    image: "/eshu.jpg",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const overlineOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const overlineY = useTransform(scrollYProgress, [0, 0.12], [12, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.25], [24, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.18, 0.4], [0, 1]);
  const gridY = useTransform(scrollYProgress, [0.18, 0.4], [32, 0]);

  const contentTransforms = reducedMotion
    ? {
      overlineOpacity: 1,
      overlineY: 0,
      titleOpacity: 1,
      titleY: 0,
      gridOpacity: 1,
      gridY: 0,
    }
    : {
      overlineOpacity,
      overlineY,
      titleOpacity,
      titleY,
      gridOpacity,
      gridY,
    };

  const gradientBg = {
    background:
      "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(216, 109, 252, 0.10) 0%, transparent 55%), radial-gradient(ellipse 80% 50% at 10% 80%, rgba(30, 64, 175, 0.25) 0%, transparent 55%)",
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050814] px-6 py-24 md:px-14 md:py-32"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={gradientBg}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      {/* Section number */}
      <div
        className="pointer-events-none absolute right-6 top-[clamp(6rem,18vw,10rem)] select-none text-[clamp(4rem,18vw,12rem)] font-semibold leading-none tracking-tighter text-white md:right-14"
        style={{
          fontFamily: "var(--font-geist-sans)",
          opacity: 0.035,
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
        }}
        aria-hidden
      >
        08
      </div>

      {/* Top accent line */}
      <motion.div
        className="absolute left-1/2 top-[clamp(4rem,10vw,5rem)] h-px w-full max-w-[min(88vw,56rem)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--brand) 20%, var(--brand) 80%, transparent 100%)",
          opacity: reducedMotion ? 0.45 : contentTransforms.overlineOpacity,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 md:gap-14">
        <div className="max-w-2xl">
          <motion.p
            className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-(--brand)"
            style={{
              fontFamily: "var(--font-inter)",
              opacity: contentTransforms.overlineOpacity,
              y: contentTransforms.overlineY,
            }}
          >
            The team behind the data
          </motion.p>
          <motion.h2
            id="about-heading"
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-geist-sans)",
              opacity: contentTransforms.titleOpacity,
              y: contentTransforms.titleY,
            }}
          >
            Operating layer for AdzzatLabs&apos;s frontier data engine.
          </motion.h2>
          <motion.p
            className="mt-5 max-w-xl text-sm text-white/80 md:text-base"
            style={{
              fontFamily: "var(--font-inter)",
              opacity: contentTransforms.titleOpacity,
              y: contentTransforms.titleY,
            }}
          >
            A lean founding team combining institutional ops, product, and deep
            engineering experience—responsible for how AdzzatLabs sources, vets, and
            ships institutional‑grade datasets.
          </motion.p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          style={{
            opacity: contentTransforms.gridOpacity,
            y: contentTransforms.gridY,
          }}
        >
          {TEAM.map((member) => (
              <div
                key={member.email}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.65)] md:p-6"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white/5 md:h-14 md:w-14">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                    priority={false}
                    unoptimized
                  />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold tracking-tight text-white md:text-lg"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="mt-0.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/60"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
              <p
                className="mb-5 text-sm leading-relaxed text-white/75"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {member.bio}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs font-medium tracking-[0.14em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {member.email}
                </a>
                <span
                  className="rounded-full bg-white/5 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Core team
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

