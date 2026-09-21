---
category: Content
---

# ReviewCard

A client testimonial on paper, for the reviews page. Pass paragraphs as children —
testimonials are verbatim client words and only ever formatted, never rewritten.
Inside a blockquote the site uses a spaced hyphen ` - ` rather than the em dash it
uses elsewhere.

```jsx
<ReviewList>
  <ReviewCard attribution="Олена, 34 роки">
    <p>Уперше за багато років я змогла говорити про те, що зі мною відбувається…</p>
  </ReviewCard>
</ReviewList>
```

`ReviewList` flows the cards into CSS columns so testimonials of very different
lengths pack without ragged gaps.
