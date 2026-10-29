# AERO × KOGLESH — Creative Engineering Portfolio

A separate portfolio experience for Koglesh R. Murugan. It does not replace or modify https://koglesh-portfolio.vercel.app/.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run typecheck` to type-check, then use `npm run build` and `npm start` for production verification.

## Included

- Next.js App Router, TypeScript and Tailwind CSS
- GPU-shader-driven Three.js particle ring with pointer response and pulse events
- Framer Motion entrances and perspective interaction
- Horizontal project rail with architectural traces
- GSAP ScrollTrigger reading progress and Lenis smooth scrolling
- International Taekwondo milestones and dated AERO creator analytics
- Interactive CLI: `help`, `contact`, `projects`, `whoami`, `secret`, `clear`
- Mobile responsive layout, reduced-motion accommodation and email contact

## Important accuracy notes

- The displayed 35,550 views, 125.3 watch hours and +42 subscribers are a historical YouTube Studio snapshot for **12 Sep–09 Oct 2026**, not live values.
- Project illustrations and architecture traces are illustrative interface visuals, not live telemetry from the products.
- Contact uses `mailto:`; the page does not automatically send messages.
- The ring does not request microphone permissions. Pointer movement, clicks and the `secret` terminal command trigger a visual pulse.
- A 100/100 Lighthouse score is not claimed. Measure a production deployment on a defined device and network before publishing any benchmark.

## Architecture

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  navigation.tsx
  hero.tsx
  aero-core.tsx
  project-rail.tsx
  milestones.tsx
  terminal.tsx
  smooth-scroll.tsx
  scroll-progress.tsx
lib/
  projects.ts
```

## Deploy

Import this repository into Vercel and use the default Next.js build settings. No environment variables are required for this portfolio. Review the deployment preview before connecting a custom domain.