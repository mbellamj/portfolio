import { mkdir, writeFile } from 'node:fs/promises';
import { z } from 'zod';
import { portfolioSchema } from '../src/features/portfolio/data/schema.ts';
await mkdir(new URL('../docs/', import.meta.url), { recursive: true });
const json = z.toJSONSchema(portfolioSchema, { target: 'draft-7' });
await writeFile(new URL('../docs/portfolio.schema.json', import.meta.url), JSON.stringify(json, null, 2) + '\n');
console.log('Exported docs/portfolio.schema.json');
