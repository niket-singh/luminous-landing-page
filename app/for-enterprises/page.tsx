import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { Banner } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Enterprise AI Infrastructure — Adzzat Labs",
  description:
    "Evaluation infrastructure and routing intelligence for production AI. Cost optimization, custom datasets, compliance-ready provenance, and dedicated support.",
  alternates: { canonical: "/for-enterprises" },
};

const VALUE_SECTIONS = [
  {
    title: "Cost Optimization at Scale",
    description:
      "Enterprise inference budgets spiral quickly. Our routing layer automatically classifies incoming requests and allocates them across model tiers — frontier models only where justified, efficient models elsewhere. Typical reduction: 70–85% on inference spend without quality regression.",
  },
  {
    title: "Evaluation Infrastructure",
    description:
      "Ship AI features with confidence. Our evaluation frameworks provide continuous signal on model performance across your specific use cases — not generic benchmarks, but measurements against your actual requirements.",
  },
  {
    title: "Custom Dataset Development",
    description:
      "Your domain expertise, encoded for training. We work with your subject matter experts to capture their judgment, reasoning, and decision patterns — then transform these into training datasets your models can learn from.",
  },
  {
    title: "Compliance and Safety",
    description:
      "Evaluation data that supports audit requirements. Documented provenance, contributor verification, and quality controls that satisfy enterprise procurement and risk standards.",
  },
  {
    title: "Dedicated Support",
    description:
      "Direct line to our research and engineering teams. White-glove onboarding, ongoing optimization, and strategic guidance as your AI capabilities mature.",
  },
] as const;

export default function ForEnterprisesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <Reveal>
              <h1 className="t-display">For Enterprises</h1>
              <p className="t-lead mt-5">
                Production AI systems demand production-grade reliability. We provide the evaluation
                infrastructure and routing intelligence that enterprise deployments require.
              </p>
            </Reveal>
          </Container>
        </section>

        <Section tone="alt">
          <Container>
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {VALUE_SECTIONS.map((section, index) => (
                <Reveal key={section.title} delay={index * 0.05}>
                  <div className="border-t border-rule pt-6">
                    <h2 className="t-h3">{section.title}</h2>
                    <p className="t-small mt-3 max-w-[52ch]">{section.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <section className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <Banner
                title="Ready to deploy reliable AI?"
                action={{ href: "/get-started", label: "Contact sales" }}
              >
                Talk to our team about evaluation datasets, intelligent routing, or full-stack AI
                infrastructure.
              </Banner>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
