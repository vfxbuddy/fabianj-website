# Migration Plan: fabianj.com → Next.js 15

## Brand Identity Analysis

### Who Is Fabian Jimenez?
**VFX Compositing Supervisor & XR Spatial Designer** with 12+ years of industry credits spanning Marvel blockbusters to CW tentpole series. Currently open for new opportunities.

### Tone & Voice
- **Confident but approachable** — professional language that conveys authority without being corporate
- **Tagline:** *"Transforming VFX with Creative Leadership!"*
- **CTA style:** Collaborative ("Let's work together!", "Partner with me")
- **Credential-driven** — lets the work (Avengers, Dr. Strange, Supergirl) speak for itself

### Current Visual Style
- **Dark charcoal backgrounds** (#222) with white text — cinematic, premium feel
- **Accent color:** Vibrant teal/turquoise (~#4fc3a1) used for section backgrounds and highlights
- **Full-bleed video hero** on homepage — immediately showcases VFX quality
- **Typography:** Clean uppercase sans-serif (Montserrat-like), bold section headers
- **Layout:** Centered single-column, video-centric, minimal chrome
- **Vimeo/YouTube embeds** for showreels — key content delivery mechanism

### Core Message
"I am a senior VFX leader who delivers blockbuster-quality compositing on tight schedules, and I'm expanding into immersive XR experiences."

---

## New Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG, image optimization, modern React |
| **Styling** | Tailwind CSS v4 | Rapid dark-mode theming, utility-first |
| **Animations** | Framer Motion | Cinematic page transitions, scroll-driven VFX |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Utilities** | clsx | Conditional className management |
| **Fonts** | Inter + JetBrains Mono | Premium modern typography via `next/font` |

### Design Direction: "Dark Cinema"
- **Background:** Slate-950 (#020617) — deeper than current #222 for true cinema feel
- **Accent glow:** Teal-400 (#2dd4bf) with subtle radial/box-shadow glows
- **Secondary accent:** Violet-500 (#8b5cf6) for XR section differentiation
- **Typography:** Large-scale type hierarchy (clamp-based fluid sizing)
- **Micro-animations:** Fade-up reveals, parallax scroll, magnetic cursor effects
- **Video:** Full-viewport video hero with overlay gradient and animated text

---

## Proposed Directory Structure

```
c:\Antigravity\Website\
├── .migration_assets/          # Scraped content (already created)
├── public/
│   ├── fonts/
│   ├── images/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (dark theme, fonts, metadata)
│   │   ├── page.tsx            # Home page
│   │   ├── gallery/
│   │   │   └── page.tsx        # Gallery/Portfolio page
│   │   ├── xr/
│   │   │   └── page.tsx        # XR Spatial Design page
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page
│   │   └── resume/
│   │       └── page.tsx        # Résumé page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Top navigation with mobile hamburger
│   │   │   ├── Footer.tsx      # Footer with social links
│   │   │   └── PageTransition.tsx  # Framer Motion page wrapper
│   │   ├── hero/
│   │   │   └── Hero.tsx        # Full-viewport video hero section
│   │   ├── sections/
│   │   │   ├── FeaturedWork.tsx # Supervisor work cards
│   │   │   ├── Credits.tsx     # Film/TV credits list
│   │   │   └── CTA.tsx         # Call-to-action banner
│   │   └── ui/
│   │       ├── Button.tsx      # Reusable button component
│   │       ├── Card.tsx        # Project card component
│   │       └── VideoEmbed.tsx  # Responsive video embed wrapper
│   └── styles/
│       └── globals.css         # Tailwind directives + custom CSS
├── tailwind.config.ts          # Dark-mode focused Tailwind config
├── next.config.ts              # Next.js configuration
├── tsconfig.json
├── package.json
└── PLAN.md                     # This file
```

---

## Phase 1 Scope (This Session)

### What We Build Now
1. **Project scaffold** — Next.js 15 + all dependencies
2. **Global theme** — Tailwind config with "Dark Cinema" palette
3. **Root layout** — Dark background, Inter font, metadata
4. **Hero section** — Typography-first design with video background placeholder, animated text reveal, scroll indicator

### What We Defer
- Gallery page with credits grid
- XR portfolio page
- Contact form with validation
- Résumé page with PDF viewer
- SEO meta per page
- Deployment configuration

---

## Verification Plan

### Automated
1. **Build check:** `npm run build` must succeed with zero errors
2. **Dev server:** `npm run dev` must start cleanly on port 3000

### Visual (Browser Agent)
3. **Navigate to `http://localhost:3000`** and capture a screenshot
4. **Verify:** Dark background visible, hero text renders, no layout breaks
5. **Verify responsive:** Resize to mobile viewport and confirm layout adapts
