# Data integration

## Content contract

`src/features/portfolio/data/schema.ts` defines `portfolioSchema`; all TypeScript domain types are inferred from it. External content is treated as unknown until the schema accepts it. A CMS or backend should expose one JSON document containing:

| Field | Contents |
| --- | --- |
| `profile` | Name, email, location, role, biography and résumé asset path |
| `highlights` | Stable IDs, supported icon names, optional localized values and localized description lines |
| `skills` | Groups, descriptions and technologies |
| `experiences` | Stable IDs, category, dates, location, role, summary, contributions and technologies |
| `freelance` | The early web/mobile/design experience |
| `services` | Software, design and finance service descriptions |
| `education` | Qualifications, dates and description lines |

Every localized text field contains `fr` and `en`. Multiline descriptions contain arrays of strings, not HTML. Use the sample document at `public/examples/portfolio.json` and the generated JSON Schema at `docs/portfolio.schema.json` to map a CMS response.

```bash
npm run schema:export
npm run example:sync
```

The former updates the contract documentation after schema changes. The latter refreshes the HTTP example after changing bundled content. Neither command contacts an external service.

## Configure a source

`src/shared/config/env.ts` validates public configuration. `createPortfolioRepository` chooses an adapter without changing any section components.

- `bundled` validates the local document and seeds the cache; it is the default.
- `http` performs a GET and validates the response before returning a `Portfolio`.
- With an empty API base URL, the endpoint follows Vite's deployment base on the same origin.
- With an API base URL, the endpoint is appended to that base, preserving a prefix such as `/v1`.
- Cross-origin endpoints need the appropriate server CORS configuration. The default client sends no cookies or authorization headers.

The query key includes the source mode, API base and endpoint. Content is fresh for five minutes and retained in the cache for thirty minutes. Window-focus refetch is disabled for this mostly static portfolio; adjust these policies in `queries.ts` to match the update frequency of your backend.

## Private integrations

Do not put API keys, tokens or private CMS credentials in `.env` values beginning with `VITE_`; those values are compiled into the browser bundle. Use a backend or backend-for-frontend when authentication or secrets are required. If you add cookie-based authentication, deliberately change the HTTP client's credential policy and configure the server accordingly.

Only content JSON is fetched. The contact form prepares an encoded `mailto:` draft and does not post to a backend. For real mail delivery, add a dedicated contact API, server-side validation, appropriate protections, and pending/success/error states in the contact feature.

## Verification

`repository.test.ts` checks bundled and HTTP adapters, contract failures, retries, URL composition and cancellation. `App.test.tsx` checks that the same UI interactions work with validated content. Add contract tests for your own backend mapping when integrating it.
