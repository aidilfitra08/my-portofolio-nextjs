import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Clock | Playground",
  description: "A fullscreen digital clock with vintage-futuristic aesthetic",
  manifest: "/custom-manifest/manifest-clock.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Clock",
    "msapplication-TileColor": "#00ff41",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function ClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
