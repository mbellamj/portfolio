import { requestJson } from '@/shared/api/client';
import type { AppConfig } from '@/shared/config/env';
import bundled from './portfolio.json';
import { portfolioSchema } from './schema';
import type { Portfolio } from './schema';

export interface PortfolioRepository {
  read: (signal?: AbortSignal) => Promise<Portfolio>;
  initialData: Portfolio | undefined;
}
export function createPortfolioRepository(config: AppConfig): PortfolioRepository {
  if (config.dataSource === 'bundled') {
    const data = portfolioSchema.parse(bundled);
    return { read: async () => data, initialData: data };
  }
  const endpoint = config.apiBaseUrl
    ? new URL(`${config.apiBaseUrl.replace(/\/$/, '')}${config.portfolioEndpoint}`).toString()
    : `${import.meta.env.BASE_URL}${config.portfolioEndpoint.replace(/^\//, '')}`;
  return { read: signal => requestJson(endpoint, portfolioSchema, signal), initialData: undefined };
}
