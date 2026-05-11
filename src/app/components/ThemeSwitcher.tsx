"use client";

import { useEffect, useState } from "react";
import { ThemeId, getThemeIds, getTheme } from "@/styles/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

interface ThemeSwitcherProps {
  currentTheme?: ThemeId;
  onThemeChange?: (theme: ThemeId) => void;
  showLabel?: boolean;
  compact?: boolean;
}

/**
 * Theme Switcher Component
 * Allows users to switch between available themes
 */
export default function ThemeSwitcher({
  currentTheme = "vintage",
  onThemeChange,
  showLabel = true,
  compact = false,
}: ThemeSwitcherProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(currentTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as ThemeId;
    setSelectedTheme(newTheme);

    // Apply theme to document
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-theme", newTheme);
    }

    // Call callback if provided
    onThemeChange?.(newTheme);

    // Persist to localStorage
    localStorage.setItem("portfolio-theme", newTheme);

    // Save to backend
    saveThemePreference(newTheme);
  };

  const saveThemePreference = async (theme: ThemeId) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return; // Only save if authenticated

      await fetch("/api/admin/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          updateTheme: true,
          theme: theme,
        }),
      });
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  const themes = getThemeIds();
  const themeList = themes.map((id) => ({
    id,
    ...getTheme(id),
  }));

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {showLabel && (
          <label htmlFor="theme-select" className="font-bold text-sm">
            <FontAwesomeIcon icon={faPalette} className="mr-2" />
            Theme:
          </label>
        )}
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={handleThemeChange}
          className="px-3 py-2 border-2 border-current rounded hover:bg-current hover:text-current transition-colors"
        >
          {themeList.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="w-full p-6 border-2 border-current rounded neo-box">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faPalette} />
        Theme Preferences
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {themeList.map((theme) => (
          <label
            key={theme.id}
            className="flex items-center gap-3 p-4 border-2 border-current rounded cursor-pointer hover:bg-current hover:text-opacity-20 transition-all"
          >
            <input
              type="radio"
              name="theme"
              value={theme.id}
              checked={selectedTheme === theme.id}
              onChange={handleThemeChange}
              className="w-4 h-4 cursor-pointer"
            />
            <div className="flex-1">
              <div className="font-bold text-base">{theme.name}</div>
              <div className="text-sm opacity-75">{theme.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
