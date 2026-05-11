"use client";

import { useState, useEffect, useCallback } from "react";
import { ThemeId, applyThemeVariables, getThemeIds, getTheme } from "@/styles/themes";

const THEME_STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME: ThemeId = "vintage";

/**
 * Hook to manage theme state and persistence
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    const initialTheme = savedTheme || DEFAULT_THEME;

    // Check system dark mode preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);

    // Apply theme
    setTheme(initialTheme);
    applyThemeVariables(initialTheme, prefersDark);

    // Listen for system theme changes
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      applyThemeVariables(initialTheme, e.matches);
    };

    darkModeQuery.addEventListener("change", handleDarkModeChange);
    setIsLoading(false);

    return () => {
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    applyThemeVariables(theme, isDarkMode);
  }, [theme, isDarkMode]);

  const switchTheme = useCallback((newTheme: ThemeId) => {
    if (getThemeIds().includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyThemeVariables(newTheme, isDarkMode);
    }
  }, [isDarkMode]);

  return {
    theme,
    isDarkMode,
    isLoading,
    switchTheme,
    availableThemes: getThemeIds(),
    currentThemeName: getTheme(theme).name,
  };
};
