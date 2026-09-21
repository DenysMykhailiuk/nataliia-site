// Fidelity check: rebuilds every page of the site from nataliia-ds components — content read
// out of the site's own HTML — renders it with react-dom/client, and compares the result with
// the page's DOM element by element (tag, every attribute, own text). Exits 1 on any
// difference, and on any section the components cannot express (rendered as <unmapped>).
//
// Run after any change to src/ or to the site's pages:  npm run fidelity
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const DS = fileURLToPath(new URL('..', import.meta.url));
const SITE = join(DS, '..');
const PAGES = {
  home: 'index.html',
  practice: 'practice/index.html',
  services: 'services/index.html',
  reviews: 'reviews/index.html',
  contacts: 'contacts/index.html',
};

const host = new JSDOM('<!DOCTYPE html><body></body>');
Object.assign(globalThis, { window: host.window, document: host.window.document });

const req = createRequire(join(DS, 'package.json'));
const React = req('react');
const { createRoot } = req('react-dom/client');
const { flushSync } = req('react-dom');
const ds = await import(pathToFileURL(join(DS, 'dist', 'index.es.js')).href);
const h = React.createElement;

function render(el) {
  const container = document.createElement('div');
  const root = createRoot(container);
  flushSync(() => root.render(el));
  const html = container.innerHTML;
  root.unmount();
  return html;
}

const txt = (el) => (el ? el.textContent : undefined);
// Inline HTML is passed through a marker element stripped before comparison, so inline
// markup (<br>, <strong>) is compared exactly rather than flattened to text.
const raw = (html) => h('x-raw', { dangerouslySetInnerHTML: { __html: html } });
const unmapped = (el) => h('unmapped', { 'data-what': el.outerHTML.slice(0, 80) });

function button(a) {
  const c = a.className;
  const variant = c.includes('btn-ghost') ? 'ghost' : c.includes('btn-outline-light') ? 'outlineLight' : c.includes('btn-light') ? 'light' : 'solid';
  return h(ds.Button, { href: a.getAttribute('href'), variant, size: c.includes('btn-sm') ? 'sm' : 'md' }, raw(a.innerHTML));
}
const buttons = (row) => [...row.children].map((a, i) => h(React.Fragment, { key: i }, button(a)));
const img = (el) => ({ image: el.getAttribute('src'), imageAlt: el.alt });

function mapChild(el, i) {
  const k = { key: i };
  const c = el.classList;
  const q = (s) => el.querySelector(s);
  const kids = [...el.children];
  if (el.tagName === 'H1' || el.tagName === 'H2') return h(el.tagName.toLowerCase(), k, raw(el.innerHTML));
  if (el.tagName === 'P' && c.contains('lede') && c.length === 1) return h(ds.Lede, k, raw(el.innerHTML));
  if (el.tagName === 'P' && c.length === 0) return h('p', k, raw(el.innerHTML));
  if (c.contains('inline-link')) return h(ds.InlineLink, { ...k, href: el.getAttribute('href') }, raw(el.innerHTML));
  if (c.contains('stats'))
    return h(ds.StatRow, k, kids.map((d, j) => h(ds.Stat, { key: j, value: txt(d.querySelector('.stat-num')), label: txt(d.querySelector('.stat-label')) })));
  if (c.contains('intro')) return h(ds.Intro, { ...k, title: raw(q('h1').innerHTML) }, kids.slice(1).map(mapChild));
  if (c.contains('section-head')) {
    const eb = q('.eyebrow');
    return h(ds.SectionHead, { ...k, eyebrow: eb ? raw(eb.innerHTML) : undefined, title: raw(q('h2').innerHTML) });
  }
  if (c.contains('tile-grid'))
    return h(ds.TileGrid, k, kids.map((a, j) =>
      h(ds.TopicTile, { key: j, href: a.getAttribute('href'), ...img(a.querySelector('img')), title: raw(a.querySelector('h3').innerHTML) }, raw(a.querySelector('p').innerHTML))));
  if (c.contains('steps'))
    return h(ds.StepList, k, kids.map((d, j) =>
      h(ds.Step, { key: j, number: txt(d.querySelector('.step-num')), title: raw(d.querySelector('h3').innerHTML) }, raw(d.querySelector('p').innerHTML))));
  if (c.contains('practice-grid'))
    return h(ds.PracticeGrid, k, kids.map((a, j) =>
      h(ds.PracticeCard, {
        key: j, id: a.id, ...img(a.querySelector('img')),
        number: txt(a.querySelector('.head span')), title: raw(a.querySelector('.head h2').innerHTML),
        items: [...a.querySelectorAll('li')].map((l) => l.textContent), meta: txt(a.querySelector('.meta')),
      }, raw(a.querySelector('.body > p').innerHTML))));
  if (c.contains('service-list'))
    return h(ds.ServiceList, k, kids.map((a, j) => {
      const notes = a.querySelectorAll('.price-row .price-note');
      return h(ds.ServiceRow, {
        key: j, reverse: a.classList.contains('reverse'), ...img(a.querySelector('img')),
        number: txt(a.querySelector('.service-title span')), title: raw(a.querySelector('.service-title h2').innerHTML),
        items: [...a.querySelectorAll('li')].map((l) => l.textContent),
        price: txt(a.querySelector('.price')), priceNote: txt(notes[0]), availability: txt(notes[1]),
      }, raw(a.querySelector('.service-body > p').innerHTML));
    }));
  if (c.contains('review-list'))
    return h(ds.ReviewList, k, kids.map((f, j) =>
      h(ds.ReviewCard, { key: j, attribution: raw(f.querySelector('figcaption').innerHTML) }, raw(f.querySelector('blockquote').innerHTML))));
  if (c.contains('facts'))
    return h(ds.FactGrid, k, kids.map((d, j) => h(ds.Fact, { key: j, value: txt(d.querySelector('.fact-num')), label: txt(d.querySelector('.fact-label')) })));
  if (c.contains('contact-list'))
    return h(ds.ContactList, k, kids.map((a, j) => {
      const icon = a.querySelector('img');
      return h(ds.ContactRow, {
        key: j, href: a.getAttribute('href'), external: a.getAttribute('target') === '_blank',
        icon: icon ? icon.getAttribute('src') : '', glyph: txt(a.querySelector('.contact-icon')),
        title: raw(a.querySelector('strong').innerHTML),
      }, raw(a.querySelector('small').innerHTML));
    }));
  return unmapped(el);
}

function mapSection(sec, i) {
  const k = { key: i };
  const c = sec.classList;
  const q = (s) => sec.querySelector(s);
  if (c.contains('hero')) {
    return h(ds.Hero, {
      ...k, eyebrow: raw(q('.hero-inner .eyebrow').innerHTML), title: raw(q('.hero-inner h1').innerHTML),
      actions: buttons(q('.hero-inner .btn-row')),
    }, raw(q('.hero-inner p').innerHTML));
  }
  if (c.contains('quotes')) {
    const more = q('.quotes-more');
    return h(ds.QuoteWall, {
      ...k, eyebrow: raw(q('.eyebrow').innerHTML),
      moreHref: more ? more.getAttribute('href') : null, moreLabel: more ? raw(more.innerHTML) : undefined,
    }, [...sec.querySelectorAll('figure')].map((f, j) =>
      h(ds.Quote, { key: j, attribution: raw(f.querySelector('figcaption').innerHTML) }, raw(f.querySelector('blockquote').innerHTML))));
  }
  if (c.contains('cta'))
    return h(ds.CtaBand, { ...k, spaced: c.contains('cta-spaced'), title: raw(q('h2').innerHTML), actions: buttons(q('.btn-row')) }, raw(q('p').innerHTML));

  const spacing = c.contains('section-tight') ? 'tight' : c.contains('section-flush-sm') ? 'flushSm'
    : c.contains('section-flush') ? 'flush' : c.contains('section') ? 'default' : null;
  if (!spacing) return unmapped(sec);
  const cont = sec.firstElementChild;
  if (cont.classList.contains('two-col')) {
    return h(ds.Section, { ...k, spacing, alt: c.contains('section-alt'), contained: false },
      h(ds.TwoCol, img(cont.querySelector(':scope > img')), [...cont.querySelector(':scope > div').children].map(mapChild)));
  }
  if (cont.classList.contains('contact-grid')) {
    const [left, right] = cont.children;
    const office = right.querySelector('.office-card');
    const map = right.querySelector('iframe');
    const aside = [
      h(ds.MapEmbed, { key: 'm', src: map.getAttribute('src'), title: map.title }),
      h(ds.OfficeCard, {
        key: 'o', eyebrow: raw(office.querySelector('.eyebrow').innerHTML),
        address: raw(office.querySelector('.office-addr').innerHTML), meta: raw(office.querySelector('.office-meta').innerHTML),
      }, raw(office.querySelector('.office-note').innerHTML)),
    ];
    return h(ds.Section, { ...k, spacing, contained: false },
      h(ds.ContactGrid, { aside }, [...left.children].map((el, j) =>
        el.classList.contains('contact-lede') ? h('p', { key: j, className: el.className }, raw(el.innerHTML)) : mapChild(el, j))));
  }
  return h(ds.Section, { ...k, spacing, alt: c.contains('section-alt') }, [...cont.children].map(mapChild));
}

function rebuild(doc) {
  const body = doc.body;
  const current = body.querySelector('.site-nav a[aria-current="page"]').getAttribute('href');
  const assetBase = body.querySelector('.site-header .logo img').getAttribute('src').replace(/\/wordmark-dark\.png$/, '');
  const parts = [
    h(ds.SkipLink, { key: 's' }),
    h(ds.SiteHeader, { key: 'h', current, assetBase }),
    h('main', { key: 'm', id: 'main' }, [...body.querySelector('main').children].map(mapSection)),
  ];
  if (body.querySelector('.sticky-cta')) parts.push(h(ds.StickyCta, { key: 'c', assetBase }));
  parts.push(h(ds.SiteFooter, { key: 'f', assetBase }));
  return render(h(React.Fragment, null, parts)).replace(/<\/?x-raw>/g, '');
}

// Canonical form: one line per element — tag, sorted attributes, then its own direct text.
function canon(root) {
  const out = [];
  (function walk(el, depth) {
    const attrs = [...el.attributes].map((a) => `${a.name}="${a.value}"`).sort().join(' ');
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
    out.push(`${'  '.repeat(depth)}<${el.tagName.toLowerCase()}${attrs ? ' ' + attrs : ''}>${own ? ' ' + own : ''}`);
    for (const ch of el.children) walk(ch, depth + 1);
  })(root, 0);
  return out;
}

const summary = [];
const firstDiffs = {};
for (const [page, file] of Object.entries(PAGES)) {
  const live = new JSDOM(readFileSync(join(SITE, file), 'utf8')).window.document;
  const built = new JSDOM(`<!DOCTYPE html><body>${rebuild(live)}</body>`).window.document;
  const a = canon(live.body);
  const b = canon(built.body);
  const diffs = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) diffs.push({ line: i, site: a[i], built: b[i] });
  firstDiffs[page] = diffs.slice(0, 5);
  summary.push({ page, siteElements: a.length, builtElements: b.length, differing: diffs.length, unmapped: b.filter((l) => l.includes('<unmapped')).length });
}
console.table(summary);
const failed = summary.filter((r) => r.differing || r.unmapped);
if (failed.length) {
  for (const r of failed) console.error(`✗ ${r.page}: first differences\n${JSON.stringify(firstDiffs[r.page], null, 1)}`);
  process.exit(1);
}
console.log(`✓ all ${summary.length} pages rebuild from components with an identical DOM`);
