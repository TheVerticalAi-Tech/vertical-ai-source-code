# Project Knowledge

Public marketing website for **The Vertical AI** (enterprise AI orchestration company) — Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4. Content-heavy: homepage, industry/platform/product pages, case studies, blog, careers, legal pages, lead-gen forms.

> Note: `COMPANY_WEBSITE_ARCHITECTURE.md` (2026-09-10) is **partially outdated** — Prisma/Postgres has since been removed; content now comes from a separate admin CMS over HTTP. Trust the code + this file over that doc.

## Architecture

**No database in this repo.** Content is authored in a separate admin CMS project (not in this repo) and consumed here over HTTP:

```
Admin CMS (separate project)  ←── writes
        ▲
        │ HTTP (CMS_API_URL)
This repo:
  - Client components fetch this repo's /api/* routes
  - /api/* routes proxy to the CMS public API (src/lib/cms-api.ts)
  - Form posts (get-demo, apply-job, support) are forwarded to the CMS
```

### Key locations
- `src/app/` — App Router pages (`industry-detail`, `platform-detail`, `case-study-detail`, `blog`, `careers`, `why-us/[slug]`, legal pages, `get-demo`, `support`, ...)
- `src/app/api/` — 13 route groups; GETs are public proxies to the CMS, writes require `Bearer ADMIN_API_KEY` (`src/app/api/auth.ts` → `verifyAuth`). Exception: `/api/job-applications` requires auth even for GET (applicant PII).
- `src/lib/cms-api.ts` — shared CMS fetch helper. CMS wraps lists under resource-specific keys (`{ jobs: [...] }`, `{ blogs: [...] }`), **not** a common `{ success, data }` shape, and ignores query params — filter locally after fetching.
- `src/lib/site.ts` — `SITE_URL` + `absoluteUrl()` for sitemap/robots/JSON-LD (CMS images may be root-relative paths).
- `src/components/landing-page/` — page-section components; `src/components/ui/` — shadcn/ui primitives (Radix); `src/components/Skeleton-loading/` — loading skeletons.
- `src/data/careers-db.json` — flat-file store still used by `/api/careers/[id]` (inconsistent with everything else, pending cleanup).

### Conventions
- API responses: `{ success: boolean, data?, error? }`.
- Server Components query nothing directly — most pages are client components fetching `/api/*`; legal pages (`privacy-policy`, `terms-conditions`, `security`, `cookies`) fetch server-side.
- CMS data arrives flat; client code reshapes it into the nested prop shape presentational components expect. **Field-name mismatches between CMS payloads and components are the #1 source of bugs here** (e.g. `image` vs `imageUrl`, `tag1/tag2` vs `tags[]`, `desc` vs `description`) — see the regression checklist in `TEST_CASES.md` §4.
- Icons on nav dropdowns/cards are cycled from a fixed local set (CMS has no icon field) — expected, not a bug.
- Styling: Tailwind v4 + `tailwind-merge`/`cva`; animation via framer-motion/`motion`, GSAP, tsparticles.

### Gotchas
- `next.config.ts` sets `images.unoptimized: true` and ignores TS/lint errors during builds — a passing build does **not** mean type-clean.
- CMS unreachable ⇒ pages should show loading/error states, never crash; forms must never show false success when the CMS errors (regression-tested).
- Both `pnpm-lock.yaml` and `package-lock.json` exist — confirm which lockfile is authoritative before changing deps.
- Dead/unused deps in `package.json` (axios, @aws-sdk/*, @google/generative-ai, @react-oauth/google, svg-captcha, next-sitemap, jspdf family) — don't assume they're wired up.
- The "I'm not a robot" checkbox on `/get-demo` is decorative (UI gate only, no real bot protection).
- `src/data/careers.ts`, `industry-faqs.json`, `platform-faqs.json` are dead legacy data files.

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
```

- **No test framework** — testing is manual via `TEST_CASES.md` (QA test cases; requires the admin CMS running — nearly every page depends on it).
- Requires the admin CMS reachable at `CMS_API_URL` (defaults to `http://localhost:3000`) for all content.

## Environment variables

| Var | Purpose |
|---|---|
| `CMS_API_URL` | Base URL of the admin CMS API (all content reads + form forwards) |
| `ADMIN_API_KEY` | Bearer token for this repo's write endpoints (POST/PUT/DELETE) |
| `SITE_URL` | Canonical production URL (sitemap/robots/canonical/JSON-LD) |

GTM/GA4 IDs are hardcoded in `src/app/layout.tsx` (public by design).

## When making changes

- Never assume success on form submissions without checking the CMS response shape.
- Test every slug on list/detail pages, not just one — past bugs were per-slug data-shape issues.
- If a page section renders blank/gray, suspect a CMS field-name mismatch before assuming a rendering bug.
