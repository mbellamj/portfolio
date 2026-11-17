import { afterEach, describe, expect, it, vi } from 'vitest';
import { createPortfolioRepository } from './repository';
import { portfolioSchema } from './schema';
import { portfolioQueryOptions } from './queries';
import { ApiError } from '@/shared/api/client';
import content from './portfolio.json';
import type { AppConfig } from '@/shared/config/env';

const config: AppConfig = { dataSource: 'http', apiBaseUrl: 'https://api.example.com', portfolioEndpoint: '/portfolio', siteUrl: '' };
afterEach(() => vi.unstubAllGlobals());
describe('portfolio data boundary', () => {
  it('validates bundled content and preserves the latest highlights', async () => {
    const repository = createPortfolioRepository({ ...config, dataSource: 'bundled' });
    const result = await repository.read();
    expect(result.highlights.map(item => item.icon)).toEqual(['code', 'cash', 'graduation', 'certificate']);
    expect(result.highlights[0]?.value?.en).toBe('4 years');
    expect(result.highlights[1]?.value?.en).toBe('2 years');
    expect(result.experiences).toHaveLength(5);
    expect(repository.initialData).toEqual(result);
  });
  it('fetches and validates HTTP data while forwarding cancellation', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify(content), { status: 200 }));
    vi.stubGlobal('fetch', fetcher);
    const signal = new AbortController().signal;
    await expect(createPortfolioRepository(config).read(signal)).resolves.toEqual(portfolioSchema.parse(content));
    expect(fetcher).toHaveBeenCalledWith('https://api.example.com/portfolio', expect.objectContaining({ signal, method: 'GET', credentials: 'omit' }));
  });
  it('rejects structurally invalid API data without silently using bundled content', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"experiences":[]}', { status: 200 })));
    await expect(createPortfolioRepository(config).read()).rejects.toMatchObject({ kind: 'validation' });
  });
  it('reports HTTP failures and excludes client errors from retries', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Not found', { status: 404 })));
    await expect(createPortfolioRepository(config).read()).rejects.toMatchObject({ kind: 'http', status: 404 });
    const options = portfolioQueryOptions(config);
    expect(typeof options.retry).toBe('function');
    if (typeof options.retry === 'function') {
      expect(options.retry(0, new ApiError('Not found', 'http', 404))).toBe(false);
      expect(options.retry(0, new ApiError('Unavailable', 'http', 503))).toBe(true);
      expect(options.retry(2, new ApiError('Unavailable', 'http', 503))).toBe(false);
    }
  });
  it('preserves abort errors rather than converting them to network errors', async () => {
    const abort = new DOMException('Cancelled', 'AbortError');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abort));
    await expect(createPortfolioRepository(config).read()).rejects.toBe(abort);
  });
});

it('preserves cancellation while consuming a response body', async () => {
  const abort = new DOMException('Cancelled while reading JSON', 'AbortError');
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => { throw abort; } }));
  await expect(createPortfolioRepository(config).read()).rejects.toBe(abort);
});
it('retains an API base path when composing the endpoint', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify(content), { status: 200 }));
  vi.stubGlobal('fetch', fetcher);
  await createPortfolioRepository({ ...config, apiBaseUrl: 'https://api.example.com/v1/' }).read();
  expect(fetcher).toHaveBeenCalledWith('https://api.example.com/v1/portfolio', expect.any(Object));
});
