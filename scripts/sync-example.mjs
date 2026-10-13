import { copyFile } from 'node:fs/promises';
await copyFile(new URL('../src/features/portfolio/data/portfolio.json', import.meta.url), new URL('../public/examples/portfolio.json', import.meta.url));
console.log('Synced the API example from the bundled content.');
