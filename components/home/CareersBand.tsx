import { Container } from "@/components/site/Container";
import { Banner } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";

export function CareersBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <Banner title="Careers" action={{ href: "/careers", label: "See open roles" }}>
            We&rsquo;re hiring for engineering, operations, and research roles to help us accelerate
            AI evaluation and deployment infrastructure. Join the team building reliable AI.
          </Banner>
        </Reveal>
      </Container>
    </section>
  );
}
