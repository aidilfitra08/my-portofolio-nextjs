import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Token Counter | Playground",
  description:
    "Estimate LLM tokens and cost with a vintage-futuristic, terminal-inspired interface.",
  openGraph: {
    title: "LLM Token Counter | Playground",
    description:
      "Estimate LLM tokens and cost with a vintage-futuristic, terminal-inspired interface.",
    // url: "https://your-domain.com/playground/llm-token-counter",
    siteName: "My Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Token Counter | Playground",
    description:
      "Estimate LLM tokens and cost with a vintage-futuristic, terminal-inspired interface.",
  },
};

export default function TokenCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
