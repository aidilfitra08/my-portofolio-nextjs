import { Theme, ThemeId } from "./types";
import { vintageTheme } from "./vintage";
import { neobrutalisimTheme } from "./neobrutalism";

/**
 * All available themes
 */
export const THEMES: Record<ThemeId, Theme> = {
  vintage: vintageTheme,
  neobrutalism: neobrutalisimTheme,
};

/**
 * Get theme by ID
 */
export const getTheme = (themeId: ThemeId): Theme => {
  return THEMES[themeId] || THEMES.vintage;
};

/**
 * Get all theme IDs
 */
export const getThemeIds = (): ThemeId[] => {
  return Object.keys(THEMES) as ThemeId[];
};

/**
 * Get all themes
 */
export const getAllThemes = (): Theme[] => {
  return Object.values(THEMES);
};

/**
 * Apply theme CSS variables to document
 */
export const applyThemeVariables = (
  themeId: ThemeId,
  isDarkMode: boolean = false
) => {
  const theme = getTheme(themeId);
  const variables = isDarkMode ? theme.cssVariables.dark : theme.cssVariables.light;

  // Apply variables to root element
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
};

export * from "./types";
export { vintageTheme } from "./vintage";
export { neobrutalisimTheme } from "./neobrutalism";
