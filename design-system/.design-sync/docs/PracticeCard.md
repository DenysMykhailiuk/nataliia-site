---
category: Cards
---

# PracticeCard

The full description of one area of work: photograph, numbered heading, paragraph, a list
of "come if you…" lines, and a format footnote. Cards in a row stretch to equal height and
`meta` stays pinned to the bottom, so uneven list lengths still line up.

```jsx
<PracticeCard number="03" title="Стрес і тривога" id="stres-tryvoha"
  items={["часто відчуваєте постійний стрес і тривогу;"]}
  meta="Формат: групова терапія, індивідуальна терапія">
  Стрес і тривога є в житті кожного, але коли вони стають надмірними, це виснажує.
</PracticeCard>
```

Give each card an `id` — the homepage tiles link straight to it, and `scroll-margin-top`
already accounts for the sticky header. List items end with a semicolon, the last with a
full stop.
