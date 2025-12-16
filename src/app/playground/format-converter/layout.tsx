import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Format Converter | Playground",
  description:
    "Convert between CSV, JSON, YAML, XML, TSV, and Toon with a vintage-futuristic, terminal-inspired interface.",
  openGraph: {
    title: "Format Converter | Playground",
    description:
      "Convert between CSV, JSON, YAML, XML, TSV, and Toon with a vintage-futuristic, terminal-inspired interface.",
    // url: "https://your-domain.com/playground/format-converter",
    siteName: "My Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Format Converter | Playground",
    description:
      "Convert between CSV, JSON, YAML, XML, TSV, and Toon with a vintage-futuristic, terminal-inspired interface.",
  },
};

export default function FormatConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
