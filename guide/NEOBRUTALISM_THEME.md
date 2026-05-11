# Neobrutalism Theme Implementation Guide

## What is Neobrutalism?

Neobrutalism is a contemporary design movement that revives the principles of brutalism but with a digital, minimalist aesthetic. It emphasizes:

- **Bold typography**: Large, often uppercase text
- **High contrast**: Black and white or very dark/very light color combinations
- **Geometric shapes**: Sharp angles and clean lines
- **Raw materials appearance**: Unfinished look, visible grids
- **Functional design**: Form follows function without unnecessary decoration
- **Interactive feedback**: Visible state changes when hovering or clicking

## Neobrutalism Theme Features

### 1. Visual Characteristics

#### Borders
- **3px solid borders** on all interactive elements
- **High contrast** with background
- **Bold visual hierarchy**

```css
border: 3px solid var(--foreground);
```

#### Typography
- **Bold weights** (font-weight: 900)
- **UPPERCASE text** for headings
- **Increased letter-spacing** for impact
- **Monospace fonts** for technical appearance

```css
h1, h2, h3 {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 3px solid var(--foreground);
}
```

#### Buttons
- **3px solid border**
- **4-6px box shadows** for 3D effect
- **Hover state**: Invert colors, reduce shadow
- **Active state**: Push down effect

```css
button {
  border: 3px solid var(--foreground);
  background: var(--background);
  color: var(--foreground);
  box-shadow: 4px 4px 0px var(--foreground);
  transition: all 0.15s linear;
}

button:hover {
  background: var(--foreground);
  color: var(--background);
  box-shadow: 2px 2px 0px var(--foreground);
  transform: translate(2px, 2px);
}

button:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px var(--foreground);
}
```

#### Cards/Boxes
- **3px border on all sides**
- **6-8px drop shadow** offset to bottom-right
- **Hover effect**: Lift up slightly (negative transform)
- **Padding**: Generous internal spacing

```css
.neo-box {
  border: 3px solid var(--foreground);
  background: var(--background);
  box-shadow: 6px 6px 0px var(--foreground);
  padding: 20px;
  transition: all 0.15s linear;
}

.neo-box:hover {
  box-shadow: 8px 8px 0px var(--foreground);
  transform: translate(-2px, -2px);
}
```

#### Links
- **Underline**: 3px thick
- **Hover state**: Full background invert
- **Bold font-weight**

```css
a {
  color: var(--foreground);
  text-decoration: underline;
  text-decoration-thickness: 3px;
  font-weight: bold;
}

a:hover {
  background: var(--foreground);
  color: var(--background);
  text-decoration: none;
}
```

### 2. Color Scheme

#### Light Mode
- **Background**: Pure white (#ffffff)
- **Foreground**: Pure black (#000000)
- **Accents**: Yellow (#f1c40f), Dark slate (#2c3e50)
- **Minimalist**: Limited color palette

#### Dark Mode
- **Background**: Almost black (#1a1a1a)
- **Foreground**: Pure white (#ffffff)
- **Accents**: Yellow (#f1c40f), Light gray (#ecf0f1)
- **Consistency**: Same contrast ratio as light mode

### 3. Component Styling

#### Input Fields
- **3px solid border**
- **Bold font**
- **Focus state**: Multiple borders with box-shadow

```css
input, textarea, select {
  border: 3px solid var(--foreground);
  padding: 12px;
  font-weight: bold;
}

input:focus {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--background), 0 0 0 6px var(--foreground);
}
```

#### Tables
- **3px borders** on all cells
- **Bold header styling**
- **High contrast** header background

```css
table {
  border: 3px solid var(--foreground);
  border-collapse: collapse;
}

th {
  background: var(--foreground);
  color: var(--background);
  text-transform: uppercase;
  font-weight: bold;
}

th, td {
  border: 3px solid var(--foreground);
  padding: 16px;
}
```

#### Code/Pre
- **2px border**
- **Monospace font**
- **Background**: Paper texture color
- **Bold text**

```css
code, pre {
  background: var(--paper-texture);
  border: 2px solid var(--foreground);
  padding: 12px;
  font-family: "Courier New", monospace;
  font-weight: bold;
}
```

### 4. Animations and Transitions

#### Fast Feedback
- **0.15s linear** transitions for instant feel
- **No ease functions** for brutalist effect
- **Transform-based** movement for performance

```css
transition: all 0.15s linear;

button:hover {
  transform: translate(2px, 2px);
}
```

#### No Fluff
- **No fade-ins**: Direct state changes
- **No rotate animations**: Only translate
- **No blur effects**: Sharp edges only

## Implementation Details

### CSS Variable Organization

```css
[data-theme="neobrutalism"] {
  --background: #ffffff;
  --foreground: #000000;
  --border-color: #000000;
  --border-width: 3px;
  --shadow-color: rgba(0, 0, 0, 0.3);
}
```

### Selector Strategy

All neobrutalism styles use the `[data-theme="neobrutalism"]` attribute selector:

```css
[data-theme="neobrutalism"] button { /* ... */ }
[data-theme="neobrutalism"] .card { /* ... */ }
[data-theme="neobrutalism"] input { /* ... */ }
```

This approach:
- Doesn't conflict with other themes
- Allows easy theme switching
- Maintains specificity
- Supports component library patterns

### Media Query Support

Dark mode support within neobrutalism theme:

```css
[data-theme="neobrutalism"] @media (prefers-color-scheme: dark) {
  --background: #1a1a1a;
  --foreground: #ffffff;
  --border-color: #ffffff;
  --shadow-color: rgba(255, 255, 255, 0.3);
}
```

## Utility Classes

Pre-made neobrutalism utility classes available in globals.css:

### `.neo-box`
- **3px border**
- **Drop shadow effect**
- **Hover lift animation**
- **Standard padding**

### `.neo-badge`
- **3px border**
- **Inverted colors** (black text on white, white on black)
- **UPPERCASE text**
- **Inline-block display**
- **Margin for spacing**

Usage:
```tsx
<div className="neo-box">Content</div>
<span className="neo-badge">Badge</span>
```

## Best Practices for Neobrutalism

### Do's ✓
- Use **bold, high-contrast** colors
- Keep **thick borders** (3px minimum)
- Use **drop shadows** for depth
- Apply **transform effects** on interaction
- Keep **typography bold** and clear
- Use **simple, geometric** shapes
- Maintain **generous spacing**

### Don'ts ✗
- Don't use **soft gradients** or subtle colors
- Don't use **1px borders** (too thin)
- Don't use **rounded corners** excessively
- Don't use **blur or glow effects**
- Don't use **light font-weights**
- Don't use **complex textures** or patterns
- Don't use **animations** (keep it snappy)

## Accessibility Considerations

### Color Contrast
Neobrutalism's high contrast naturally supports accessibility:
- Light mode: Black on white (21:1 contrast)
- Dark mode: White on dark gray (15:1 contrast)
- Both exceed WCAG AAA standards

### Interactive Feedback
- **Visible focus states** with bold borders
- **Clear hover effects** with transform
- **Strong feedback** for all interactions

### Typography
- **Large, bold text** is more readable
- **Increased letter-spacing** improves clarity
- **Monospace fonts** have consistent width

## Performance Optimization

### CSS-Only Styling
- All styling via CSS variables
- No JavaScript required for visual effects
- Minimal reflows/repaints
- GPU-accelerated transforms

### No External Dependencies
- Built-in CSS variables system
- No icon libraries for borders/shapes
- Only uses standard CSS features
- Works in all modern browsers

## Examples

### Neobrutalism Button
```tsx
<button className="px-4 py-2 border-2 border-black bg-white text-black font-bold uppercase hover:bg-black hover:text-white transition-all">
  Click Me
</button>
```

### Neobrutalism Card
```tsx
<div className="border-2 border-black p-4 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
  <h3 className="font-bold text-lg border-b-2 border-black mb-2">
    Card Title
  </h3>
  <p>Card content goes here</p>
</div>
```

### Neobrutalism Badge
```tsx
<span className="inline-block border-2 border-black bg-black text-white px-3 py-1 font-bold text-sm uppercase">
  NEW
</span>
```

## Customization

### Adjusting Border Thickness
Modify `--border-width` in CSS variables:
```css
[data-theme="neobrutalism"] {
  --border-width: 2px; /* Make thinner */
  /* or */
  --border-width: 4px; /* Make thicker */
}
```

### Shadow Intensity
Adjust shadow sizes in component styles:
```css
[data-theme="neobrutalism"] .neo-box {
  box-shadow: 8px 8px 0px var(--foreground); /* Larger shadow */
}
```

### Accent Colors
Add secondary colors while maintaining contrast:
```css
[data-theme="neobrutalism"] {
  --accent-yellow: #f1c40f;
  --accent-slate: #2c3e50;
}

[data-theme="neobrutalism"] .accent-badge {
  background: var(--accent-yellow);
  color: black;
  border: 3px solid black;
}
```

## Migration Guide

### Converting Existing Components

From vintage/standard styling:
```tsx
// Before (generic)
<button className="px-4 py-2 rounded hover:bg-opacity-90">
  Click
</button>

// After (neobrutalism)
<button className="px-4 py-2 border-3 border-black shadow-lg hover:shadow-md transition-transform transform hover:translate-y-1">
  Click
</button>
```

### Using Tailwind with Neobrutalism

```tsx
// Utility-first approach
<button className="
  border-3 border-black
  bg-white text-black
  px-4 py-2
  font-bold uppercase
  shadow-lg
  hover:bg-black hover:text-white
  hover:shadow-md
  transform transition-all
  hover:translate-y-1
">
  Neobrutalist Button
</button>
```

## References

- **Theme Configuration**: `src/styles/themes/neobrutalism.ts`
- **CSS Styles**: `src/app/globals.css` (search for `[data-theme="neobrutalism"]`)
- **Component**: Available via theme system
- **Admin Panel**: Switch under Theme tab in admin dashboard
