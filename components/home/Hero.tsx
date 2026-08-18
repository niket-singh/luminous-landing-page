import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";
import { Figure } from "@/components/site/Figure";
import { Reveal } from "@/components/site/Reveal";

export function Hero() {
  return (
    <section id="top" className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Container>
        <Reveal>
          <h1 className="t-display">We evaluate so you can deploy with confidence.</h1>
          <p className="t-lead mt-5">
            The future of AI isn&rsquo;t about bigger models. It&rsquo;s about better evaluation
            &mdash; which model, which task, which moment.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/get-started">Get started</ButtonLink>
            <ButtonLink href="/research" variant="ghost">
              Explore research
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <Reveal delay={0.1}>
          <Figure ratio="cinema" priority src="/motion-blur-figures.png" alt="" />
        </Reveal>
      </Container>
    </section>
  );
}
