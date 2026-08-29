"""Rebuild the stacked logo as a single-line script wordmark.

The two script words interlock in the source artwork, so a rectangular crop
cannot separate them.  Their ink never touches, though, so connected-component
labelling lifts each one out exactly.  They are then set side by side on a
shared baseline at native scale, which keeps them optically identical to the
original.  "Psychotherapy" is dropped: it becomes live text in the page.
"""
import sys
from PIL import Image

TH = 40          # alpha threshold for "ink"
GAP = 34         # word space, in source pixels
Y_PSYCHO = 238   # everything below this is the descriptor band
Y_UPPER = 125    # a word ending above this is the upper script word


def components(alpha, w, h):
    lab = [[0] * w for _ in range(h)]
    out = []
    cur = 0
    for y in range(h):
        for x in range(w):
            if alpha[x, y] > TH and lab[y][x] == 0:
                cur += 1
                stack = [(x, y)]
                lab[y][x] = cur
                minx = maxx = x
                miny = maxy = y
                while stack:
                    cx, cy = stack.pop()
                    if cx < minx: minx = cx
                    if cx > maxx: maxx = cx
                    if cy < miny: miny = cy
                    if cy > maxy: maxy = cy
                    for dx in (-1, 0, 1):
                        for dy in (-1, 0, 1):
                            nx, ny = cx + dx, cy + dy
                            if 0 <= nx < w and 0 <= ny < h and lab[ny][nx] == 0 \
                                    and alpha[nx, ny] > TH:
                                lab[ny][nx] = cur
                                stack.append((nx, ny))
                out.append((cur, (minx, miny, maxx, maxy)))
    return lab, out


def baseline(img):
    """Bottom of the lowercase body, ignoring descenders."""
    w, h = img.size
    a = img.split()[-1].load()
    prof = [sum(1 for x in range(w) if a[x, y] > TH) for y in range(h)]
    mx = max(prof)
    for y in range(prof.index(mx), h):
        if prof[y] < mx * 0.18:
            return y
    return h - 1


def extract(src, dst):
    im = Image.open(src).convert('RGBA')
    w, h = im.size
    px = im.load()
    lab, comps = components(im.split()[-1].load(), w, h)

    groups = {'upper': set(), 'lower': set()}
    for cid, (_, miny, _, maxy) in comps:
        if miny >= Y_PSYCHO:
            continue                      # the descriptor; becomes live text
        groups['upper' if maxy <= Y_UPPER else 'lower'].add(cid)

    words = []
    for key in ('upper', 'lower'):
        layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        q = layer.load()
        ids = groups[key]
        for y in range(h):
            for x in range(w):
                if lab[y][x] in ids:
                    q[x, y] = px[x, y]
        words.append(layer.crop(layer.split()[-1].getbbox()))

    up, lo = words
    b_up, b_lo = baseline(up), baseline(lo)
    drop = b_lo - b_up                    # align the two baselines
    out = Image.new(
        'RGBA',
        (up.size[0] + GAP + lo.size[0], max(lo.size[1], drop + up.size[1])),
        (0, 0, 0, 0),
    )
    out.paste(up, (0, drop), up)
    out.paste(lo, (up.size[0] + GAP, 0), lo)
    out = out.crop(out.split()[-1].getbbox())
    out.save(dst, optimize=True)
    print('  %-34s %sx%s  ratio %.3f' % (dst, out.size[0], out.size[1],
                                         out.size[0] / out.size[1]))


if __name__ == '__main__':
    extract(sys.argv[1], sys.argv[2])
