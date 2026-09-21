// Proves design-system/.site-dist/ identical to what GitHub Pages is serving.
//
//   1. File set: every file tracked at the reference commit must exist in the build, and the
//      build must contain nothing else.
//   2. Bytes: each file must be byte-for-byte equal to its content at the reference commit.
//   3. Live (with --live): each generated page must also be byte-equal to the page the
//      production site returns right now, fetched with a cache-busting query.
//
// Reference commit: `--ref <commit>` if given (CI passes HEAD, so the build must equal the site
// files committed alongside it); otherwise origin/main — what the Site workflow deploys. Run
// `git fetch` first so that is current. Exits 1 on any failure.
//
// design-system/, .github/ and .gitattributes are the tooling that builds and deploys the
// site. They are never part of the website, so they are excluded from the reference file set.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DS = fileURLToPath(new URL('..', import.meta.url));
const SITE = join(DS, '..');
const OUT = join(DS, '.site-dist');
const LIVE = process.argv.includes('--live');
const git = (...a) => execFileSync('git', a, { cwd: SITE, maxBuffer: 64 << 20 });

const refArg = process.argv.indexOf('--ref');
// Not pages/builds/latest: that endpoint only records branch-published builds, and has been
// frozen at the last branch-published build since Pages moved to GitHub Actions.
const ref = git('rev-parse', refArg > 0 ? process.argv[refArg + 1] : 'origin/main').toString().trim();
console.log(`reference: ${ref.slice(0, 7)} (${git('log', '-1', '--format=%s', ref).toString().trim()})`);

const NOT_SITE = /^(design-system\/|\.github\/|\.gitattributes$)/;
const tracked = git('ls-tree', '-r', '--name-only', ref).toString().trim().split('\n').filter((f) => !NOT_SITE.test(f));
const built = (function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [relative(OUT, p).replace(/\\/g, '/')];
  });
})(OUT);

const failures = [];
for (const f of tracked) if (!built.includes(f)) failures.push(`missing from build: ${f}`);
for (const f of built) if (!tracked.includes(f)) failures.push(`extra in build: ${f}`);

let identical = 0;
for (const f of tracked.filter((t) => built.includes(t))) {
  const want = git('show', `${ref}:${f}`);
  const got = readFileSync(join(OUT, f));
  if (Buffer.compare(want, got) === 0) { identical++; continue; }
  const a = want.toString('utf8').split('\n');
  const b = got.toString('utf8').split('\n');
  const i = a.findIndex((l, n) => l !== b[n]);
  failures.push(`differs: ${f} (${want.length} vs ${got.length} bytes), first at line ${i + 1}\n    deployed: ${JSON.stringify(a[i])}\n    built:    ${JSON.stringify(b[i])}`);
}
console.log(`files: ${tracked.length} deployed, ${built.length} built, ${identical} byte-identical`);

if (LIVE) {
  const pages = tracked.filter((f) => f.endsWith('index.html'));
  for (const f of pages) {
    const path = f === 'index.html' ? '/' : '/' + f.replace(/index\.html$/, '');
    const res = await fetch(`https://www.nataliiamykhailiuk.com${path}?nc=${Date.now()}`);
    const live = Buffer.from(await res.arrayBuffer());
    const same = Buffer.compare(live, readFileSync(join(OUT, f))) === 0;
    console.log(`live ${path.padEnd(12)} ${same ? 'identical' : 'DIFFERS'}`);
    if (!same) failures.push(`differs from live: ${path}`);
  }
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} failure(s):\n` + failures.map((f) => '  ' + f).join('\n'));
  process.exit(1);
}
console.log('\n✓ build is byte-identical to the deployed site');
