import { Container, Section } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Heading";
import { DataCard } from "@/components/site/Cards";
import { Figure } from "@/components/site/Figure";
import { Reveal } from "@/components/site/Reveal";

const CAPABILITIES = [
  {
    title: "Intelligent Routing",
    description:
      "Dynamic model selection powered by real-time evaluation — right model, right task, every time. Cut costs without sacrificing reliability. Infrastructure built from operational experience.",
  },
  {
    title: "Human Evaluation",
    description:
      "Domain-specific assessment delivered through our Southeast Asian contributor network. Real judgments from domain experts — reasoning that synthetic data cannot replicate.",
  },
  {
    title: "Custom Evaluations",
    description:
      "Bespoke evaluation frameworks aligned to your specific domain and quality requirements. Production-grade infrastructure built on expert judgment.",
  },
  {
    title: "RL Environments",
    description:
      "Training environments that teach models to reason, not just pattern-match. Reward frameworks built from scaled human preference data and expert evaluation.",
  },
] as const;

export function Solution() {
  return (
    <Section id="solution">
      <Container>
        {/* Text and image side by side, against Problem's stacked text over a
            full-bleed image. Same ingredients, different shape — without this
            the two sections read as the same beat twice. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Our solution">
              We turn real-world expertise into reliable AI infrastructure.
            </SectionHeading>

            <div className="prose-block mt-8">
              <p>
                Adzzat Labs is an applied research lab curating data and routing solutions for
                frontier foundation model development. Models evaluated on synthetic benchmarks
                plateau. Models evaluated on expert judgment improve. We build infrastructure that
                reflects how experts actually evaluate models &mdash; step by step, domain by
                domain.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Figure
              ratio="wide"
              src="/crowd.jpg"
              alt="A crowd of people moving through an open concourse"
            />
          </Reveal>
        </div>

        <Reveal>
          <p className="t-small mt-16 text-ink">Our platform includes:</p>
        </Reveal>

        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {CAPABILITIES.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <DataCard title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
