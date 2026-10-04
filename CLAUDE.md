# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio SPA for Alexandre Da Costa, deployed under the `/alexandre/` base path. React 19 + TypeScript + Vite, with MUI 7 for UI, Zustand for state, and Framer Motion for page/route transitions. The repo uses `pnpm` (see `pnpm-lock.yaml`), though `package.json` scripts invoke `npm`.

## Commands

```bash
pnpm start          # dev server on http://localhost:3095/alexandre/ (Vite, HMR, polling watch)
pnpm build          # tsc -b (typecheck) + vite build → dist/, then prerender — use for deployments
pnpm prerender      # inject static SEO meta into dist/ per route (standalone; already run by `build`)
pnpm preview        # serve the production build locally
pnpm lint           # eslint .
pnpm lint:fix       # eslint . --fix
pnpm update         # update deps + npm audit fix
```

There is **no test runner configured** despite `vite-plugin-istanbul` being present (coverage instrumentation is wired for an external Cypress/E2E setup that does not live in this repo). Do not assume `pnpm test` exists.

`pnpm build` runs `rollup-plugin-visualizer`, writing a bundle report to `stats.html` at the repo root. A custom Vite plugin (`vite.config.ts`) also emits `dist/sitemap.xml` from `PATH_PAGE` at build time.

## Architecture

### Data layer — fake API over local TypeScript modules
All page content (projects, skills, careers) is **static data defined in code**, not fetched from a network. `src/stores/data/api.ts` exposes an `api.get<T>(path)` that resolves from an in-memory `database` object, deliberately mimicking a RESTful async interface so it can later be swapped for real HTTP without touching consumers. When adding content, edit the relevant module under `src/stores/data/<domain>/` and register it in that domain's `index.ts` barrel (e.g. a new project = new file in `projects/` + import in `projects/index.ts`).

### State — Zustand slices + hook wrappers
The flow is consistent across the three domains (projects, skills, careers):

- `src/stores/slices/<domain>Store.ts` — Zustand store with `persist` middleware backed by **`sessionStorage`** (keys like `adc-projects`). Holds `{ loading, error, items, getX(), setX() }`; `getX()` calls `api.get()`.
- `src/stores/hooks/use<Domain>.ts` — the **only** thing pages should consume. Wraps the store, triggers `getX()` in a `useEffect` on mount, and applies derived logic (e.g. `useProjects` sorts by `dateStart` descending via `useMemo`).
- `src/stores/types/<domain>.types.ts` — shared TS types.

Pages call the `use<Domain>` hook; they never touch the store or `api` directly.

### Routing
`BrowserRouter` (App.tsx), with `basename` derived from Vite's `BASE_URL` (`/alexandre`) → `src/routes/index.tsx` defines routes wrapped in Framer Motion's `AnimatePresence` (keyed on `location.pathname` for page transitions). Paths are centralized in `src/routes/paths.ts` (`PATH_PAGE`); the sidebar nav items are defined in `App.tsx`. Real (non-hash) routes are what make per-route prerendering and the sitemap meaningful — the production host needs an SPA fallback (`public/.htaccess`) for routes without a prerendered file.

### Pages & components
- `src/pages/<Name>/` — each page folder contains `Page<Name>.tsx` plus its page-specific sub-components and hooks (e.g. Contact has `FormContact.tsx`, `useFormContact.tsx`, `useFormContact.types.ts`).
- `src/components/` — shared/cross-page components.
- Theme is dark-mode, defined in `src/config/theme.config.ts` and applied via `@kared/kui`'s `ThemeProvider` (a local design-system package; aliased in `vite.config.ts` so dev links resolve to this repo's React/emotion).

### Forms
Contact form uses `react-hook-form` + `yup` (`@hookform/resolvers`). Validation schema and all form-related types live in `useFormContact.types.ts`; the hook handles submission, snackbar feedback, and API error mapping.

### ChatWidget ("AskAlex AI")
`src/components/ChatWidget.tsx` POSTs to `VITE_API_ASKALEX`. In dev (`import.meta.env.DEV`) it is "self-hosted" with unlimited questions; in production it caps at 3 questions/month tracked in `localStorage` (`askalex_questions`), then shows a donation prompt.

### SEO & prerendering
Per-page SEO metadata (`<title>`, description, canonical, Open Graph, Twitter) has **a single source of truth**: `src/config/seo.pages.json`, keyed by page (`home`, `projects`, …, `notFound`). It is consumed two ways:

- **Runtime** — `src/config/seo.config.ts` wraps the JSON as a typed `SEO_PAGES` record; pages render `<Seo {...SEO_PAGES.x} />`. `src/components/Seo.tsx` relies on React 19's native `<head>` hoisting (no react-helmet) to inject the tags client-side, so SPA navigation updates them.
- **Build** — `scripts/prerender.mjs` (run by `build`) reads the same JSON and clones the built `dist/index.html` into `dist/<route>/index.html` with the SEO block injected before `</head>`. This gives JS-less social scrapers correct metadata. It is **pure file I/O — no headless browser**; the rendered `<body>` stays the empty SPA shell (only `<head>` is prerendered, which is all social previews need). `noIndex` pages (404) are skipped. `SITE_URL` comes from `VITE_SITE_URL` via Vite's `loadEnv`, mirroring the sitemap plugin.

When editing SEO copy, change **only `seo.pages.json`** — both the runtime and the prerender pick it up. Keep `Seo.tsx` and `prerender.mjs` in sync if you add/remove a tag (the script mirrors the component's markup).

## Conventions (enforced via `.cursorrules` — apply these when writing/editing)

- **Direct MUI imports only** — never barrel-import from `@mui/material` / `@mui/icons-material` / `@mui/lab`:
  - `import Button from "@mui/material/Button";` (not `import { Button } from "@mui/material"`)
  - `import HomeIcon from "@mui/icons-material/Home";`
  - `import { styled, useTheme } from "@mui/material/styles";` and `import useMediaQuery from "@mui/material/useMediaQuery";`
  This keeps the manual-chunks bundle split (vite.config.ts) effective.
- **Path alias** — use `@/` for all internal imports (`@/components/...`), never `../`. Configured in `tsconfig.app.json` and `vite.config.ts`.
- **React imports** — named only: `import { useState } from "react";`, no default `React` import.
- **MUI Grid v7** — use `<Grid size={{ xs: 12, md: 6 }}>`, not the legacy `<Grid item xs={...}>`.
- **Typed props** — every component declares an explicit `type <Name>Props = {...}`.
- **Framer Motion** — extract animation `variants` into named constants rather than inlining `animate`/`initial`.
- **Prettier** (enforced as an eslint error): `printWidth: 120`, `tabWidth: 2`, `trailingComma: "es5"`.
- TS is `strict` with `noUnusedLocals` / `noUnusedParameters` on — unused symbols fail the build.
- Code comments and JSDoc throughout the codebase are in **French**; match that when editing.
- Files use a `// ----` separator comment between logical sections (imports / component / export) — follow the local pattern.

## Environment variables

All client config is `VITE_`-prefixed (`.env`, `.env.production`). Notable: `VITE_API_EMAIL` (contact form endpoint), `VITE_API_ASKALEX` (chatbot endpoint), plus personal/social links (`VITE_MY_*`). These are bundled into the client — treat them as public.
