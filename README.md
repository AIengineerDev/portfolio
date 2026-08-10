# Portfolio

Personal portfolio for AI/ML work — Next.js 15 (App Router), TypeScript, Tailwind v4, Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint && npm run type-check
```

## Adding a project

Projects are data, not pages. Append an entry to `src/data/projects.ts` — the card on `/` and the case study at `/projects/<slug>` are both generated from it.

Optional fields render extra blocks when present: `cover`, `specs`, `dropout` (line chart), `gallery`, `team`, `links`. Put images in `public/projects/`.
