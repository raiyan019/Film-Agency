# FRAME® — Film Production Agency Template

Dark cinematic React template. **Status: Phase 1 (foundation) complete.**

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```

Requires Node 20.19+.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/styles/index.css` | Tailwind v4 import + **all design tokens** (`@theme`) |
| `src/data/siteConfig.js` | Brand name, nav, contact, social, SEO, form provider |
| `src/pages/` | One file per route |
| `src/components/layout/` | Layout shell (Navbar/Footer/Preloader arrive in Phase 2) |
| `src/hooks/` | `useDocumentMeta` (title + description), `useReducedMotion` |
| `public/images`, `public/videos` | Replaceable demo assets (added in later phases) |
| `public/_redirects`, `vercel.json` | SPA fallback so refreshing any route works |

Full install, customisation, form and deployment docs are completed in Phase 7.
