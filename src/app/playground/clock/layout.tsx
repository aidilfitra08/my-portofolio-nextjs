import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clock",
  description: "A fullscreen digital clock",
  manifest: "/custom-manifest/manifest-clock.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Clock",
    "msapplication-TileColor": "#ffffff",
    "msapplication-tap-highlight": "no",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function ClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
