---
category: Layout
---

# TwoCol

Image beside text, 80px apart, collapsing to one column below 900px. Used once, for the
homepage bio.

```jsx
<TwoCol image="/assets/images/bio.jpg" imageAlt="Наталія Михайлюк">
  <h2>Наталія Михайлюк</h2>
  <Lede>Магістр клінічної психології та сертифікований гештальт-терапевт.</Lede>
  <StatRow />
</TwoCol>
```

It brings its own `Container`, so put it in a `Section` with `contained={false}`.
