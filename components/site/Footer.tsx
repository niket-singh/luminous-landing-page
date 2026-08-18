import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Container } from "@/components/site/Container";
import { CONTACT_EMAIL, FOOTER_COLUMNS, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-rule py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
          <div>
            <Logo />
            <p className="t-small mt-4 max-w-[30ch]">
              Expert evaluation and routing infrastructure for reliable AI.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="t-meta mt-4 inline-block transition-opacity duration-150 hover:opacity-60"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-[13px] font-semibold text-ink">{column.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="t-meta mt-16">
          {SITE_NAME} &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external }: FooterLinkProps) {
  const className =
    "text-[13px] font-medium text-ink/60 transition-opacity duration-150 hover:opacity-60";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
