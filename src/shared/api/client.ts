import type { ZodType } from 'zod';

export class ApiError extends Error {
  readonly kind: 'network' | 'http' | 'decode' | 'validation';
  readonly status: number | undefined;

  constructor(message: string, kind: ApiError['kind'], status?: number) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
  }
}

export function isAbortError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError';
}

/** The schema, rather than a type assertion, determines the validated output. */
export async function requestJson<T>(url: string, schema: ZodType<T>, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'omit',
      signal: signal ?? null,
    });
  } catch (error) {
    if (isAbortError(error) || signal?.aborted) throw error;
    throw new ApiError('The content service could not be reached.', 'network');
  }
  if (!response.ok) throw new ApiError(`The content request failed (HTTP ${response.status}).`, 'http', response.status);

  let payload: unknown;
  try { payload = await response.json(); }
  catch (error) {
    if (isAbortError(error) || signal?.aborted) throw error;
    throw new ApiError('The content service returned invalid JSON.', 'decode');
  }

  const result = schema.safeParse(payload);
  if (!result.success) throw new ApiError('The returned content does not match the portfolio contract.', 'validation');
  return result.data;
}
