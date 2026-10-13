# Architecture

This is a single-page portfolio. Vite is used as a straightforward build tool; no router or global state store is necessary for the existing anchor navigation and small amount of UI state. The app uses React state for forms/filters, an i18n context for language, and TanStack Query for content from a repository.

The page receives one validated content document through a repository and a query cache. The repository can use bundled JSON or HTTP; section components use the same domain types in either mode.


The bundled adapter validates on construction and seeds the query cache. This makes the default page available immediately. The HTTP adapter validates every response before it reaches React. One query loads the complete content document, avoiding a chain of fetches from individual sections.

Components use stable item IDs for domain records. UI translations are kept separate from domain content. Rich-text UI copy is a small typed vocabulary of text, line breaks and emphasis; there is no `dangerouslySetInnerHTML` or remote HTML insertion.

## Failures and cancellation

- An unavailable first load presents an explicit loading/error panel with a retry button.
- A failed later refresh keeps previously cached content and displays a short status message.
- Client errors, malformed JSON and schema-validation failures are not retried automatically.
- Network/server failures have at most two retries.
- The query's AbortSignal reaches `fetch`; cancellation during fetch or response parsing is preserved.
- The app-level error boundary covers rendering failures, separately from query errors.

## Growth path

Add new domain features under `src/features/`. Keep their schemas, repositories and queries with the feature. Put shared HTTP behavior and small UI primitives under `src/shared/`; avoid a generic `utils` folder containing unrelated concerns.

If the portfolio becomes a multi-route application, add route-level data loading. If search indexing or static/server rendering becomes a major requirement, move the same components/data boundary into a React framework suited to that rendering model. The current export is a client-rendered SPA with an initial HTML shell; it does not provide SSR or a backend.
