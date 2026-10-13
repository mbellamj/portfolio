import { z } from 'zod';

const httpUrl = z.url({ protocol: /^https?$/ });
const envSchema = z.object({
  dataSource: z.enum(['bundled', 'http']).default('bundled'),
  apiBaseUrl: z.union([z.literal(''), httpUrl]).default(''),
  portfolioEndpoint: z.string().regex(/^\/(?!\/)/).default('/examples/portfolio.json'),
  siteUrl: z.union([z.literal(''), httpUrl]).default(''),
});

export type AppConfig = z.infer<typeof envSchema>;
export const appConfig = envSchema.parse({
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'bundled',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  portfolioEndpoint: import.meta.env.VITE_PORTFOLIO_ENDPOINT || '/examples/portfolio.json',
  siteUrl: import.meta.env.VITE_SITE_URL || '',
});
