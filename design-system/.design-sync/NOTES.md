# design-sync notes — nataliia-ds

## What this package is, and why it exists

`nataliiamykhailiuk.com` is hand-written static HTML with one 280-line stylesheet and no
build. Claude Design can only consume a React component library, so `design-system/` was
added: thin React components that emit **the site's own markup and class names**, compiled
to `dist/`. The stylesheet is not reimplemented — `build.mjs` copies
`../assets/css/style.css` verbatim, changing only two things it must:

- `url("../images/…")` becomes an absolute `https://www.nataliiamykhailiuk.com/...` URL,
  because the bundle's `styles.css` does not sit in the site's directory layout;
- a Google Fonts `@import` for Literata and Commissioner is prepended, because on the live
  site those come from a `<link>` in each page's `<head>`, which the bundle has no `<head>`
  to carry.

**The site is the source of truth.** If a component and the site's markup ever disagree, the
site wins — change the component.

## Setup quirks on this machine

- npm 11 blocks install scripts, so esbuild's postinstall does not run on a plain
  `npm install`. Both in `design-system/` and in `.ds-sync/`, run
  `npm approve-scripts esbuild && npm rebuild esbuild` once, or esbuild cannot load.
- Playwright's chromium cache lives at `~/AppData/Local/ms-playwright` and holds builds
  1234 and 1237. **Playwright 1.62.0 pins chromium 1234**, so install exactly that in
  `.ds-sync/` — the current release (1.63) pins 1243 and would force a ~200MB download.
- The bundled skill scripts live under
  `C:\TEMP\claude\bundled-skills\<version>\<hash>\design-sync\`; the version in that path
  changes when the desktop app updates, so re-resolve it rather than reusing this path.

## Decisions worth keeping

- **`cardMode: "column"` plus `viewport: "1280x900"`** is set for every full-width component.
  Without it the product's three-up grid renders them at ~630px, which trips the site's own
  900px and 600px breakpoints — the cards then showed the tablet layout and clipped text.
  Card-sized components (Button, PracticeCard, TopicTile, Stat, ContactRow…) are deliberately
  left at the default three-up.
- **Docs live in `.design-sync/docs/<Name>.md`** with a `category:` frontmatter key, which is
  what produces the five groups (Primitives, Layout, Cards, Content, Chrome) and what each
  component's `.prompt.md` carries. `cfg.docsDir` points at that directory; no `docsMap`
  entries are needed while every file is named after its component.
- **Previews use the live site's images** by absolute URL rather than bundling copies, so a
  photograph replaced on the site appears in the cards without a re-sync.
- **`Quote` and `FaqItem` previews compose their parent context** (`.quotes .quote-grid`,
  `.site-footer`). Rendered bare they fall back to browser defaults — that is correct
  behaviour, not a bug, because neither is ever used outside that parent.
- **`SkipLink` and `StickyCta` previews neutralise only `position`/`clip-path`** via a scoped
  `<style>` while rendering the real component. Do not replace them with hand-written
  lookalikes.
- **`FaqItem` gained an `open` prop** during this sync, purely so a card can show an answer.
  The site itself always renders questions closed.
- **Testimonials in previews are the ones published on `/reviews/`, verbatim.** Two invented
  ones were written early in this run and removed. Never write new testimonials: they read as
  genuine client words and would be fabricated ones.

## Known render warns

- `[FONT_REMOTE] "Commissioner", "Literata"` — expected and correct. The fonts load from
  Google Fonts via the `@import` that `build.mjs` prepends; nothing is missing.

## Re-sync risks

- **`build.mjs`'s image-URL rewrite is a regex against `style.css`.** It throws if it matches
  nothing, so a change to how the hero background is declared fails the build loudly rather
  than silently shipping a broken URL. That is deliberate — fix the regex, do not remove the
  check.
- **Component defaults duplicate real site copy.** `ServiceList`, `PracticeGrid`, `QuoteWall`,
  `SiteFooter` and others carry the live text and prices as default props. Prices in
  particular (1400 / 1900 / 2400 грн) will drift from `/services/`; check them on each sync.
- **The package is not consumed by the live site**, so nothing breaks when it drifts.
  `npm run fidelity` is what catches drift (see below). Run it, and re-sync, after any change
  to `assets/css/style.css`, to the pages' markup, or to `src/`.

## Site build — must be byte-identical to the deployed site before any deploy

`site/` builds the whole website from components (see `site/README.md`). The owner's rule:
nothing built from it may be deployed unless `npm run site:verify` passes, meaning all
tracked files are byte-identical to the commit Pages last built and every page matches the
live site. It passed at first build (26/26 files, 5/5 live pages).

## Fidelity check — the components must reproduce the live pages exactly

Standing requirement from the owner: built from these components, the site must be identical
to what is deployed. `npm run fidelity` (`scripts/fidelity.mjs`) enforces it. It reads every
page's content out of the site's own HTML, rebuilds the page from components only, renders it
with `react-dom/client`, and compares the DOM element by element: tag, every attribute, own
text. It exits 1 on any difference, or on any section no component can express. As of the
first sync: 5/5 pages identical (659 elements). A planted one-class defect was confirmed to
fail it, so the pass is not vacuous.

What it took to get there, so it is not undone:
- Image `width`/`height` come from `IMAGE_SIZES` in `primitives.tsx`, keyed by file name.
  The site's photos are not all one size (466, 467 or 419 tall).
- `SiteHeader`, `SiteFooter` and `StickyCta` take `assetBase`. The pages use
  `assets/images` (home) or `../assets/images` (inner pages). The default stays the absolute
  URL so cards render in Claude Design.
- `CtaBand` must not pass `centered` to `ButtonRow`. The site centres it with
  `.cta .btn-row` CSS, and the prop adds an inline style the site does not have.
- Server rendering (`react-dom/server`) adds a `<link rel="preload">` for the eager,
  high-priority wordmark. The components do not emit it, which is why the check uses the
  client renderer. If the site is ever generated with SSR, that tag will appear. The live
  pages preload `hero.jpg` from `<head>` instead.
- The check covers `<body>` only. `<head>` (meta, JSON-LD, font links) is page-level markup,
  not component output.
- **Node 24 and esbuild 0.25 were used here**; the bundle is plain ESM with React external,
  so a newer toolchain should be a no-op, but the output is not pinned.
- Grades live in the gitignored `.design-sync/.cache/`; what carries them across machines is
  the uploaded `_ds_sync.json`. A project re-created from scratch re-verifies everything.
