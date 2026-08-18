import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get started — Adzzat Labs",
  description:
    "Tell us what you're building. We'll help you evaluate it and deploy it reliably — evaluation datasets, intelligent routing, or full-stack AI infrastructure.",
  alternates: { canonical: "/get-started" },
};

const ALTERNATE_PATHS = [
  {
    audience: "For engineering teams",
    prompt: "Already know what you need?",
    href: "/products",
    label: "Browse products",
  },
  {
    audience: "For enterprise",
    prompt: "Need custom scope and pricing?",
    href: "/for-enterprises",
    label: "Talk to sales",
  },
  {
    audience: "For researchers",
    prompt: "Evaluating models for publication?",
    href: "/research",
    label: "View research",
  },
] as const;

export default function GetStartedPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <h1 className="t-h2">Get started</h1>
                <p className="t-lead mt-5">
                  Tell us what you&rsquo;re building. We&rsquo;ll help you evaluate it and deploy it
                  reliably.
                </p>
                <div className="mt-10">
                  <p className="t-meta">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-2 inline-block text-base font-medium text-ink underline underline-offset-4 transition-opacity duration-150 hover:opacity-60"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </Container>
        </section>

        <Section tone="alt">
          <Container>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
              {ALTERNATE_PATHS.map((path, index) => (
                <Reveal key={path.href} delay={index * 0.05}>
                  <div className="border-t border-rule pt-6">
                    <h2 className="text-[17px] font-semibold leading-snug text-ink">
                      {path.audience}
                    </h2>
                    <p className="t-small mt-2">{path.prompt}</p>
                    <Link
                      href={path.href}
                      className="group mt-4 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
                    >
                      {path.label}
                      <span aria-hidden="true" className="arrow-slide">&#8594;</span>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
