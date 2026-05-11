import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "simplebar-react/dist/simplebar.min.css";
// import DynamicFavicon from "./components/DynamicFavicon";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ThemeProvider from "./components/ThemeProvider";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      {/* <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&display=swap"
          rel="preconnect"
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
      </head> */}
      <body
        className={`${geistSans.variable} font-mono antialiased dark:bg-neutral-900 bg-neutral-100`}
      >
        <ThemeProvider>
          {/* <DynamicFavicon /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  // 🟩 Basic SEO
  title: "AidilDev", // Can be string or { default, template }
  description: "Aidil Personal Portfolio – Full Stack Developer",

  // 🟦 Open Graph (for social sharing: Facebook, LinkedIn)
  openGraph: {
    title: "AidilDev",
    description: "Aidil Personal Portfolio – Full Stack Developer",
    url: "https://aidildev.site",
    siteName: "Aidil Fitra Portfolio",
    // images: [
    //   {
    //     url: "https://yourdomain.com/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Aidil Fitra",
    //   },
    // ],
    locale: "en-US",
    type: "website",
  },

  // 🟪 Twitter Card Metadata
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Aidil Fitra – Full Stack Dev",
  //   description: "Check out my personal portfolio!",
  //   site: "@yourTwitterHandle",
  //   creator: "@yourTwitterHandle",
  //   images: ["https://yourdomain.com/twitter-image.png"],
  // },

  // 🟥 Icons (for favicon, app icon, etc.)
  icons: [
    {
      url: "/favicon-dynamic.svg",
      type: "image/svg+xml",
      sizes: "any",
    },
    {
      url: "/favicon-light.ico",
      type: "image/x-icon",
      media: "(prefers-color-scheme: light)",
      sizes: "any",
    },
    {
      url: "/favicon-dark.ico",
      type: "image/x-icon",
      media: "(prefers-color-scheme: dark)",
      sizes: "any",
    },
    {
      url: "/favicon.ico",
      type: "image/x-icon",
      sizes: "any",
    },
  ],

  // 🟧 App Info
  generator: "Next.js",
  applicationName: "Aidil Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Aidil Fitra",
    "Full Stack Developer",
    "Portfolio",
    "Web Developer",
    "Mobile Developer",
    "Software Engineer",
    "AidilDev",
    "Aidil Fitra Portfolio",
  ],

  // 🟫 Robots / crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // 🟦 Alternates (for language support, hreflang)
  // alternates: {
  //   canonical: "https://aidildev.site",
  //   languages: {
  //     "x-default": "/",
  //     "en-US": "/en",
  //     "id-ID": "/id",
  //   },
  // },

  category: "technology",

  // 🎨 Theme color
};

// ✅ Required separate export
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};
