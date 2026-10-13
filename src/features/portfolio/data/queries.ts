import { queryOptions, useQuery } from '@tanstack/react-query';
import { ApiError, isAbortError } from '@/shared/api/client';
import { appConfig } from '@/shared/config/env';
import type { AppConfig } from '@/shared/config/env';
import { createPortfolioRepository } from './repository';
import type { PortfolioRepository } from './repository';

export const portfolioKeys = {
  all: ['portfolio'] as const,
  content: (config: AppConfig) => [...portfolioKeys.all, config.dataSource, config.apiBaseUrl, config.portfolioEndpoint] as const,
};
export function portfolioQueryOptions(config: AppConfig, repository = createPortfolioRepository(config)) {
  return queryOptions({
    queryKey: portfolioKeys.content(config),
    queryFn: ({ signal }) => repository.read(signal),
    ...(repository.initialData ? { initialData: repository.initialData } : {}),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (isAbortError(error)) return false;
      if (error instanceof ApiError && (error.kind === 'validation' || error.kind === 'decode' || (error.status !== undefined && error.status >= 400 && error.status < 500))) return false;
      return failureCount < 2;
    },
  });
}
const defaultRepository = createPortfolioRepository(appConfig);
/** One query loads the complete page; components never fetch independently. */
export function usePortfolio(repository: PortfolioRepository = defaultRepository) {
  return useQuery(portfolioQueryOptions(appConfig, repository));
}
