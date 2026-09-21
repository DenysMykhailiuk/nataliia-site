---
category: Content
---

# ContactRow

One way to get in touch: icon, bold label, muted description, and a clay arrow. The whole
row is the link. Channels with an icon image pass `icon`; the phone and email rows pass an
empty `icon` and a serif `glyph` instead (`☏`, `✉`).

```jsx
<ContactRow title="+38 067 506 9911" href="tel:+380675069911" icon="" glyph="☏" external={false}>
  Телефон і Viber
</ContactRow>
```

Long addresses break anywhere rather than overflowing the row.
