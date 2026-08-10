# Iván Quiroga — Portfolio

Monochrome editorial / brutalist / app-frame portfolio.

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis
- Three.js + React Three Fiber + Drei
- lucide-react

## Scripts

```bash
npm install
npm run dev
npm run build
npm run deploy
```

## Content

Edit copy and links in `src/constants/`. Place the CV PDF at `public/cv/ivan-quiroga.pdf`.

## Phase 2

Mount WebGL into `#webgl-root` (`CanvasStage`) — fixed, `pointer-events: none`, under the UI layer.

## Phase 3 (3D)

React Three Fiber scene behind the UI: Aphrodite of Milos GLB, intro splash, scroll-scrubbed camera / rotation / chiaroscuro lights.

- Model: `public/aphrodite_of_milos_a_plaster_cast.glb` (configured in `src/constants/models.ts`)
- Draco decoder: `https://www.gstatic.com/draco/versioned/decoders/1.5.6/`
- Stack also includes `three`, `@react-three/fiber`, `@react-three/drei`.
