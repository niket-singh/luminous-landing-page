import { Container } from "@/components/site/Container";
import { Banner } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";

export function CareersBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <Banner title="Careers" action={{ href: "/careers", label: "See open roles" }}>
            Engineering, operations and research roles are open. Come build the evaluation and
            routing layer that production AI depends on.
          </Banner>
        </Reveal>
      </Container>
    </section>
  );
}
