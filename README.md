# Dorst Brewery — website

Next.js site for [Dorst Brewery](https://dorst.bg).

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 (or the port Next.js prints if 3000 is busy).

## Deploy

### Vercel (recommended)

This app uses middleware, API routes (Stripe), and server features. **Vercel** is the primary host — connect the repo and deploy from `main`.

Copy `.env.example` to `.env.local` and fill in the values for local development.

### GitHub Pages (static preview only)

A workflow builds a **static export** for preview/demo. API routes and middleware do not run on Pages.

1. **Settings → Pages → Source:** GitHub Actions
2. Push to `main`, or run **Actions → Deploy to GitHub Pages**

Preview URL: `https://freelance-cli3nts.github.io/dorst-web/`

To test the Pages build locally:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=freelance-cli3nts/dorst-web pnpm build
npx serve out -p 3001
# → http://localhost:3001/dorst-web/
```
