import { Container } from "@/components/site/Container";
import { LogoRail } from "@/components/site/LogoRow";
import { Reveal } from "@/components/site/Reveal";

/**
 * Quiet trust strip: claim, logo rail, caption — deliberately no photograph.
 *
 * This sits directly under the hero image, and any full-width figure here
 * competes with it (a 16:9 figure at container width renders taller than the
 * 21:9 hero). The reference layout puts only a logo rail in this slot for the
 * same reason; the supporting photograph lives in the Solution section instead.
 */
export function SocialProof() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <p className="t-lead mx-auto max-w-[54ch] text-balance text-center">
            Backed by the largest contributor network across Southeast Asia
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <LogoRail className="mt-10" />
        </Reveal>

        <Reveal delay={0.12}>
          <p className="t-small mt-8 text-center">Pipeline-native for the frontier stack</p>
        </Reveal>
      </Container>
    </section>
  );
}
