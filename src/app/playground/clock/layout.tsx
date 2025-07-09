import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fullscreen Clock",
  description: "A fullscreen digital clock",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: "#000000",
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Clock",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
  },
};

export default function ClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
