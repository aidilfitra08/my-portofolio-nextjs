import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground | Vintage Futuristic Experiments",
  description:
    "A collection of experimental playgrounds with a minimalist, typewriter, vintage-yet-futuristic aesthetic.",
  openGraph: {
    title: "Playground | Vintage Futuristic Experiments",
    description:
      "Explore experimental tools with a retro-terminal, holographic vibe.",
    url: "https://your-domain.com/playground",
    siteName: "aidildev Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playground | Vintage Futuristic Experiments",
    description:
      "Explore experimental tools with a retro-terminal, holographic vibe.",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
