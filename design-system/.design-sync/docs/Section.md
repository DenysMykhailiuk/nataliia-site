---
category: Layout
---

# Section

A full-width horizontal band — the page is a stack of these. `spacing` sets the rhythm:
`default` is 110px top and bottom, `tight` opens a page at 96/72, and `flush`/`flushSm` drop
the top padding so a section can sit directly under a `tight` one. `alt` switches the
background from linen to sand, banding the page.

```jsx
<Section alt>
  <SectionHead title="Теми, з якими до мене приходять найчастіше" />
  <TileGrid />
</Section>
```

Pass `contained={false}` when the section needs its own grid, as the contacts page does.
