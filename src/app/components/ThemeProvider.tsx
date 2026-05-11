"use client";

import { useEffect, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

/**
 * Theme Provider Component
 * Initializes theme and applies data-theme attribute to root element
 */
export default function ThemeProvider({
  children,
  defaultTheme = "vintage",
}: ThemeProviderProps) {
  useEffect(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem("portfolio-theme") || defaultTheme;

    // Apply theme to document root
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-theme", savedTheme);

      // Also set in localStorage if not already set
      if (!localStorage.getItem("portfolio-theme")) {
        localStorage.setItem("portfolio-theme", defaultTheme);
      }
    }
  }, [defaultTheme]);

  return <>{children}</>;
}
