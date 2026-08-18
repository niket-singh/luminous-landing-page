import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/Container";

export interface LegalClause {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  clauses: readonly LegalClause[];
}

/** Shared shell for /privacy and /terms — narrow measure, numbered clauses. */
export function LegalPage({ eyebrow, title, intro, clauses }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-20 sm:pt-28 sm:pb-28">
          <Container width="text">
            <p className="t-eyebrow mb-4">{eyebrow}</p>
            <h1 className="t-h2">{title}</h1>
            <p className="t-body mt-6">{intro}</p>

            <ol className="mt-14">
              {clauses.map((clause, index) => (
                <li key={clause.heading} className="border-t border-rule py-8">
                  <div className="flex gap-4">
                    <span className="t-meta shrink-0 pt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-[17px] font-semibold leading-snug text-ink">
                        {clause.heading}
                      </h2>
                      <div className="prose-block mt-3">{clause.body}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
