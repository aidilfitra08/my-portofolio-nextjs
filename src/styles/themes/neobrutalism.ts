import { Theme } from "./types";

/**
 * Neobrutalism Theme
 * Raw, bold aesthetic with high contrast and geometric shapes
 * Inspired by the brutalism design movement with modern simplicity
 */

export const neobrutalisimTheme: Theme = {
  name: "Neobrutalism",
  id: "neobrutalism",
  description: "Raw, bold aesthetic with high contrast and geometric shapes inspired by brutalism",
  lightMode: {
    background: "#ffffff",
    foreground: "#000000",
    accentGreen: "#000000",
    accentAmber: "#f1c40f",
    accentCyan: "#2c3e50",
    paperTexture: "#f5f5f5",
    inkBlack: "#000000",
    terminalGreen: "#000000",
  },
  darkMode: {
    background: "#1a1a1a",
    foreground: "#ffffff",
    accentGreen: "#ffffff",
    accentAmber: "#f1c40f",
    accentCyan: "#ecf0f1",
    paperTexture: "#0d0d0d",
    inkBlack: "#ffffff",
    terminalGreen: "#ffffff",
  },
  cssVariables: {
    light: {
      "--background": "#ffffff",
      "--foreground": "#000000",
      "--vintage-green": "#000000",
      "--vintage-amber": "#f1c40f",
      "--vintage-cyan": "#2c3e50",
      "--paper-texture": "#f5f5f5",
      "--ink-black": "#000000",
      "--terminal-green": "#000000",
      "--color-background": "#ffffff",
      "--color-foreground": "#000000",
      "--color-accent-green": "#000000",
      "--color-accent-amber": "#f1c40f",
      "--color-accent-cyan": "#2c3e50",
      "--border-color": "#000000",
      "--border-width": "3px",
      "--shadow-color": "rgba(0, 0, 0, 0.3)",
    },
    dark: {
      "--background": "#1a1a1a",
      "--foreground": "#ffffff",
      "--vintage-green": "#ffffff",
      "--vintage-amber": "#f1c40f",
      "--vintage-cyan": "#ecf0f1",
      "--paper-texture": "#0d0d0d",
      "--ink-black": "#ffffff",
      "--terminal-green": "#ffffff",
      "--color-background": "#1a1a1a",
      "--color-foreground": "#ffffff",
      "--color-accent-green": "#ffffff",
      "--color-accent-amber": "#f1c40f",
      "--color-accent-cyan": "#ecf0f1",
      "--border-color": "#ffffff",
      "--border-width": "3px",
      "--shadow-color": "rgba(255, 255, 255, 0.3)",
    },
  },
};
