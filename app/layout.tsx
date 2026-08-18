import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { ConsentBanner } from "@/components/ConsentBanner";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adzzatlabs.com";
const OG_IMAGE_PATH = "/og.png";
const SITE_TITLE = "Expert Evaluation for Reliable AI — Adzzat Labs";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    "Adzzat Labs is an applied research lab curating evaluation and routing solutions for frontier AI. We work with AI labs and enterprises to evaluate, improve and deploy AI models more reliably. Powered by Southeast Asia's largest expert contributor network.",
  keywords: [
    "AI evaluation",
    "intelligent routing",
    "foundation models",
    "RLHF",
    "model reliability",
    "Adzzat Labs",
  ],
  authors: [{ name: "Adzzat Labs" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Adzzat Labs",
    title: SITE_TITLE,
    description:
      "Applied research lab curating evaluation and routing solutions for frontier AI. Powered by Southeast Asia's largest expert contributor network.",
    images: [
      {
        url: OG_IMAGE_PATH.startsWith("http") ? OG_IMAGE_PATH : `${SITE_URL}${OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
        alt: "Adzzat Labs — Expert evaluation for reliable AI",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Evaluation and routing infrastructure for reliable AI, powered by Southeast Asia's largest expert contributor network.",
    images: [OG_IMAGE_PATH.startsWith("http") ? OG_IMAGE_PATH : `${SITE_URL}${OG_IMAGE_PATH}`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

/*
  Runs before first paint so the stored theme never flashes. Light is the
  default; an explicit stored choice always wins over the OS preference.
*/
const THEME_BOOTSTRAP = `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : system;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (_) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      The font variables must live on <html>, not <body>: the theme's
      --font-serif/--font-sans stacks are declared on :root and reference
      --font-newsreader etc. A custom property is substituted on the element
      that declares it, so defining the font vars lower down leaves those
      stacks invalid and every heading silently falls back to the body font.
    */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* Favicons: light-mode gets dark/blue icon, dark-mode gets white icon */}
        <link rel="icon" href="/favicon-light.ico" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-light-16x16.png" sizes="16x16" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-light-32x32.png" sizes="32x32" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.ico" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" media="(prefers-color-scheme: dark)" />

        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Adzzat Labs",
              url: SITE_URL,
              logo: `${SITE_URL}/adzzat-logo.png`,
              description:
                "Applied research lab curating evaluation and routing solutions for frontier AI, powered by Southeast Asia's largest expert contributor network.",
              sameAs: ["https://www.linkedin.com/company/adzzatlabs/"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@adzzat.com",
                contactType: "sales",
              },
            }),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <LenisProvider>
          {children}
          <ConsentBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
