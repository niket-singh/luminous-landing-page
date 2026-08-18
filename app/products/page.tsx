import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { Banner } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "AI Evaluation & Routing Products — Adzzat Labs",
  description:
    "Expert evaluation, preference signals, adversarial testing, and the routing infrastructure that turns a capable model into a reliable one.",
  alternates: { canonical: "/products" },
};

const PRODUCTS = [
  {
    title: "Rubric and Verifier-based Evaluation",
    description:
      "Expert-designed evaluation frameworks for reasoning-intensive tasks. Transform subjective quality judgments into scalable training signals.",
  },
  {
    title: "Tool-calling Evaluation Environments",
    description:
      "Comprehensive evaluation across API integrations and service interfaces — enabling verification of agent capabilities in realistic workflows.",
  },
  {
    title: "Supervised Fine-Tuning Data",
    description:
      "High-quality prompt–response pairs with detailed evaluation traces. Teaching models operational patterns across diverse task categories.",
  },
  {
    title: "Computer-use and Browser-use Evaluation",
    description:
      "Human-evaluation of interaction sequences across desktop and web environments. Teaching models to navigate software through expert judgment.",
  },
  {
    title: "RLHF and Preference Modeling",
    description:
      "Comparative ranking data and reward model training sets derived from expert judgments across domains.",
  },
  {
    title: "Intelligent Routing",
    description:
      "Dynamic request classification and model selection for cost-efficient, quality-aware deployment.",
  },
  {
    title: "Code Generation Evaluation",
    description:
      "Multi-language assessment suites covering correctness, efficiency, style compliance, and edge-case handling.",
  },
  {
    title: "Professional Domains",
    description:
      "Vertical-specific evaluation in law, medicine, finance, engineering — wherever specialized judgment separates adequate from excellent.",
  },
  {
    title: "Deep Research",
    description:
      "Extended reasoning evaluation, multi-step problem assessment, and research synthesis validation.",
  },
  {
    title: "Loss Pattern Analysis",
    description:
      "Diagnostic datasets identifying systematic failure modes, hallucination patterns, and degradation signatures.",
  },
  {
    title: "Multimodal Assessment",
    description:
      "Vision-language evaluation, document understanding, chart interpretation, and cross-modal reasoning verification.",
  },
  {
    title: "Off-the-shelf Data",
    description:
      "Pre-built evaluation and training sets for common domains — ship faster with validated starting points.",
  },
  {
    title: "Custom Evaluations and Training Datasets",
    description:
      "Bespoke evaluation and routing infrastructure aligned to your specific models, tasks, and quality thresholds.",
  },
] as const;

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <Reveal>
              <h1 className="t-display">Products</h1>
              <p className="t-lead mt-5">
                Our products encode that full spectrum: expert evaluation, preference signals,
                adversarial testing, and the routing infrastructure that turns a capable model into
                a reliable one.
              </p>
            </Reveal>
          </Container>
        </section>

        <Section tone="alt">
          <Container>
            <ol>
              {PRODUCTS.map((product, index) => (
                <Reveal key={product.title} delay={Math.min(index, 6) * 0.03}>
                  <li className="grid gap-3 border-t border-rule py-8 sm:grid-cols-[minmax(0,3rem)_1fr] sm:gap-8">
                    <span className="t-meta sm:pt-1.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="t-h3">{product.title}</h2>
                      <p className="t-small mt-2 max-w-[62ch]">{product.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>

        <section className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <Banner
                title="Not sure which layer you need?"
                action={{ href: "/get-started", label: "Talk to the team" }}
              >
                Tell us what you&rsquo;re building and where it breaks down. We&rsquo;ll scope the
                evaluation and routing infrastructure around it.
              </Banner>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
