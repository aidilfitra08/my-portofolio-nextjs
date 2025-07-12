"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    // Function to update favicon based on current theme
    const updateFavicon = () => {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Remove ALL existing favicon links to force refresh
      const existingIcons = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      );
      existingIcons.forEach((icon) => icon.remove());

      // Add cache-busting timestamp
      const timestamp = new Date().getTime();
      const faviconPath = prefersDark
        ? "/favicon-dark.ico"
        : "/favicon-light.ico";
      const faviconUrl = `${faviconPath}?v=${timestamp}`;

      // Create multiple favicon link elements for better browser support
      const faviconTypes = [
        { rel: "icon", type: "image/x-icon" },
        { rel: "shortcut icon", type: "image/x-icon" },
        { rel: "icon", type: "image/vnd.microsoft.icon" }, // Edge specific
        { rel: "apple-touch-icon", type: "image/x-icon" }, // For better mobile support
      ];

      faviconTypes.forEach(({ rel, type }) => {
        const link = document.createElement("link");
        link.rel = rel;
        link.type = type;
        link.href = faviconUrl;
        link.setAttribute("sizes", "any");
        document.head.appendChild(link);
      });

      // Force Edge to refresh by manipulating the href
      setTimeout(() => {
        const icons = document.querySelectorAll('link[rel*="icon"]');
        icons.forEach((icon) => {
          const currentHref = (icon as HTMLLinkElement).href;
          (icon as HTMLLinkElement).href = "";
          setTimeout(() => {
            (icon as HTMLLinkElement).href = currentHref;
          }, 10);
        });
      }, 100);

      console.log(
        `Favicon updated to: ${prefersDark ? "dark" : "light"} theme`
      );
    };

    // Update favicon on initial load with a slight delay
    setTimeout(updateFavicon, 100);

    // Create media query listener for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Listen for theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      console.log("Theme changed to:", e.matches ? "dark" : "light");
      updateFavicon();
    };

    // Add event listener (use both old and new methods for compatibility)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleThemeChange);
    }

    // Also listen for visibility changes (when tab becomes active)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeout(updateFavicon, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
