---
category: Content
---

# ServiceRow

One therapy format as a full-width row: photograph on one side, description, what the
format suits, and the fee on the other. Alternate `reverse` down the page so the
photographs zig-zag. Below 900px every row stacks with the image on top.

```jsx
<ServiceList>
  <ServiceRow />
  <ServiceRow reverse number="02" title="Сімейна терапія" price="1900 грн" />
</ServiceList>
```

Fees are serif with lining numerals; `priceNote` says what the fee buys and
`availability` whether the format runs online.
