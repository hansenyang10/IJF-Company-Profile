# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm start          # Dev server at http://localhost:4200 (with SSR)
pnpm build          # Production build to dist/
pnpm test           # Run unit tests with Vitest
pnpm run watch      # Dev build in watch mode
node dist/ijf-company-profile/server/server.mjs  # Run SSR server (after build)
```

Angular CLI scaffolding (use pnpm dlx or global ng):
```bash
ng generate component pages/my-page   # Generates standalone component with SCSS
ng generate directive shared/directives/my-directive
```

Formatting: Prettier with `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files.

## Architecture

**Framework:** Angular 22, standalone components only (no NgModules), SSR via `@angular/ssr` + Express.

**Layout shell** (`src/app/app.component.ts`): Renders `<app-header>`, `<router-outlet>`, `<app-footer>`. Header and Footer live in `src/app/layout/`.

**Pages** (`src/app/pages/`): Six lazy-loaded route components — `home`, `about`, `services`, `insights`, `career`, `contact`. All routes registered in `app.routes.ts` via `loadComponent`. The wildcard `**` redirects to `''`.

**Shared utilities** (`src/app/shared/`):
- `services/seo.services.ts` — `SeoService.generateTags(config)` sets `<title>`, description, Open Graph, and Twitter Card meta tags. Call it in `ngOnInit` of every page component.
- `directives/count-up.directive.ts` — `[appCountUp]="value"` animates a number from 0 to target when the element enters the viewport (fires once via `IntersectionObserver`). Accepts an optional `[duration]` input in ms. Supports numeric suffixes like `"10+"` or `"98%"`.
- `directives/fade-in.directive.ts` — `appFadeIn` fades an element in when it enters the viewport. The CSS for this directive (`opacity: 0`, `transform`, transition, and `.fade-in-visible`) lives in **global** `src/styles.scss` — not in the directive's own file — because the class is added dynamically.

**Styling:** Angular Material M3 theme (cyan primary, orange tertiary) configured in `src/styles.scss` via `mat.theme()`. All component styles use SCSS.

**Reactive state:** Components use Angular signals (`signal()`, `computed()`) for local UI state (sliders, carousel indices, window width). No global state store.

**SSR guard:** When accessing browser-only APIs (`window`, `document`), always guard with `typeof window !== 'undefined'`. Example in `home.component.ts`: `signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1200)`.

**Company name placeholder:** The app content uses `NamaPerusahaan` / `namaperusahaan.com` as placeholder text throughout routes, SEO tags, and `SeoService`. Replace these when the actual company name is finalized.
