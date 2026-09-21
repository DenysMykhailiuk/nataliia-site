---
category: Primitives
---

# ButtonRow

Lays two buttons side by side with a 14px gap. Below 480px they stack to full width —
deliberately, because their natural widths differ by about 23px and a wrapped row reads as
a mistake rather than a choice.

```jsx
<ButtonRow centered>
  <Button>Написати в Telegram</Button>
  <Button variant="ghost" href="tel:+380675069911">+38 067 506 9911</Button>
</ButtonRow>
```

With no children it renders the pair the site uses everywhere: Telegram and the phone number.
