# Theme System Documentation

## Overview

The portfolio website now features a comprehensive theme system that allows dynamic switching between different design themes. The system is built to be modular, scalable, and easy to maintain.

## Current Themes

### 1. **Vintage Theme** (Default)
- **ID**: `vintage`
- **Style**: Classic retro aesthetic with vintage colors and typewriter effect
- **Colors**:
  - Light Mode: Cream background (#f5f1e8) with dark text (#2a2a2a)
  - Dark Mode: Dark background (#0d0d0d) with light text (#e0e0e0)
- **Accents**: Green (#4caf50), Amber (#ffb000), Cyan (#00d9ff)
- **Features**:
  - CRT screen flicker effect
  - Paper-like cards with subtle textures
  - Terminal-style glow effects
  - Scanline patterns

### 2. **Neobrutalism Theme** (New)
- **ID**: `neobrutalism`
- **Style**: Bold, raw aesthetic with high contrast and geometric shapes
- **Colors**:
  - Light Mode: White background (#ffffff) with black text (#000000)
  - Dark Mode: Dark background (#1a1a1a) with white text (#ffffff)
- **Accents**: Bold black borders, yellow highlights (#f1c40f), dark slate (#2c3e50)
- **Features**:
  - Thick 3px borders on all elements
  - Drop shadow effects on cards and buttons
  - Bold uppercase typography
  - Interactive button feedback with transform effects
  - Minimal background patterns (no textures)

## Folder Structure

```
src/
├── styles/
│   └── themes/
│       ├── index.ts              # Main export and utilities
│       ├── types.ts              # TypeScript type definitions
│       ├── vintage.ts            # Vintage theme configuration
│       └── neobrutalism.ts       # Neobrutalism theme configuration
├── app/
│   ├── globals.css               # Theme-specific CSS variables and styles
│   ├── components/
│   │   ├── ThemeProvider.tsx     # Theme initialization component
│   │   ├── ThemeSwitcher.tsx     # Theme switcher UI component
│   │   └── ...other components
│   ├── hooks/
│   │   └── useTheme.ts           # Theme management hook
│   ├── admin/
│   │   └── dashboard/page.tsx    # Admin dashboard with theme tab
│   └── layout.tsx                # Root layout with ThemeProvider
└── public/
    └── data/
        └── portfolio.json        # Portfolio data with theme config
```

## How It Works

### 1. **Theme Configuration** (`src/styles/themes/`)

Each theme defines:
- **Theme Metadata**: Name, ID, description
- **CSS Variables**: For light and dark modes
- **Theme Type**: Identifies the theme

Example structure:
```typescript
interface Theme {
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
```

### 2. **Theme Application** (Runtime)

1. **Initialization**: `ThemeProvider` component loads saved theme from localStorage
2. **Application**: CSS variables applied to document root via `applyThemeVariables()`
3. **Data Attribute**: `data-theme` attribute set on HTML element for CSS selectors
4. **Persistence**: Theme choice saved to localStorage and backend via `/api/admin/save-data`

### 3. **CSS Variable System** (`src/app/globals.css`)

All themes use CSS variables for dynamic styling:
```css
:root {
  --background: var(--theme-specific-value);
  --foreground: var(--theme-specific-value);
  --border-color: var(--theme-specific-value);
  --border-width: var(--theme-specific-value);
  /* ... more variables */
}
```

### 4. **Theme-Specific Styles**

Styles are applied using CSS attribute selector:
```css
[data-theme="neobrutalism"] .button {
  border: 3px solid var(--foreground);
  box-shadow: 6px 6px 0px var(--foreground);
}

[data-theme="vintage"] .button {
  border: 1px solid var(--foreground);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Adding a New Theme

### Step 1: Create Theme File
Create a new file `src/styles/themes/mytheme.ts`:

```typescript
import { Theme } from "./types";

export const myTheme: Theme = {
  name: "My Theme",
  id: "mytheme",
  description: "Description of my theme",
  lightMode: {
    background: "#your-light-bg",
    foreground: "#your-light-fg",
    // ... other variables
  },
  darkMode: {
    background: "#your-dark-bg",
    foreground: "#your-dark-fg",
    // ... other variables
  },
  cssVariables: {
    light: { /* ... */ },
    dark: { /* ... */ },
  },
};
```

### Step 2: Export Theme
Update `src/styles/themes/index.ts`:

```typescript
import { myTheme } from "./mytheme";

export const THEMES: Record<ThemeId, Theme> = {
  vintage: vintageTheme,
  neobrutalism: neobrutalisimTheme,
  mytheme: myTheme,  // Add your theme
};
```

### Step 3: Update Type Definition
Update `src/styles/themes/types.ts`:

```typescript
export type ThemeId = "vintage" | "neobrutalism" | "mytheme";  // Add your theme
```

### Step 4: Add CSS Styles
Update `src/app/globals.css` to add theme-specific styles:

```css
[data-theme="mytheme"] {
  --background: /* your colors */;
  --foreground: /* your colors */;
  /* ... */
}

[data-theme="mytheme"] .vintage-card {
  /* Your card styles */
}

/* ... other component styles */
```

### Step 5: Update Portfolio Configuration
Update `public/data/portfolio.json`:

```json
{
  "theme": {
    "current": "vintage",
    "available": ["vintage", "neobrutalism", "mytheme"],
    "enableThemeSwitcher": true
  }
}
```

## Theme Switching

### From Admin Panel
1. Navigate to admin dashboard
2. Click on "Theme" tab in sidebar
3. Select preferred theme
4. Changes apply immediately
5. Preference is saved to portfolio.json

### From User Settings
Theme switcher component can be used in any page:

```tsx
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

export default function MyComponent() {
  return (
    <ThemeSwitcher
      currentTheme="vintage"
      onThemeChange={(theme) => console.log("Theme changed to:", theme)}
      compact={true}
    />
  );
}
```

## Available CSS Variables

### Common Variables
- `--background`: Page background color
- `--foreground`: Text color
- `--border-color`: Border color
- `--border-width`: Border thickness
- `--shadow-color`: Shadow color
- `--paper-texture`: Card background
- `--ink-black`: Black color
- `--terminal-green`: Accent green

### Theme-Specific Variables
- `--vintage-green`: Green accent
- `--vintage-amber`: Amber accent
- `--vintage-cyan`: Cyan accent
- `--theme-type`: Current theme identifier

## Dark Mode Support

All themes automatically support both light and dark modes:

```tsx
// In CSS
@media (prefers-color-scheme: dark) {
  :root {
    --background: /* dark mode colors */;
    --foreground: /* dark mode colors */;
  }
}

// In TypeScript
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
```

## Best Practices for Theme Development

1. **Consistency**: Ensure all CSS variables are defined in both light and dark modes
2. **Accessibility**: Maintain sufficient color contrast (WCAG AA standard: 4.5:1)
3. **Performance**: Use CSS variables instead of computed styles
4. **Naming**: Follow naming convention: `--[category]-[property]`
5. **Documentation**: Add comments explaining theme-specific styling
6. **Testing**: Test theme switching in both light and dark modes
7. **File Organization**: Keep theme files modular and focused

## Maintenance Guide

### Updating Existing Themes

1. **Modify Theme Variables**: Edit `src/styles/themes/[theme-name].ts`
2. **Update CSS Styles**: Modify relevant styles in `src/app/globals.css`
3. **Test Changes**: Switch between themes to verify consistency
4. **Update Documentation**: Reflect changes in this guide if needed

### Removing a Theme

1. Delete theme file from `src/styles/themes/`
2. Remove from `THEMES` export in `src/styles/themes/index.ts`
3. Update `ThemeId` type in `src/styles/themes/types.ts`
4. Remove from `available` array in `public/data/portfolio.json`
5. Remove CSS variable definitions from `src/app/globals.css`

### Theme Performance

- CSS variables are applied to document root for optimal performance
- Theme switching uses CSS attribute selectors for specificity
- No JavaScript required for theme styling after initialization
- localStorage caches user preference for instant loading

## Troubleshooting

### Theme not applying
- Check browser console for errors
- Verify `data-theme` attribute on HTML element
- Ensure CSS variables are defined in globals.css

### CSS variables not working
- Verify variable names match between theme file and CSS
- Check for typos in CSS variable names
- Ensure theme is properly exported in index.ts

### Dark mode not working
- Check system dark mode preference
- Verify @media (prefers-color-scheme: dark) blocks
- Test in incognito mode to bypass cached preferences

## API Integration

### Save Theme Preference
When a theme is selected, the preference is saved via:

```
POST /api/admin/save-data
Content-Type: application/json
Authorization: Bearer {token}

{
  "updateTheme": true,
  "theme": "neobrutalism"
}
```

The backend updates the portfolio.json file with the new theme selection.

## Migration from Old Styling

If migrating existing components:

1. Replace hardcoded colors with CSS variable references
2. Update component classes to work with theme attribute selector
3. Test in both old and new themes
4. Remove old theme-specific classes

Example migration:
```tsx
// Before
<div style={{ backgroundColor: "#f5f1e8", color: "#2a2a2a" }}>

// After
<div style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
```

## Resources

- **Theme Configuration**: `src/styles/themes/`
- **CSS Styles**: `src/app/globals.css`
- **Theme Hook**: `src/app/hooks/useTheme.ts`
- **Components**: `src/app/components/ThemeSwitcher.tsx`, `ThemeProvider.tsx`
- **Admin Control**: `src/app/admin/dashboard/page.tsx`
