// Builds the website from nataliia-ds components into design-system/.site-dist/.
//
//   pages   site/pages/<page>.jsx → <path>/index.html, rendered with react-dom/client and
//           written in the hand-formatted layout the site has always used
//   files   everything else the site serves (assets, CNAME, robots.txt, sitemap.xml, …) is
//           copied byte-for-byte from the site root
//
// The output directory is dot-prefixed on purpose: tools/stamp-css.py discovers pages with
// **/index.html and skips dot-folders, so generated pages never get stamped twice.
//
//   npm run site           build only
//   npm run site:verify    build, then prove the output identical to the deployed commit
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
import { JSDOM } from 'jsdom';

const DS = fileURLToPath(new URL('..', import.meta.url));
const SITE = join(DS, '..');
const OUT = join(DS, '.site-dist');
const WORK = join(DS, '.site-build');

// Pages in site order. `file` is the output path; depth decides the relative asset prefix.
const PAGES = [
  { name: 'home', file: 'index.html' },
  { name: 'practice', file: 'practice/index.html' },
  { name: 'services', file: 'services/index.html' },
  { name: 'reviews', file: 'reviews/index.html' },
  { name: 'contacts', file: 'contacts/index.html' },
];

// Every other file the site serves, copied verbatim. Kept explicit so an unexpected new file
// at the site root is a visible decision rather than something silently published.
const STATIC = [
  '.gitignore', '.nojekyll', 'CNAME', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'apple-touch-icon.png',
  'assets/css/style.css',
  'assets/js/moon-path.js',
  ...['bio.jpg', 'facebook-icon.png', 'hero.jpg', 'logo-dark.png', 'logo.png', 'telegram-icon.png',
    'tile-divorce.jpg', 'tile-parent-child.jpg', 'tile-personal-growth.jpg', 'tile-stress-anxiety.jpg',
    'tile-trauma.jpg', 'tile-work-stress.jpg', 'wordmark-dark.png'].map((f) => `assets/images/${f}`),
  'tools/build-wordmark.py', 'tools/stamp-css.py',
];

const ORIGIN = 'https://www.nataliiamykhailiuk.com';
const FONTS = 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400&family=Commissioner:wght@400;500;600&display=swap';

// ---------------------------------------------------------------- compile the page sources
rmSync(WORK, { recursive: true, force: true });
mkdirSync(WORK, { recursive: true });
const entry = join(WORK, 'entry.jsx');
writeFileSync(entry, PAGES.map((p) => `export * as ${p.name} from ${JSON.stringify(join(DS, 'site', 'pages', `${p.name}.jsx`).replace(/\\/g, '/'))};`).join('\n'));
await esbuild.build({
  entryPoints: [entry],
  outfile: join(WORK, 'pages.mjs'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  alias: { 'nataliia-ds': join(DS, 'src', 'index.ts') },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'warning',
});

// ------------------------------------------------------------------- render with the DOM
const host = new JSDOM('<!DOCTYPE html><body></body>');
Object.assign(globalThis, { window: host.window, document: host.window.document });
const req = createRequire(join(DS, 'package.json'));
const React = req('react');
const { createRoot } = req('react-dom/client');
const { flushSync } = req('react-dom');
const pages = await import(pathToFileURL(join(WORK, 'pages.mjs')).href);
const ds = await import(pathToFileURL(join(DS, 'dist', 'index.es.js')).href);
const h = React.createElement;

function render(tree) {
  const container = document.createElement('div');
  const root = createRoot(container);
  flushSync(() => root.render(tree));
  return { container, done: () => root.unmount() };
}

// --------------------------------------------------------------------------- serializer
// The site's HTML is hand-formatted: containers put each child on its own line, indented two
// spaces; small compositions sit on one line. These rules reproduce that layout.
const VOID = new Set(['img', 'meta', 'link', 'br', 'input', 'hr', 'source']);
const BARE = new Set(['allowfullscreen', 'crossorigin', 'open', 'hidden', 'disabled']);
const INLINE_PARENTS = new Set(['stats', 'steps', 'facts', 'price-row', 'footer-bottom']);

const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function openTag(el) {
  let list = [...el.attributes];
  // React assigns an <img>'s src last (so `loading` is set before the fetch starts); the site
  // writes src first. Same attributes, same values — only the written order is normalised.
  if (el.tagName === 'IMG') list = [...list.filter((a) => a.name === 'src'), ...list.filter((a) => a.name !== 'src')];
  const attrs = list.map((a) => (a.value === '' && BARE.has(a.name) ? ` ${a.name}` : ` ${a.name}="${escAttr(a.value)}"`)).join('');
  return `<${el.tagName.toLowerCase()}${attrs}>`;
}
function inline(node) {
  if (node.nodeType === 3) return escText(node.textContent);
  if (node.nodeType !== 1) return '';
  const tag = node.tagName.toLowerCase();
  if (VOID.has(tag)) return openTag(node);
  return `${openTag(node)}${[...node.childNodes].map(inline).join('')}</${tag}>`;
}
function isBlock(el) {
  if (!el.children.length) return false;
  const tag = el.tagName.toLowerCase();
  if (['p', 'li', 'h1', 'h2', 'h3', 'figure', 'details', 'span', 'summary', 'blockquote'].includes(tag)) return false;
  if (tag === 'a') return el.classList.contains('tile') || el.classList.contains('contact-row');
  if (['tile-body', 'head', 'service-title', 'footer-bottom'].some((c) => el.classList.contains(c))) return false;
  if (tag === 'div' && !el.className && [...el.parentElement.classList].some((c) => INLINE_PARENTS.has(c))) return false;
  return true;
}
function block(el, ind) {
  if (!isBlock(el)) return [ind + inline(el)];
  const tag = el.tagName.toLowerCase();
  return [ind + openTag(el), ...[...el.children].flatMap((c) => block(c, ind + '  ')), `${ind}</${tag}>`];
}

// ------------------------------------------------------------------------------ document
function head(meta, prefix) {
  const url = ORIGIN + meta.path;
  const lines = [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${escText(meta.title)}</title>`,
    `<meta name="description" content="${escAttr(meta.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${escAttr(meta.title)}">`,
    `<meta property="og:description" content="${escAttr(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    '<meta property="og:site_name" content="Nataliia Mykhailiuk">',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="uk_UA">',
    `<meta property="og:image" content="${ORIGIN}/assets/images/bio.jpg">`,
    '<meta property="og:image:width" content="640">',
    '<meta property="og:image:height" content="640">',
    '<meta property="og:image:alt" content="Наталія Михайлюк — гештальт-терапевт">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    // Written with bare `&`, as the site has it. Browsers accept it in an attribute; only the
    // map URL in the body is entity-escaped, and that one comes through the serializer.
    `<link href="${FONTS}" rel="stylesheet">`,
  ];
  if (meta.preloadHero) lines.push(`<link rel="preload" as="image" href="${prefix}assets/images/hero.jpg" fetchpriority="high">`);
  // Same stamp tools/stamp-css.py writes: first 8 hex of the stylesheet's MD5.
  const stamp = createHash('md5').update(readFileSync(join(SITE, 'assets', 'css', 'style.css'))).digest('hex').slice(0, 8);
  lines.push(`<link rel="stylesheet" href="${prefix}assets/css/style.css?v=${stamp}">`);
  // Page scripts, deferred and stamped the same way as the stylesheet so a change reaches visitors at once.
  for (const src of meta.scripts || []) {
    const v = createHash('md5').update(readFileSync(join(SITE, src))).digest('hex').slice(0, 8);
    lines.push(`<script src="${prefix}${src}?v=${v}" defer></script>`);
  }
  if (meta.jsonLd) lines.push('<script type="application/ld+json">', JSON.stringify(meta.jsonLd, null, 2), '</script>');
  return lines;
}

function page({ name, file }) {
  const mod = pages[name];
  const prefix = '../'.repeat(file.split('/').length - 1);
  const assetBase = `${prefix}assets/images`;
  const { container, done } = render(
    h(React.Fragment, null,
      h(ds.SkipLink),
      h(ds.SiteHeader, { current: mod.meta.path, assetBase }),
      h('main', { id: 'main' }, h(mod.default, { assetBase })),
      h(ds.StickyCta, { assetBase }),
      h(ds.SiteFooter, { assetBase })),
  );
  const [skip, header, main, sticky, footer] = container.children;
  const sections = [...main.children].map((s) => block(s, '').join('\n'));
  const html = [
    '<!DOCTYPE html>',
    '<html lang="uk">',
    '<head>',
    ...head(mod.meta, prefix),
    '</head>',
    `<body>${inline(skip)}`,
    ...block(header, ''),
    `${openTag(main)}`,
    sections.join('\n\n'),
    '',
    '</main>',
    inline(sticky),
    ...block(footer, ''),
    '</body>',
    '</html>',
    '',
  ].join('\n');
  done();
  return html;
}

// ------------------------------------------------------------------------------- output
rmSync(OUT, { recursive: true, force: true });
for (const p of PAGES) {
  const dest = join(OUT, p.file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, page(p), 'utf8');
}
for (const f of STATIC) {
  mkdirSync(dirname(join(OUT, f)), { recursive: true });
  copyFileSync(join(SITE, f), join(OUT, f));
}
rmSync(WORK, { recursive: true, force: true });
console.log(`built ${PAGES.length} pages + ${STATIC.length} static files → ${OUT}`);
