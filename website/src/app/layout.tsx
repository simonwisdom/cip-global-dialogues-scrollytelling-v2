import "./css/global.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { siteOrigin } from "~/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { CustomCursor } from "~/app/components/custom-cursor";
import { Root, RegisterGsapPlugins } from "~/lib/scrollytelling-client";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollytellingRegistrar } from '~/lib/scrollytelling-registrar';

const jetBrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  fallback: ["var(--font-system)"],
});

const basementGrotesque = localFont({
  src: [
    { path: "./fonts/BasementGrotesque-Regular.woff2", weight: "400" },
    { path: "./fonts/BasementGrotesque-BlackExpanded.woff2", weight: "800" },
    {
      path: "./fonts/BasementGrotesqueDisplay-UltraBlackExtraExpanded.woff2",
      weight: "900",
    },
  ],
  fallback: ["var(--font-system)"],
  preload: true,
});

// OPTI font configuration
const optiFont = localFont({
  src: [
    { path: "./fonts/OPTIOptionMedium.otf", weight: "500" },
    { path: "./fonts/OPTIOptionSemiBold.otf", weight: "600" },
  ],
  fallback: ["var(--font-system)"],
  preload: true,
  variable: "--font-opti",
});

// AktivGrotesk font configuration
const aktivGrotesk = localFont({
  src: [
    { path: "./fonts/AktivGrotesk-Regular.ttf", weight: "400" },
    { path: "./fonts/AktivGrotesk-Medium.ttf", weight: "500" },
    { path: "./fonts/AktivGrotesk-Bold.ttf", weight: "700" },
    { path: "./fonts/AktivGrotesk-Black.ttf", weight: "900" },
  ],
  fallback: ["var(--font-system)"],
  preload: true,
  variable: "--font-aktiv-grotesk",
});



export const metadata: Metadata = {
  title: "Are you there?",
  description: "Consciousness and connection in the age of AI",
  viewport: {
    height: "device-height",
    initialScale: 1,
    width: "device-width",
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    creator: "@cip_org",
    description: "Consciousness and connection in the age of AI",
    images: [{ width: 1200, height: 630, url: `${siteOrigin}/images/header.webp` }],
    site: "@cip_org",
    title: "Are you there?",
  },
  openGraph: {
    description: "Consciousness and connection in the age of AI",
    images: [{ width: 1200, height: 630, url: `${siteOrigin}/images/header.webp` }],
    locale: "en-US",
    siteName: "Collective Intelligence Project",
    title: "Are you there?",
    type: "website",
    url: siteOrigin,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${optiFont.variable} ${aktivGrotesk.variable}`}
      style={{
        ["--font-basement-grotesque" as string]: `${basementGrotesque.style.fontFamily}, var(--font-system), sans-serif`,
        ["--font-jetbrains-mono" as string]: `${jetBrainsMono.style.fontFamily}, var(--font-system), sans-serif`,
        ["--font-opti" as string]: `${optiFont.style.fontFamily}, var(--font-system), sans-serif`,
        ["--font-aktiv-grotesk" as string]: `${aktivGrotesk.style.fontFamily}, var(--font-system), sans-serif`,
      }}
    >
      <ScrollytellingRegistrar />
      <body>
        <CustomCursor />
        {children}
      </body>

      <Analytics />
    </html>
  );
}
