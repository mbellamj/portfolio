# Marco Mbella — React portfolio

A complete React + TypeScript version of the latest bilingual portfolio. It preserves the warm ivory/green design, all résumé-based sections, the four line icons with **4 years / 2 years**, experience filtering, résumé downloads, the email-draft form, and a sun/moon theme toggle.

## Run locally

Use Node.js 24 or newer; `.nvmrc` selects version 24.

```bash
npm ci
npm run dev
```

Use the local URL printed by Vite. The portfolio works immediately with its bundled content. No external API, account or API key is required.

```bash
npm run typecheck
npm run validate:content
npm test
npm run build
npm run preview
```

`npm run build` produces `dist/`, which can be deployed to a static host. For a subdirectory deployment, set Vite's `base` in `vite.config.ts`, such as `base: '/portfolio/'`. Résumé assets and the default same-origin data endpoint use that base automatically.

## Organization

| Location | Responsibility |
| --- | --- |
| `src/app/` | App composition, providers, render-error boundary and page-level data states |
| `src/features/portfolio/components/` | Portfolio sections, each with a bounded UI responsibility |
| `src/features/portfolio/data/schema.ts` | Runtime content contract and inferred TypeScript domain types |
| `src/features/portfolio/data/repository.ts` | Bundled and HTTP content adapters behind one interface |
| `src/features/portfolio/data/queries.ts` | Query keys, loading/caching/retry policy and `usePortfolio` |
| `src/features/portfolio/data/portfolio.json` | Editable profile, highlights, skills, roles, services and education |
| `src/features/contact/` | Email-draft composition and contact UI; no mail is sent by the site |
| `src/shared/api/` | HTTP client, validated JSON responses, cancellation and normalized errors |
| `src/shared/i18n/` | French/English interface text and safe rich-text rendering |
| `src/shared/ui/` | Small reusable icons and text components |
| `src/styles/` | The original responsive visual system |
| `public/assets/` | Favicon and unchanged résumé PDF |
| `public/examples/portfolio.json` | Same-origin HTTP integration example |
| `docs/` | Architecture, API integration guide and generated JSON Schema |

## GitHub Pages

The deployment workflow tests and builds the portfolio for `/portfolio/` before publishing `dist/` to GitHub Pages. Publication must first be enabled in the repository settings. See [GitHub Pages deployment](docs/GITHUB-PAGES.md) for activation, visibility, permissions and future updates.

## Light / dark appearance

The header toggle uses a small sun/moon icon. Without a saved preference, it follows the device theme and listens for system changes. A user choice is stored under `portfolio-theme` and restored on the next visit. The head bootstrap applies the theme before the first paint; the React provider keeps controls, colors and browser theme metadata in sync.

Edit `src/styles/theme.css` for the palette. The toggle remains usable when browser storage is unavailable, and its label is localized for screen readers.

## Edit your content

1. Edit `src/features/portfolio/data/portfolio.json`. Provide both `fr` and `en` values for localized fields.
2. Keep every item ID stable so React can preserve item identity across updates.
3. Update interface text in `src/shared/i18n/fr.json` and `en.json` as needed.
4. Replace the PDF under `public/assets/` if the résumé changes.
5. Run `npm run example:sync`, `npm test` and `npm run build`.

Most portfolio content is data, rather than JSX. Components receive validated domain objects and do not import the content JSON or issue their own fetch requests.

## Connect an API or CMS

Copy `.env.example` to `.env` and switch to the included HTTP example:

```dotenv
VITE_DATA_SOURCE=http
VITE_API_BASE_URL=
VITE_PORTFOLIO_ENDPOINT=/examples/portfolio.json
```

Restart the dev server after changing environment variables. For a real API:

```dotenv
VITE_DATA_SOURCE=http
VITE_API_BASE_URL=https://api.example.com/v1
VITE_PORTFOLIO_ENDPOINT=/portfolio
```

This requests `https://api.example.com/v1/portfolio`. The endpoint must return the contract described in `docs/portfolio.schema.json`; it can use `public/examples/portfolio.json` as a working sample. See [data integration](docs/DATA-INTEGRATION.md) for CMS mapping, authentication and error behavior.

All `VITE_*` values are public browser configuration. Keep credentials and private service calls on your own backend. This export contains no hosting credentials, private Site identity, Git metadata or node_modules.

## Quality checks

The project includes tests for bilingual rendering, current highlights, filtering, résumé links, service selection, editable email drafts, UTF-8/query encoding, validated HTTP payloads, API base paths, retries and request/body cancellation. `npm run build` includes strict TypeScript checking and bundled-content contract validation.

Automated DOM tests use jsdom; browser screenshots and visual browser verification were unavailable during export. Styles and content were carried over from the current source. The live hosted portfolio is managed separately from this downloadable React copy.

## Content provenance

Experience and qualifications come from the supplied September 2026 résumé; early Upwork work comes from the user's account. The latest highlight figures and icons reflect the user's subsequent edits. No client projects, testimonials, investment recommendations or professional registration claims were invented. The architecture panel is illustrative, not a client-system screenshot.

## Primary references

- [React: build an app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)
- [Vite: getting started](https://vite.dev/guide/)
- [TanStack Query: overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zod: basic usage](https://zod.dev/basics)
