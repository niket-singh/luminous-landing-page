import { Container, Section } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Heading";
import { Figure } from "@/components/site/Figure";
import { Reveal } from "@/components/site/Reveal";

/**
 * Text, then a full-bleed image. The edge-to-edge treatment is what
 * distinguishes this section from Solution below, which pairs its text and
 * image side by side inside the container — otherwise the two read as the
 * same beat twice.
 */
export function Problem() {
  return (
    <Section id="problem" tone="alt" className="pb-0 sm:pb-0">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Problem">
            AI researchers and enterprises are hitting walls with unreliable models and expensive
            infrastructure.
          </SectionHeading>

          <div className="prose-block mt-8">
            <p>
              Today&rsquo;s models can generate answers. But they struggle with real deployment.
              Because real deployment isn&rsquo;t just outputs. It&rsquo;s reliability, cost, and
              context. That knowledge doesn&rsquo;t exist in benchmarks &mdash; it lives inside
              expert evaluation.
            </p>
            <p>Expert evaluation has never been captured at scale. Until now.</p>
            <p>
              The most valuable signal isn&rsquo;t synthetic data. It exists in how domain experts
              evaluate &mdash; not just scores, but reasoning, judgment, and tradeoffs. We work with
              specialists across Southeast Asia to capture that evaluation signal, then structure it
              into infrastructure models can rely on.
            </p>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.1} className="mt-16">
        <Figure
          ratio="cinema"
          bleed
          src="/problem-image.jpg"
          alt="An operator at a mainframe control console"
        />
      </Reveal>
    </Section>
  );
}
