import { Container, Section } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Heading";
import { PostCard } from "@/components/site/Cards";
import { TextLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { FEATURED_POSTS } from "@/lib/content";

export function Research() {
  return (
    <Section id="research" tone="alt">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionHeading>Research</SectionHeading>
              <p className="t-body mt-6">
                We start from the failure, not the feature. Which tasks does a model quietly get
                wrong once a specialist inspects the output, and why does that pattern survive
                fine-tuning? Every domain breaks differently, so we study them separately.
              </p>
            </div>
            <TextLink href="/research">More research</TextLink>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {FEATURED_POSTS.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.05}>
              <PostCard {...post} imageLabel="Post image" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
