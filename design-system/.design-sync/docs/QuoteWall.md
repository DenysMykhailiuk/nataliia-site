---
category: Content
---

# QuoteWall

The dark bark-coloured testimonial band — the one inverted section on the homepage. Holds
three short `Quote`s and a link through to the full reviews page.

```jsx
<QuoteWall eyebrow="Відгуки клієнтів" moreHref="/reviews/">
  <Quote attribution="Олена, 34 роки">«…»</Quote>
</QuoteWall>
```

Pass `moreHref={null}` to drop the link when the band is already on the reviews page.
