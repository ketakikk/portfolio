# Ketaki Kadam — 3D Portfolio

A single-page Angular 18 portfolio built entirely on **standalone components + Signals**,
with a **Three.js** hero visual: the *Micro-Frontend Constellation* — a rotating node graph
where every node is a real module Ketaki has shipped (Citi Olympus MFEs, ATLAS, RBL Video KYC,
Reliance Trade Platform), grouped by domain and orbiting a central "Ketaki Kadam" node. It's
not decorative particles — it's her actual architecture, rendered.

## Matched to your repo (Angular 22, zoneless)

This project is now aligned to your existing `package.json`:
- `provideZonelessChangeDetection()` in `app.config.ts` instead of `provideZoneChangeDetection` —
  your repo has no `zone.js` dependency, so it's zoneless by default. Every piece of state in this
  app (`ScrollSpyService`, hover state in the hero scene, active nav link) is a `signal()`, so
  change detection is scheduled correctly with no manual `markForCheck()` anywhere.
- `angular.json` uses `@angular/build:application` / `@angular/build:dev-server`
  (the esbuild/Vite-based builders your `@angular/build` devDependency provides), not the old
  `@angular-devkit/build-angular` builders. No test target included — bring your own.

### Merging into your existing repo (recommended, instead of overwriting)
1. Copy `src/app/core`, `src/app/services`, and `src/app/components` into your repo's `src/app/`.
2. Copy the `hero-scene`, `navbar`, `about`, `skills`, `experience`, `achievements`, `contact`
   components into your existing `app.component.html` in place of (or alongside) whatever's there
   now — the `kk-` selectors won't collide with your existing `app-root` unless you also use that
   prefix.
3. Merge the `:root` tokens from `styles.scss` into your global stylesheet.
4. Add `three` and `@types/three` to your `package.json` (already reflected above) and run
   `npm install`.
5. If your `app.config.ts` already calls `provideZonelessChangeDetection()`, no change needed there.

## Run it

```bash
npm install
npm start
```
Then open http://localhost:4200.

```bash
npm run build   # production build -> dist/portfolio-3d
```

## Why it's built this way

- **Signals over RxJS subjects for UI state** — `signal()` / `computed()` / `effect()` drive the
  active-nav-link highlight, the hovered constellation node, and the hero's scroll-linked camera
  tilt. `ScrollSpyService` is the one place RxJS-style imperative browser APIs
  (`IntersectionObserver`, `scroll` listener) get translated into signals the rest of the app reads.
- **One data file, one truth** — `core/data/resume.data.ts` is the only place resume content
  lives. Every component (hero constellation, experience timeline, skills matrix, achievements)
  reads from it, so updating a bullet point or adding a role never touches template code.
- **`core/models/resume.model.ts`** gives that data file compiler-checked shape — add a field to
  an interface and TypeScript will tell you everywhere it needs filling in.

## Folder structure

```
portfolio-3d/
├── angular.json
├── package.json
├── tsconfig.json / tsconfig.app.json
├── README.md
└── src/
    ├── index.html            # fonts: Space Grotesk / Inter / JetBrains Mono
    ├── main.ts                # bootstrapApplication (no NgModules)
    ├── styles.scss            # design tokens — colors, type, spacing, buttons
    └── app/
        ├── app.component.ts|html|scss     # shell: navbar + sections
        ├── app.config.ts                  # providers (router, zone config)
        ├── app.routes.ts                  # reserved for future case-study routes
        ├── core/
        │   ├── models/resume.model.ts     # ContactInfo, ExperienceEntry, SkillCategory...
        │   └── data/resume.data.ts        # <-- all resume content lives here
        ├── services/
        │   └── scroll-spy.service.ts      # signal-based active-section + scroll progress
        └── components/
            ├── navbar/            # sticky nav, active-link signal, mobile menu
            ├── hero-scene/        # Three.js constellation (the signature visual)
            ├── about/             # summary + stat strip
            ├── skills/            # tabbed skill matrix
            ├── experience/        # numbered career timeline, expandable entries
            ├── achievements/      # awards + education
            └── contact/           # contact cards + footer
```

## Design language — "Circuit Blueprint"

Graphite/navy base (`#0B0F14`) with a circuit-blue (`#4F8FE8`) and amber (`#F2C572`) accent pair,
`Space Grotesk` for display type, `JetBrains Mono` for data labels — the visual grammar of a
schematic, because the subject is someone who architects systems for a living. The `01 / 02 / 03`
numbering only appears on the Experience timeline, because that's the one section where order is
real information (a career sequence), not decoration.

## Customizing

- **Content:** edit `src/app/core/data/resume.data.ts` only.
- **Colors/type:** edit the `:root` tokens at the top of `src/styles.scss`.
- **Constellation shape:** `CONSTELLATION_NODES` in `resume.data.ts` — add a node with a
  `cluster` (`banking` / `telecom` / `energy`, or add a new one + a color in
  `hero-scene.component.ts`'s `CLUSTER_COLOR` map) and it's automatically laid out and wired
  to the core node.

## Deploying

Any static host works (Vercel, Netlify, GitHub Pages, Azure Static Web Apps — fitting, given
the Azure DevOps background):

```bash
npm run build
# deploy the contents of dist/portfolio-3d/browser
```
