# Building with the Nataliia Mykhailiuk practice system

A warm, flat, editorial system for a Kyiv psychotherapist's practice site. Serif headings,
sans body, clay accents on linen. Everything is Ukrainian — write copy in Ukrainian unless
asked otherwise. The tone is calm and plain; no exclamation, no sales language.

## No wrapper, no provider

Components render correctly on their own. There is no theme provider and no context: all
styling comes from `styles.css`, which defines the tokens on `:root` and carries the
component CSS and the webfont import. Load it once and every component is styled.

Two components read styling from a parent that `styles.css` defines rather than from their
own class, so render them inside that parent:

- `Quote` — only inside `QuoteWall` (its serif italic comes from `.quotes .quote-grid`).
- `FaqItem` — only inside `SiteFooter`'s third column (`.site-footer details` supplies the
  rules and the muted answer type).

## Styling your own glue

Style anything you add with the CSS custom properties, never hard-coded colour. They are
defined on `:root` in `styles.css`:

| Group | Tokens |
|---|---|
| Surfaces | `--bg` linen page, `--bg-alt` sand band, `--surface` paper card, `--dark` bark |
| Text | `--text`, `--text-2`, `--muted`, `--on-dark`, `--on-dark-muted`, `--on-dark-dim` |
| Accent | `--accent` clay, `--accent-dark` (links, buttons, hover), `--on-accent` |
| Lines | `--border` hairline, `--border-dark` on bark |
| Type | `--serif` Literata, `--sans` Commissioner, `--text-label`, `--text-meta`, `--text-sm` |
| Measure | `--wrap` 1180px |

Headings (`h1`–`h3`) are already Literata at weight 500 with balanced wrapping; body text is
Commissioner at 17px/1.65. Do not restate those in your own CSS — write headings as headings.

Utility classes worth knowing, because components rely on them and so can your own markup:
`container`, `section`, `section-alt`, `section-tight`, `section-flush`, `intro`, `lede`,
`muted`, `eyebrow`, `btn` (with `btn-sm`, `btn-ghost`, `btn-light`, `btn-outline-light`),
`btn-row`, `two-col`, `stats`, `tile-grid`, `steps`, `quotes`, `quote-grid`, `review-list`,
`service-list`, `practice-grid`, `contact-grid`, `facts`, `site-header`, `site-footer`,
`sticky-cta`, `skip-link`. There is no utility framework — no Tailwind, no spacing scale in
class form. Layout you add yourself uses plain CSS with the tokens above.

## Page shape

Every page is the same stack:

```jsx
<SkipLink />
<SiteHeader current="/services/" />
<main id="main">
  <Section spacing="tight">
    <Intro title="Три формати роботи">
      <Lede>Індивідуальні та сімейні сесії проходять у кабінеті або відеодзвінком.</Lede>
    </Intro>
  </Section>

  <Section spacing="flushSm">
    <ServiceList />
  </Section>

  <CtaBand spaced title="Готові почати?">
    Напишіть мені — домовимось про зручний час і формат.
  </CtaBand>
</main>
<StickyCta />
<SiteFooter />
```

The homepage opens with `Hero` instead of `Intro`, and alternates `alt` sections for rhythm.
`TwoCol` and `ContactGrid` bring their own `Container`, so give their `Section`
`contained={false}`.

## Things that will bite

- **The header menu is full.** Five items need about 418px on one line; phones use a fixed
  3 + 2 grid. A sixth item needs re-measuring first.
- **Testimonials are verbatim client words.** Never write new ones or edit existing ones for
  style. Inside a `blockquote` the site uses a spaced hyphen ` - `; everywhere else it uses
  an em dash ` — `.
- **Every button is a link.** There are no forms anywhere on the site; the contact route is
  Telegram, phone, or email.
- Read `styles.css` and its imports before styling anything substantial — it is 280 lines and
  it is the whole system.
