# Selleck Elliott — Portfolio

Personal portfolio site that keeps itself up to date. React + Vite + TypeScript +
Tailwind single-page app, deployed to GitHub Pages.

## How content stays fresh

```
GitHub repos (topic: portfolio) ─────────────┐
                                             ├─> scripts/sync.mjs ─> src/content/dynamic.json ─> static build
public/resume.pdf ─ unpdf ─ GitHub Models ───┘
```

- **Projects** — `scripts/sync.mjs` pulls public repos tagged with the
  `portfolio` topic from the GitHub REST API.
- **Experience / skills / education / certifications** — the script extracts
  text from `public/resume.pdf` locally (via `unpdf`), then sends that text to
  GitHub Models (`openai/gpt-4o-mini`, temperature 0, strict JSON-only
  extraction) and validates the result. No extra API key needed — it
  authenticates with the built-in `GITHUB_TOKEN`.
- Results land in `src/content/dynamic.json`, which is committed back and baked
  into the static build. On any failure (or missing resume / token) the
  affected sections keep their previous values — empty data never overwrites
  good data.
- `.github/workflows/sync.yml` runs this weekly (Sundays 00:00 UTC), on manual
  dispatch, and whenever `public/resume.pdf` changes on `main`.
- `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

Hand-written copy (name, tagline, about, social links, baseline skills, and the
repo→demo-video map) lives in `src/content/data.ts`.

## Local development

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run sync     # refresh src/content/dynamic.json (GITHUB_TOKEN enables repo fetch auth + resume extraction)
```

## Setup checklist

1. Tag the repos that should appear on the site with the `portfolio` topic on GitHub.
2. Commit your resume as `public/resume.pdf` (see `public/RESUME_PLACEHOLDER.txt`).
   No API key or secret is needed — resume extraction uses GitHub Models with
   the workflow's built-in `GITHUB_TOKEN` (the sync workflow grants it
   `models: read` permission).
3. Rename this repo to `selleckelliott.github.io`. The Vite base is `/`, so the
   site will not render correctly at `/Personal_Website/` before the rename.
4. After the first deploy run, confirm Pages is serving from GitHub Actions
   (Settings → Pages); `actions/configure-pages` with `enablement: true`
   switches it from the legacy branch build automatically.
