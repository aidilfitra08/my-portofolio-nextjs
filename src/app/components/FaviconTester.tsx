"use client";

import { useState } from "react";

export default function FaviconTester() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const forceFaviconUpdate = (theme: "light" | "dark") => {
    // Remove all existing favicons
    const existingIcons = document.querySelectorAll(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
    );
    existingIcons.forEach((icon) => icon.remove());

    // Add cache-busting timestamp
    const timestamp = new Date().getTime();
    const faviconPath =
      theme === "dark" ? "/favicon-dark.ico" : "/favicon-light.ico";
    const faviconUrl = `${faviconPath}?v=${timestamp}`;

    // Create new favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = faviconUrl;
    link.sizes = "any";
    document.head.appendChild(link);

    setCurrentTheme(theme);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Favicon Theme Tester
      </h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Current favicon:{" "}
          <span className="font-mono font-bold">{currentTheme}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => forceFaviconUpdate("light")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Force Light
          </button>

          <button
            onClick={() => forceFaviconUpdate("dark")}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            Force Dark
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>• Check browser tab for favicon changes</p>
          <p>• Try switching system theme</p>
          <p>• Edge may require page refresh</p>
        </div>
      </div>
    </div>
  );
}
