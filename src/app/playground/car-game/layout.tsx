import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Car Game | Playground",
  description:
    "Drive a 3D car through an endless road in this interactive WebGL game built with Three.js. Features realistic physics and smooth controls.",
  keywords: [
    "3D car game",
    "Three.js game",
    "WebGL racing",
    "interactive 3D",
    "browser game",
    "driving simulator",
  ],
  openGraph: {
    title: "3D Car Game | Playground",
    description:
      "Drive a 3D car through an endless road. Interactive WebGL game with realistic physics.",
    url: "https://your-domain.com/playground/car-game",
    siteName: "My Playground",
    type: "website",
    images: [
      {
        url: "/og-car-game.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "3D Car Game Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Car Game | Playground",
    description:
      "Drive a 3D car through an endless road. Interactive WebGL game with realistic physics.",
    images: ["/og-car-game.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CarGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
