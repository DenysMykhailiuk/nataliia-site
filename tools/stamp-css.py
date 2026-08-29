"""Stamp every page's stylesheet link with a hash of the stylesheet.

GitHub Pages serves this site with `Cache-Control: max-age=600`, and HTML and
CSS expire independently.  A visitor who already had the site open can there-
fore fetch freshly-updated HTML while still holding the previous stylesheet,
which renders the new markup under the old rules.  That is not hypothetical:
it shipped a header whose wordmark collapsed onto one line and slid under the
booking button.

Putting the stylesheet's own content hash in its URL makes the pairing
impossible -- changed CSS is a different URL, so it can never be served from a
cache entry belonging to the previous version.

Run this after any edit to assets/css/style.css, before committing:

    python tools/stamp-css.py
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = ROOT / 'assets' / 'css' / 'style.css'
PAGES = ['index.html', 'practice/index.html',
         'services/index.html', 'contacts/index.html']
LINK = re.compile(r'(href="[^"]*assets/css/style\.css)(\?v=[0-9a-f]+)?"')


def main():
    if not CSS.is_file():
        sys.exit('not found: %s' % CSS)
    digest = hashlib.md5(CSS.read_bytes()).hexdigest()[:8]

    changed = []
    for name in PAGES:
        page = ROOT / name
        text = page.read_text(encoding='utf-8')
        stamped, n = LINK.subn(r'\1?v=%s"' % digest, text)
        if n != 1:
            sys.exit('%s: expected 1 stylesheet link, found %d' % (name, n))
        if stamped != text:
            page.write_text(stamped, encoding='utf-8', newline='')
            changed.append(name)

    print('style.css?v=%s' % digest)
    print('  updated: %s' % (', '.join(changed) if changed
                             else 'nothing (already current)'))


if __name__ == '__main__':
    main()
