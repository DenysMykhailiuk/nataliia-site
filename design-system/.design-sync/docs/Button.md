---
category: Primitives
---

# Button

The site's only button, and always a link — there are no forms to submit. A fully
rounded clay pill in `solid`, outlined in `ghost`, and a white/outlined pair
(`light`, `outlineLight`) for use over the hero photograph. `size="sm"` is the
header's compact booking pill.

```jsx
<ButtonRow>
  <Button>Написати в Telegram</Button>
  <Button variant="ghost" href="tel:+380675069911">+38 067 506 9911</Button>
</ButtonRow>
```

Pair it with `ButtonRow`, which stacks the buttons to full width below 480px.
