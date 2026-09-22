# Building the site from components

`site/pages/*.jsx` is the website, written with the `nataliia-ds` components. It was
generated once from the hand-written pages at commit `6afd0a4`. Since then these files are the
source: edit them, not the HTML.

```bash
npm run site          # build → design-system/.site-dist/
npm run site:verify   # build, then prove it byte-identical to the deployed site
```

## What the build does

- **Pages.** Each page renders through `react-dom/client` (not the server renderer, which
  adds a `<link rel="preload">` the site doesn't have). The output is serialized in the
  site's own hand-formatted layout. The `<head>` comes from each page's `meta` export plus a
  fixed template in `build.mjs`. The stylesheet `?v=` stamp is computed the same way as
  `tools/stamp-css.py`: the first 8 hex of the MD5 of `style.css`.
- **Page scripts.** A page's `meta.scripts` lists site files to load with `<script defer>`, each
  stamped `?v=` with the first 8 hex of its own MD5, like the stylesheet. Only the homepage has
  one: `assets/js/moon-path.js`, the hero's moonrise. It draws nothing at 900px wide or less, so
  phones keep the plain hero, and it adds its canvas at runtime, so the page's DOM is unchanged.
  A script must also be in the `STATIC` list to be published.
- **Everything else** (assets, `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll`, `tools/`)
  is copied byte for byte. The list in `build.mjs` is explicit on purpose.
- **Output location.** Output goes to a dot-folder because `stamp-css.py` finds pages with
  `**/index.html` and skips dot-folders.

## Deploy

`.github/workflows/pages.yml` publishes the site. The Pages source must be set to "GitHub
Actions"; under "Deploy from a branch", GitHub publishes the whole branch, `design-system/`
included. On every push to `main`, the workflow:

1. builds the site and runs `verify.mjs --ref HEAD`. The build must be byte-identical to the
   site files committed at that same commit, or nothing deploys;
2. runs `npm run fidelity`;
3. uploads only `.site-dist/`, including its dotfiles, and deploys it;
4. re-checks every live page against the build once the deployment is serving.

The root-level HTML files are the committed contract that step 1 checks against. To change the
site, edit `site/pages/*.jsx`, run `npm run site`, and copy the regenerated pages from
`.site-dist/` over the root ones in the same commit. A commit that changes one without the
other fails CI.

## What verification proves

`site/verify.mjs` compares the build with the commit GitHub Pages last built. It checks:

- the same file set, with nothing missing and nothing extra;
- every file byte-identical to that commit;
- with `--live`, every page byte-identical to what `www.nataliiamykhailiuk.com` serves now.

It exits 1 on any difference and prints the first differing line. A one-character price change
was confirmed to fail it.

## Two serializer rules that look arbitrary but aren't

- **`<img>` attribute order.** React sets an image's `src` last. The serializer writes `src`
  first, as the site does. The attributes and values are unchanged.
- **Font URL escaping.** The font URL in `<head>` keeps its bare `&`. The map URL in the body
  keeps `&amp;`. Both are how the site already writes them.
