# GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys this portfolio when `main` changes. It can also be started from the Actions tab with **Run workflow**.

## Activation

GitHub Free requires a public repository for Pages. Before changing visibility, review the complete repository and its history: the profile content, contact address and résumé PDF will become public along with the code.

After authorizing public publication:

1. Make `mbellamj/portfolio` public under **Settings → General → Change visibility**.
2. Select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**.
3. Merge the deployment configuration into `main`. The workflow will start automatically.
4. Wait for both `build` and `deploy` to succeed. Use the URL reported by the deployment or Pages settings as the published URL.

## Build and paths

The build uses Node.js 24 from `.nvmrc`, `npm ci`, the existing tests, TypeScript checking and content validation. Only `dist/` is published. Dependencies, source files and environment files are not part of the deployed artifact, although the repository itself is public.

The production command sets Vite's base to the project path:

```bash
npm run build -- --base=/portfolio/
```

This keeps local development at its default base while rewriting JavaScript, styles, the favicon and the theme bootstrap for `/portfolio/`. The résumé link and same-origin data integration also use `import.meta.env.BASE_URL`.

To preview the production build locally:

```bash
npm run preview -- --base=/portfolio/
```

Open the local URL at `/portfolio/`. The site uses section anchors rather than client-side routes, so no SPA rewrite is needed.

If the repository is renamed, update the workflow's `--base` argument. A user site or custom domain uses `--base=/` instead.

## Permissions and updates

The build job can only read repository contents. The deployment job has `pages: write` and `id-token: write`, the permissions needed by the official GitHub Pages actions. No personal access token or paid service is required.

Edit content in `src/features/portfolio/data/portfolio.json`, synchronize the HTTP example with `npm run example:sync`, and push changes to `main` to rebuild and publish. If a build fails, the previous successful deployment remains live.

## References

- [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Publishing source configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages)
