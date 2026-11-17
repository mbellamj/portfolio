import { access, readFile } from 'node:fs/promises';
import { portfolioSchema } from '../src/features/portfolio/data/schema.ts';
const source = new URL('../src/features/portfolio/data/portfolio.json', import.meta.url);
const data = portfolioSchema.parse(JSON.parse(await readFile(source, 'utf8')));
for (const key of ['highlights', 'skills', 'experiences', 'freelance', 'services', 'education']) {
  const ids = data[key].map(item => item.id);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate content ID in ${key}`);
}
if (!/^https?:/.test(data.profile.cvAsset)) await access(new URL(`../public/${data.profile.cvAsset}`, import.meta.url));
console.log('Bundled content matches the schema; IDs and local résumé asset are valid.');
