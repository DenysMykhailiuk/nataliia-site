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

The word under the wordmark is **"Psychotherapy", in English, on purpose.** It is a settled
brand choice. It pairs with the Latin-script name, even though everything else on the site is
Ukrainian. Leave `logoDescription` at its default, and never translate it to "Психотерапія".
