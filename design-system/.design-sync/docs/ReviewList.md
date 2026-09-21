---
category: Content
---

# ReviewList

Flows `ReviewCard`s into CSS columns from 420px wide, so testimonials of very different
lengths pack without ragged gaps. Cards never split across a column break.

```jsx
<ReviewList>
  <ReviewCard attribution="Юлія, 50 років"><p>…</p></ReviewCard>
</ReviewList>
```

Long testimonials go first and the short ones last.
