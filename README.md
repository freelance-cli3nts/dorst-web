# Dorst — client design previews

Two brewery website concepts in one repo, deployed together on GitHub Pages.

| Version | Path | Source |
|--------|------|--------|
| **A — Static HTML** | `/html-static/` | `versions/html-static/` |
| **B — Next.js** | `/nextjs-app/` | `versions/nextjs-app/` |

After deploy, open the **hub** at your Pages URL (repo root) to choose a version.

## Local development

**Static HTML** — open the file or serve the folder:

```bash
npx serve versions/html-static
# → http://localhost:3000
```

**Next.js** (no `basePath` locally):

```bash
cd versions/nextjs-app
pnpm install
pnpm dev
# → http://localhost:3000
```

Preview the same paths as GitHub Pages (optional):

```bash
cd versions/nextjs-app
GITHUB_PAGES=true GITHUB_REPOSITORY=your-user/dorst-web pnpm build
npx serve out -p 3001
# → http://localhost:3001/dorst-web/nextjs-app/
```

Replace `dorst-web` with your GitHub repo name.

## Deploy to GitHub Pages

1. **Create a GitHub repo** and push this project:

   ```bash
   git init
   git add .
   git commit -m "Organize Dorst design previews for GitHub Pages"
   git remote add origin git@github.com:YOUR_USER/dorst-web.git
   git push -u origin main
   ```

2. **Enable Pages** in the repo on GitHub:
   - **Settings → Pages**
   - **Build and deployment → Source:** **GitHub Actions** (not “Deploy from branch”)

3. **Trigger a deploy** — push to `main` (or run the workflow manually under **Actions → Deploy to GitHub Pages → Run workflow**).

4. **Share with the client** (replace `YOUR_USER` and repo name if different):

   - Hub: `https://YOUR_USER.github.io/dorst-web/`
   - Version A: `https://YOUR_USER.github.io/dorst-web/html-static/`
   - Version B: `https://YOUR_USER.github.io/dorst-web/nextjs-app/`

The workflow (`.github/workflows/deploy-pages.yml`) builds the Next.js app as a static export with the correct `basePath`, copies the HTML version, and publishes both under one site.

## Project layout

```text
dorst-web/
├── docs/
│   └── index.html          # Hub page (copied into deploy on CI)
├── versions/
│   ├── html-static/
│   │   └── index.html      # Version A
│   └── nextjs-app/         # Version B (Next.js 16)
├── .github/workflows/
│   └── deploy-pages.yml
└── README.md
```

## Notes

- `brand-website-generation.zip` is ignored; the extracted app lives in `versions/nextjs-app/`.
- If the repo is renamed, update `GITHUB_REPOSITORY` / `basePath` automatically via CI — no manual edit unless you test Pages locally with a different name.
