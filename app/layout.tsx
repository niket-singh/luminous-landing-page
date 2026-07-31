import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ConsentBanner } from "@/components/ConsentBanner";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adzzatlabs.com";
const OG_IMAGE_PATH = "/og.png";
const SITE_TITLE = "High-Paying Remote AI Training Jobs | Adzzat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description:
    "Expert-curated datasets for complex reasoning and agentic workflows. Pipeline-ready data for Y-Combinator backed labs—RLHF, SFT, agentic traces, and simulation environments. DPDP compliant.",
  keywords: [
    "AI training data",
    "foundation models",
    "RLHF",
    "agentic workflows",
    "ML data",
    "AdzzatLabs",
  ],
  authors: [{ name: "AdzzatLabs" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AdzzatLabs",
    title: SITE_TITLE,
    description:
      "Expert-curated datasets for complex reasoning and agentic workflows. Pipeline-ready data for YC-backed labs—RLHF, SFT, agentic traces, simulation. DPDP compliant.",
    images: [
      {
        url: OG_IMAGE_PATH.startsWith("http") ? OG_IMAGE_PATH : `${SITE_URL}${OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
        alt: "AdzzatLabs - Frontier AI Data",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Expert-curated datasets for complex reasoning and agentic workflows. Pipeline-ready data for YC-backed labs. DPDP compliant.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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

        {/* Apply theme before paint (prevents flash) - defaults to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const theme = saved || "dark";
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  } catch (_) {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AdzzatLabs",
              url: SITE_URL,
              logo: `${SITE_URL}/adzzat-logo.png`,
              description:
                "Expert-curated datasets for complex reasoning and agentic workflows. Pipeline-ready data for frontier AI labs.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased dark overflow-x-hidden`}
      >
        <LenisProvider>
          {children}
          <ConsentBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
