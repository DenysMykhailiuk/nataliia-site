---
category: Content
---

# ContactGrid

Two equal columns 80px apart: contact channels on the left, map and office card on the
right. Stacks below 900px.

```jsx
<ContactGrid>
  <h1>Напишіть мені</h1>
  <Lede>Кількох рядків про те, що вас турбує, достатньо.</Lede>
  <ContactList />
</ContactGrid>
```

It brings its own `Container`, so place it in a `Section` with `contained={false}`.
