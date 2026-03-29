# Website Design Foundations

This document is the **absolute source of truth** for the `fabianj.com` brand identity, layout rules, and technical architecture. All code changes must align with these tokens and principles.

---

## 1. Visual Identity

- **Style:** Cinematic, Premium, Editorial — "Technical Elegance."
- **Vibe:** Dark Mode by default with a high-contrast architectural "Cream Mode" toggle.
- **Motifs:** Grid lines, film grain, glassmorphism, and subtle teal spotlights.

---

## 2. Design Tokens

### Colors — Dark Mode
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-primary` | `#050505` | Page background |
| `--bg-secondary` | `#0A0A0A` | Surface and panel background |
| `--accent-teal` | `#14B8A6` | Primary action color and spotlights |
| `--accent-violet` | `#8B5CF6` | Secondary "Spatial/XR" accent |
| `--text-main` | `#FAFAFA` | Primary readability |
| `--text-muted` | `#A3A3A3` | Secondary / Metadata text |
| `--border-low` | `rgba(255,255,255,0.08)` | Subtle separators |

### Colors — Light Mode ("Cream")
| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-primary` | `#E0D9CE` | Architectural bone/cream background |
| `--bg-secondary` | `#D4CDC0` | Slightly darker surface |
| `--text-main` | `#000000` | High-contrast readability |
| `--text-muted` | `#2A2A2A` | Very dark grey for secondary text |
| `--border-low` | `rgba(0,0,0,0.25)` | Prominent black borders |
| `--accent-teal` | `#000000` | Black accents replace teal in light mode |

> ⚠️ **No Nuke Orange.** The accent is Teal (`#14B8A6`) in dark mode, and Black in light mode.

### Typography
- **Primary Font:** `Inter` (Sans-serif)
- **Secondary Font:** `JetBrains Mono` (Monospace — for technical labels & code)
- **H1:** `text-5xl md:text-7xl` (fluid, responsive)
- **H2:** `text-3xl md:text-5xl`
- **Body:** `text-lg` / `text-base` — `leading-relaxed`
- **Line Height:** `1.5` body · `1.1` headings
- **Technique:** Use Tailwind responsive size classes (e.g. `text-3xl md:text-5xl`) for fluid scaling. No hardcoded `px` sizes in components.

---

## 3. Fluidity & Layout Rules

### The 8px Grid
All spacing (padding, margin, gap) **MUST** be multiples of 8px.

| px | Tailwind Class |
| :--- | :--- |
| 8px | `p-2`, `gap-2` |
| 16px | `p-4`, `gap-4` |
| 24px | `p-6`, `gap-6` |
| 32px | `p-8`, `gap-8` |
| 64px | `p-16`, `gap-16` |

> Note: Tailwind's base unit is 4px (`p-1 = 4px`). Always use even-numbered scale values (`p-2`, `p-4`, `p-6`...) to stay on the 8px grid.

### Responsive Breakpoints (iPhone / iPad / Desktop)
| Device | Layout | Horizontal Padding |
| :--- | :--- | :--- |
| Mobile (iPhone) | Single column | `px-4` (16px each side) |
| Tablet (iPad) | 2-column grid | `px-8` (32px each side) |
| Desktop | 3-column grid | `max-w-7xl` (1280px), `px-8` |

### Touch Targets
All interactive elements on mobile/tablet must have a minimum hit area of **48px** (`min-h-12 min-w-12`).

### Border Radius
- `rounded-3xl` (`24px`) — Cards and panels.
- `rounded-full` (`9999px`) — Buttons (pills) and nav items.
- `blur-[24px]` — Glass panels.

---

## 4. Structural Rules — "No Div Soup"

### Required Semantic HTML
1. **Root Layout:** Must use `<header>`, `<main>`, and `<footer>` at the root level.
2. **Sections:** Every visual "block" of a page must be a `<section>` tag.
3. **Content Cards:** Any repeating content item (e.g., Bento cards, gallery items) must use `<article>`.
4. **Lists:** Card grids must be wrapped in `<ul>`, each item in `<li>`.
5. **Navigation:** Always `<nav>` containing a `<ul>`.

### Allowed `<div>` Usage
Generic `<div>` tags are **only** acceptable for:
- Decorative elements (glows, ambient backgrounds).
- Flex/Grid wrappers where no semantic alternative exists.
- Animation containers (Framer Motion wrappers).
- Icon container boxes.

---

## 5. Page Directory (Sitemap)

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Home** | Full-viewport Hero + Featured Work + CTA |
| `/gallery` | **Gallery** | Responsive grid of VFX work. 1-col → 2-col → 3-col. |
| `/xr` | **XR / Spatial** | Specialized layout for immersive XR projects |
| `/resume` | **Résumé** | Vertical timeline — studio history & software |
| `/contact` | **Contact** | Social links (LinkedIn, IMDb, Instagram) + email CTA |

---

## 6. Coding Principles

- **Tokens Over Values:** Never hardcode a hex value in a component. Always use a CSS variable (e.g. `var(--accent-teal)`).
- **Semantic First:** Use the most descriptive HTML tag possible before defaulting to a `<div>`.
- **CSS First:** If a layout can be achieved with Flexbox/Grid, do not add extra wrapper divs.
- **Accessibility:** Respect `prefers-reduced-motion`. All interactive elements need `aria-label`.
- **No Hardcoded Colors.** All values must reference a CSS custom property.
