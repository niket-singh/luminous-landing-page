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
            Labs and enterprises are shipping models they cannot measure, at costs they cannot
            justify.
          </SectionHeading>

          <div className="prose-block mt-8">
            <p>
              A model that scores well on a leaderboard can still fail the job. Production asks
              harder questions: is this output trustworthy, at what unit cost, and under whose
              definition of correct? A benchmark number answers none of them.
            </p>
            <p>
              The answers sit with practitioners, and nobody has collected them at scale.
            </p>
            <p>
              Synthetic data cannot supply them either. What matters is the shape of a
              specialist&rsquo;s reasoning: the tradeoffs weighed, the plausible answers rejected,
              the judgment applied under real constraints. We work with domain experts across
              Southeast Asia to record that reasoning and turn it into evaluation and routing
              infrastructure you can build on.
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
