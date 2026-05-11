import { Theme } from "./types";

/**
 * Vintage Theme
 * Classic retro theme with vintage colors and typewriter aesthetic
 */

export const vintageTheme: Theme = {
  name: "Vintage",
  id: "vintage",
  description: "Classic retro theme with vintage colors and typewriter aesthetic",
  lightMode: {
    background: "#f5f1e8",
    foreground: "#2a2a2a",
    accentGreen: "#4caf50",
    accentAmber: "#ffb000",
    accentCyan: "#00d9ff",
    paperTexture: "#faf8f3",
    inkBlack: "#1a1a1a",
    terminalGreen: "#33ff33",
  },
  darkMode: {
    background: "#0d0d0d",
    foreground: "#e0e0e0",
    accentGreen: "#00ff41",
    accentAmber: "#ffb000",
    accentCyan: "#00d9ff",
    paperTexture: "#1a1a1a",
    inkBlack: "#1a1a1a",
    terminalGreen: "#00ff41",
  },
  cssVariables: {
    light: {
      "--background": "#f5f1e8",
      "--foreground": "#2a2a2a",
      "--vintage-green": "#4caf50",
      "--vintage-amber": "#ffb000",
      "--vintage-cyan": "#00d9ff",
      "--paper-texture": "#faf8f3",
      "--ink-black": "#1a1a1a",
      "--terminal-green": "#33ff33",
      "--color-background": "#f5f1e8",
      "--color-foreground": "#2a2a2a",
      "--color-accent-green": "#4caf50",
      "--color-accent-amber": "#ffb000",
      "--color-accent-cyan": "#00d9ff",
    },
    dark: {
      "--background": "#0d0d0d",
      "--foreground": "#e0e0e0",
      "--vintage-green": "#00ff41",
      "--vintage-amber": "#ffb000",
      "--vintage-cyan": "#00d9ff",
      "--paper-texture": "#1a1a1a",
      "--ink-black": "#1a1a1a",
      "--terminal-green": "#00ff41",
      "--color-background": "#0d0d0d",
      "--color-foreground": "#e0e0e0",
      "--color-accent-green": "#00ff41",
      "--color-accent-amber": "#ffb000",
      "--color-accent-cyan": "#00d9ff",
    },
  },
};
