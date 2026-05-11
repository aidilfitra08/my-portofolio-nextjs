/**
 * Theme Configuration Types
 * Defines the structure for all theme variables
 */

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBg: string;
  hover: string;
}

export interface ThemeVars {
  background: string;
  foreground: string;
  accentGreen: string;
  accentAmber: string;
  accentCyan: string;
  paperTexture: string;
  inkBlack: string;
  terminalGreen: string;
  // Additional theme-specific variables
  [key: string]: string;
}

export interface Theme {
  name: string;
  id: string;
  description: string;
  lightMode: ThemeVars;
  darkMode: ThemeVars;
  cssVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export type ThemeId = "vintage" | "neobrutalism";
