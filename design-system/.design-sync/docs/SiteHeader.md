---
category: Chrome
---

# SiteHeader

Sticky translucent header: wordmark, five links, and a compact booking pill. Pass
`current` as the active page's href to mark it.

The menu is at its width limit. Five labels need about 418px on one line, so phones get a
fixed 3 + 2 grid and narrow landscape hides the header button — the floating `StickyCta`
is always reachable. A sixth item needs re-measuring before it can be added.

```jsx
<SiteHeader current="/services/" />
```

`logoDescription` is the word under the wordmark; it is an open brand decision between
the English "Psychotherapy" and "Психотерапія".
