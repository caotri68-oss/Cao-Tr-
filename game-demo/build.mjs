import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

const result = await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  write: false,
});

const code = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = readFileSync('src/template.html', 'utf8').replace(
  '<!--SCRIPT-->',
  () => `<script>${code}</script>`,
);
writeFileSync('stick-island.html', html);
console.log(`stick-island.html: ${(html.length / 1024).toFixed(0)} KB`);
