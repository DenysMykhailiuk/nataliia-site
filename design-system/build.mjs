// Builds the component library:
//   1. dist/index.d.ts + per-file declarations, via tsc (the API contract /design-sync reads)
//   2. dist/index.es.js, via esbuild (the bundle the design agent imports)
//   3. dist/style.css — the SITE's own stylesheet, copied with image URLs made absolute
//      so the cards render with the real photographs outside the site's directory layout.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const root = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(root, '..');
const dist = join(root, 'dist');
const SITE = 'https://www.nataliiamykhailiuk.com';

mkdirSync(dist, { recursive: true });

// 1. Declarations
execFileSync(process.execPath, [join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', 'tsconfig.json'], {
  cwd: root,
  stdio: 'inherit',
});

// 2. Bundle
await esbuild.build({
  entryPoints: [join(root, 'src', 'index.ts')],
  outfile: join(dist, 'index.es.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2022',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'info',
});

// 3. Stylesheet — the live site's file, untouched except for asset URLs and the webfont link,
//    both of which are relative to the site's own directory layout and can't survive the copy.
const css = readFileSync(join(siteRoot, 'assets', 'css', 'style.css'), 'utf8');
const fonts =
  "@import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400&family=Commissioner:wght@400;500;600&display=swap');\n";
const rewritten = css.replace(/url\("\.\.\/images\/([^"]+)"\)/g, `url("${SITE}/assets/images/$1")`);
if (rewritten === css) throw new Error('image URL rewrite matched nothing — check style.css');
writeFileSync(join(dist, 'style.css'), fonts + rewritten, { encoding: 'utf8' });

console.log('built dist/index.es.js, dist/index.d.ts, dist/style.css');
