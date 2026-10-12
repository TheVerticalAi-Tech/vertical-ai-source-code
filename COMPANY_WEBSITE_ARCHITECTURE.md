# The Vertical AI — Company Website Architecture Audit

**Audit date:** 2026-09-10
**Scope:** `D:\Vertical AI\vertical-ai-source-code` (this repository only — the sibling `D:\Vertical AI\admin CMS` project was observed but not inspected in depth)
**Method:** Static code inspection only. No code was modified to produce this document.

Throughout this document, findings are marked as either:
- **Found in code** — confirmed by direct inspection of source files
- **Recommendation** — my suggestion, not something that exists today
- **Not found** / **Unable to determine** — explicitly could not be confirmed from the code

---

## 1. Project Overview

This repository is the **public marketing website** for "The Vertical AI" (an enterprise AI orchestration company), built on **Next.js 15** (App Router). It is a content-heavy site: homepage, industry pages, platform/product pages, case studies, blog, careers, legal pages, and lead-generation forms.

**Found in code:** the site increasingly reads its content from a shared **PostgreSQL** database via **Prisma ORM**, rather than from hardcoded constants — this migration was done incrementally (see §9). Some pages still call an **external legacy PHP backend** (`theverticalai.top` / `thevertical.top`) instead of this project's own database or API.

There is **no admin UI inside this repository**. Content authoring happens in a separate, sibling project (`D:\Vertical AI\admin CMS`) that was observed running its own Next.js dev server and Prisma Studio instance against the **same** `DATABASE_URL` during this audit. This repo's Prisma schema was built by introspecting that shared database, not by designing it independently.

---

## 2. Technology Stack

**Found in code (`package.json`):**

| Layer | Technology |
|---|---|
| Framework | Next.js `^15.5.6` (App Router), React `^19.2.0` |
| Language | TypeScript `^5.9.3` |
| Styling | Tailwind CSS `^4.1.17`, `tailwindcss-animate`, `tailwind-merge`, `class-variance-authority` |
| UI components | shadcn/ui-style components in `src/components/ui/` (Radix UI primitives) |
| Animation | Framer Motion / `motion`, GSAP, `tsparticles` |
| ORM | Prisma `^5.22.0` + `@prisma/client` `^5.22.0` |
| Database | PostgreSQL (via `DATABASE_URL`) |
| Email | Nodemailer `^9.1.0` (Gmail SMTP) |
| Forms | `react-hook-form`, `zod` (present as a dependency; no direct usage found in the files inspected) |
| Misc utilities | `uuid`, `date-fns`, `dompurify`, `cheerio`, `js-cookie`, `canvas-confetti`, `chart.js`/`recharts` (only inside an unused `ui/chart.tsx` wrapper) |
| Installed but **unused** anywhere in `src/` | `axios` (a custom instance exists but nothing imports it), `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`, `@react-oauth/google`, `@google/generative-ai`, `svg-captcha`, `cookieconsent`, `next-sitemap` (no config file present), `html2pdf.js`/`jspdf`/`jspdf-autotable`/`html-to-image`/`file-saver` (not found wired to any page in this audit) |

---

## 3. Frontend Architecture

**Found in code:** Next.js App Router under `src/app/`. Pages are a mix of:
- **Server Components** (no `"use client"`) — e.g. `privacy-policy`, `terms-conditions`, `security`, `cookies` pages, which query Prisma directly inside the page function (`await prisma.legalDocument.findFirst(...)`).
- **Client Components** (`"use client"`) — the majority of pages, which fetch data from this project's own `/api/*` routes via `fetch()` inside `useEffect`, or (in a few remaining cases) fetch directly from an external legacy API.

Shared UI lives in `src/components/landing-page/` (31 files — header, footer, hero sections, industry/platform sections, FAQ, testimonials, chatbot widget, etc.) and `src/components/ui/` (29 shadcn-style primitives: button, dialog, select, table, etc.).

`src/lib/constants.ts` still contains a `whyUsFeatures` array (6 items) that is **no longer imported anywhere** — dead code left over after the `/why-us` pages were migrated to the database.

`src/data/careers.ts`, `src/data/industry-faqs.json`, and `src/data/platform-faqs.json` are also **not imported anywhere** in `src/` — dead/legacy data files.

**Not found:** no state-management library (Redux/Zustand/Jotai) — component state is local `useState`/`useEffect` per page.

---

## 4. Backend/API Architecture

**Found in code:** the "backend" is entirely **Next.js Route Handlers** under `src/app/api/**/route.ts` — there is no separate backend server/process. Each route handler talks directly to Postgres via the shared Prisma client (`src/lib/prisma.ts`), or in a few legacy cases to a flat JSON file on disk.

Route handlers follow a consistent shape across most resources:
- `GET` (list, optionally filtered) — public, no auth
- `GET /[id]` (single, by id or slug) — public, no auth
- `POST` / `PUT` / `DELETE` — require a Bearer token matching `ADMIN_API_KEY` (see §6)

**Architectural inconsistency found in code:** `/api/careers` (list) reads/writes via **Prisma** (`JobListing` model), but `/api/careers/[id]` (single item, used by the job detail page) reads/writes via a **flat JSON file** (`src/data/careers-db.json`) — two different data stores for the same conceptual resource. This predates the changes made in this session and was not fixed.

---

## 5. Database Usage

**Found in code:** PostgreSQL, accessed via Prisma. Connection string comes from `DATABASE_URL` (see §12). `prisma/schema.prisma` currently defines **11 models**, all reflecting tables that already exist in the live database (the schema file was built by introspecting the DB, not by running migrations from this repo — there is no `prisma/migrations/` folder).

| Model | Purpose | Written by this repo? |
|---|---|---|
| `BlogPost` | Blog articles | Yes (`/api/blogs`) |
| `CaseStudy` | Case study pages | Yes (`/api/case-studies`) |
| `Faq` | FAQ entries, filterable by `scopeKey` | No — `/api/faqs` is read-only (`GET` only) |
| `JobListing` | Career postings (list) | Yes (`/api/careers`, `GET`/`POST` only — no `PUT`/`DELETE` found) |
| `JobApplication` | Submitted job applications | Yes (`/api/apply-job` write; `/api/job-applications` read/manage) |
| `TeamMember` | Leadership team | Partial — `GET`/`POST` only |
| `Testimonial` | Client testimonials | No — `/api/testimonials` is read-only |
| `Industry` | Industry vertical pages | Yes (`/api/industries`) |
| `PlatformOs` | Product/platform pages (Maestro, Guardian, etc.) | Yes (`/api/platforms`) |
| `LegalDocument` | Privacy/Terms/Security/Cookies content | Yes (`/api/legal-documents`) |
| `WhyFramework` | "Why Us" pillar pages | Yes (`/api/why-framework`) |

**No `prisma/seed.ts`/seed scripts exist in this repo** — the user explicitly removed all migration/seed scripts after using them one-off to backfill data; the data now lives only in Postgres.

**Not found:** no caching layer (Redis, etc.), no read replicas, no connection pooling library beyond Prisma's own client.

---

## 6. Authentication & Authorization

**Found in code:** there is **no user-facing authentication** on this website (no login, no sessions, no NextAuth, no cookies-based auth for visitors).

The only authorization mechanism is a single shared secret, checked in `src/app/api/auth.ts` (`verifyAuth`):
- Compares an `Authorization: Bearer <token>` header against the `ADMIN_API_KEY` environment variable.
- Applied only to **write** operations (`POST`/`PUT`/`DELETE`) on the content API routes.
- All `GET` endpoints are public/unauthenticated by design (they serve public page content).

This is effectively a single shared API key for "admin" write access — there is no per-user identity, no roles, no session expiry. It is presumably how the separate admin CMS project authenticates its writes to this site's API, though this repo has no direct evidence of that project's internals.

**Not found:** no JWT, no OAuth (despite `@react-oauth/google` being installed, it's unused), no rate limiting on any route.

---

## 7. API Endpoints

**Found in code**, grouped by resource (all under `/api/`):

| Route | Methods | Auth required | Notes |
|---|---|---|---|
| `/apply-job` | `POST` | No | Writes `JobApplication` + sends 2 emails (see §10) |
| `/blogs`, `/blogs/[id]` | GET/POST, GET/PUT/DELETE | Write only | |
| `/careers`, `/careers/[id]` | GET/POST, GET/PUT/DELETE | Write only | **List uses Prisma; single-item uses a JSON file** (see §4, §19) |
| `/case-studies`, `/case-studies/[id]` | GET/POST, GET/PUT/DELETE | Write only | |
| `/faqs` | GET only | — | Filters by `?scopeKey=` |
| `/industries`, `/industries/[id]` | GET/POST, GET/PUT/DELETE | Write only | |
| `/job-applications`, `/job-applications/[id]` | GET, GET/PUT/DELETE | **All methods** | Only route where `GET` also requires auth (applicant PII) |
| `/legal-documents`, `/legal-documents/[id]` | GET/POST, GET/PUT/DELETE | Write only | Pages actually query Prisma directly server-side instead of calling this API (see §3) |
| `/platforms`, `/platforms/[id]` | GET/POST, GET/PUT/DELETE | Write only | |
| `/team-members` | GET/POST | Write only | No `[id]` route (no update/delete) |
| `/testimonials` | GET only | — | |
| `/why-framework`, `/why-framework/[id]` | GET/POST, GET/PUT/DELETE | Write only | |

All responses follow a consistent `{ success: boolean, data?, error? }` shape.

---

## 8. External Services / Integrations

**Found in code, actively used:**
1. **Google Tag Manager** (`GTM-59XBBQ66`) + **Google Analytics 4** (`G-8CF8M8RMTB`) — hardcoded inline scripts in `src/app/layout.tsx`, loaded on every page.
2. **Gmail SMTP via Nodemailer** — used only by `/api/apply-job` to send an internal notification (with resume attachment) and a candidate confirmation email. Credentials come from `SMTP_EMAIL`/`SMTP_PASSWORD`.
3. **External legacy PHP backend(s)** — two different domains are called directly from client components, bypassing this project's own API/DB entirely:
   - `https://theverticalai.top/App/api.php?gofor=...` — was previously used by `industry-detail` and `platform-detail` pages before this session's migration; **no longer called** by those two pages now (they use this project's own `/api/industries` and `/api/platforms`).
   - `https://thevertical.top/App/api.php?gofor=bookdemo` — **still actively used** by the "Get a Demo" form (`/get-demo`). Note the domain is `thevertical.top`, not `theverticalai.top` — this may be an inconsistency/typo in the original code rather than intentional.

**Found in code, installed but not wired up to anything:** AWS S3 SDK, Google Generative AI SDK, Google OAuth, `svg-captcha`, `cookieconsent`, the custom `axios` instance in `src/configs/axios/` (its `API_CONFIG.DEFAULT_BASE_URL` points to `adalyzeai.xyz`, an unrelated domain — this looks like leftover boilerplate from a different project template and is not called anywhere).

**Found in code but non-functional:** the "CAPTCHA" on the Get a Demo form is a plain checkbox with a static Google reCAPTCHA logo image next to it — there is no real reCAPTCHA site key, script, or server-side verification. It does not block submission.

---

## 9. Content Management Flow

**Found in code:** for the six resources migrated this session (Case Studies, Team Members, Industries, Platform OS, Legal Documents, Why-Us pillars), plus the pre-existing Blogs/Careers/Testimonials/FAQs:

```
Admin CMS (separate project, not in this repo)
        │  writes directly to Postgres (assumed — not verified from this repo)
        ▼
   PostgreSQL database  ◄──────────────┐
        ▲                              │
        │ reads via Prisma             │ reads via Prisma
        │                              │
  This site's /api/* routes    This site's Server Components
  (client components fetch)    (privacy-policy, terms, security, cookies)
        │                              │
        ▼                              ▼
   Public website pages (rendered content)
```

**Recommendation-flagged assumption:** I could not directly inspect the admin CMS project's code, so "the admin CMS writes to this same database" is inferred from (a) matching schema shapes discovered by introspecting the DB, and (b) that project's dev server/Prisma Studio being observed running against the same `DATABASE_URL` — not from code in this repository.

---

## 10. Form Submission Flow

**Found in code**, two independent, non-overlapping flows:

**A. "Get a Demo" (`/get-demo`)**
```
Browser form → fetch() → https://thevertical.top/App/api.php?gofor=bookdemo (external, third-party)
```
Not stored anywhere in this project's database. This project has no visibility into submissions once sent.

**B. Career application (`/careers/[slug]`)**
```
Browser form (multipart/form-data, incl. resume file)
        → POST /api/apply-job (this project's own route)
              ├─→ prisma.jobApplication.create({...})  — all fields except the resume file
              └─→ nodemailer → Gmail SMTP
                      ├─→ internal notification email (to SMTP_EMAIL), resume attached
                      └─→ candidate confirmation email (if a valid email was given)
```
The resume file itself is **never written to disk or object storage** — it exists only as an email attachment. `JobApplication.resumeUrl` is a schema column but is never populated.

**C. `/careers/detail`** — an orphaned static page with a form that only sets local component state (`setIsSubmitted(true)`); it does not call any API. Not linked from the main careers navigation flow as far as this audit found.

---

## 11. Image/File Upload Flow

**Found in code:**
- Most images are Next.js static imports from `src/assets/**` (bundled at build time) or files under `public/` (`client-logos/`, `team/`, `why-us/` — the latter two added during this session's DB migration work) served as plain relative URLs.
- Content sourced from the database sometimes references **external absolute URLs** verbatim — Unsplash URLs (legal document banners, some hero images) and `theverticalai.top` legacy asset URLs (industry/platform hero and content images) carried over as-is when that content was migrated into Postgres.
- `next.config.ts` sets `images: { unoptimized: true }` — Next.js's built-in image optimizer/proxy is bypassed entirely, so any absolute image URL works without needing to be added to an allow-list.
- **There is no file upload endpoint or object-storage integration in this repo.** The only file a user uploads (a resume, via the careers form) is processed in-memory (`File.arrayBuffer()` → `Buffer`) and attached to an outgoing email — never persisted. `@aws-sdk/client-s3` is installed but not referenced anywhere in `src/`.

---

## 12. Environment Variables

**Found in code** (`.env`, `.env.local` — **names only**, values never inspected/exposed):

| Variable | Used for (inferred from code) |
|---|---|
| `DATABASE_URL` | Prisma's Postgres connection string |
| `ADMIN_API_KEY` | Shared bearer token for admin write operations across the content API |
| `BUILD_ACCESS_KEY` | Custom production-build gate (see §15) |
| `SMTP_EMAIL` | Gmail account used both as the SMTP username and the internal notification recipient |
| `SMTP_PASSWORD` | Gmail App Password for SMTP auth |

**Not found:** no `NEXTAUTH_SECRET`, no OAuth client IDs/secrets, no S3/AWS credentials, no analytics measurement secrets beyond the hardcoded public GTM/GA IDs in `layout.tsx` (those are not secrets — GA/GTM IDs are meant to be public).

---

## 13. Folder Structure

**Found in code** (abridged, most relevant paths):

```
vertical-ai-source-code/
├── prisma/
│   └── schema.prisma           # introspected from the shared DB; no migrations/ folder
├── prisma.config.ts
├── next.config.ts              # custom build gate, images.unoptimized
├── src/
│   ├── app/
│   │   ├── api/                # 13 resource route groups (see §7)
│   │   ├── layout.tsx          # GTM/GA scripts, global font, chatbot widget
│   │   ├── page.tsx             # homepage
│   │   ├── industry-detail/, platform-detail/, case-study(-detail)/, why-us/[slug]/
│   │   ├── privacy-policy/, terms-conditions/, security/, cookies/   # server components, query Prisma directly
│   │   ├── careers/, careers/[slug]/, careers/detail/  (orphaned)
│   │   ├── blog/, blogdetail/, testimonials/, team/, faq/, support/, about-us/, get-demo/
│   ├── components/
│   │   ├── landing-page/       # 31 page-section components
│   │   ├── ui/                 # 29 shadcn-style primitives
│   │   └── Skeleton-loading/   # 11 loading-skeleton components
│   ├── lib/
│   │   ├── prisma.ts           # shared PrismaClient singleton
│   │   ├── constants.ts        # contains dead `whyUsFeatures` array
│   │   └── utils.ts
│   ├── configs/
│   │   ├── api.config.ts       # unused — points to an unrelated domain
│   │   └── axios/index.js      # unused custom axios instance
│   ├── data/                   # careers.ts, careers-db.json, industry-faqs.json, platform-faqs.json
│   │                           #   — careers-db.json is still used (§4); the other three are dead code
│   └── assets/                 # build-time static images
└── public/                     # client-logos/, team/, why-us/  — runtime-served images
```

---

## 14. Data Flow

**Found in code**, the dominant pattern for DB-backed pages:

```
Client Component (useEffect)
     │ fetch("/api/<resource>?slug=...")
     ▼
Next.js Route Handler (src/app/api/<resource>/route.ts)
     │ prisma.<model>.findMany/findFirst(...)
     ▼
PostgreSQL (shared with the separate admin CMS project)
     │ returns row(s), flat column shape
     ▼
Route Handler returns { success, data }
     │
     ▼
Client Component reshapes flat DB columns into the nested prop shape
the existing presentational components expect, then renders
```

The **legal-document pages** are the one exception — being Server Components, they skip the `/api/*` hop and call `prisma.legalDocument.findFirst(...)` directly inside the page function.

The **Get a Demo form** and the (now-unused-by-industry/platform-pages) legacy PHP calls bypass this project's database entirely, going straight from the browser to an external third-party endpoint.

---

## 15. Deployment Architecture

**Found in code:**
- `next.config.ts` contains a custom guard: when `NODE_ENV === 'production'` or the build is invoked via `next build`, the build **fails immediately** unless an environment variable `BUILD_ACCESS_KEY` matches a hardcoded (base64-encoded) value. This is a homemade "don't let this repo build in the wrong place" gate, not a runtime security control.
- `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` are both set — the production build will succeed even with type errors or lint failures.
- `.gitignore` includes a `.vercel` entry, suggesting **Vercel** may be (or have been) the intended hosting target, but there is no `vercel.json` and no `.github/workflows/` directory in this repo, so the actual CI/CD pipeline and hosting provider **could not be determined from the code**.
- **Not found:** no `Dockerfile`, no `docker-compose.yml`, no other CI configuration files.

---

## 16. Current Dependencies Between Frontend, Backend, API and Database

**Found in code:**
- Frontend pages depend on this project's own `/api/*` routes for **most** content (case studies, industries, platforms, team, why-us, blogs, careers list, job-applications) — a genuine internal dependency.
- Frontend pages depend directly on **Prisma → Postgres** (bypassing `/api/*`) for the four legal-document pages only.
- The API layer depends entirely on the shared Postgres database via Prisma; there is no other backend service.
- One route (`/api/careers/[id]`) depends on a **local JSON file** instead of the database — an inconsistent dependency compared to every other resource.
- The frontend depends on **two external third-party HTTP endpoints** it does not control: the demo-booking PHP backend, and (historically, no longer for industry/platform pages) the content PHP backend.
- The frontend depends on **Gmail's SMTP service** for all email delivery — if Gmail credentials expire or Gmail rate-limits/blocks the account, job-application emails silently fail (there's a try/catch around the whole route, but no fallback delivery path).

---

## 17. What This Project Currently Controls

**Found in code:**
- Its own Postgres schema definitions (as reflected in `prisma/schema.prisma`) and all read/write access to that data through its own API routes.
- Job application intake: form → validation → DB write → email dispatch, entirely within this repo.
- Rendering and presentation of all page content, whether sourced from the DB or (for a shrinking set of pages) from local constants/JSON.
- The `ADMIN_API_KEY` gate on its own write endpoints.

---

## 18. What This Project Does NOT Control

**Found in code:**
- The admin CMS itself (a separate project/codebase) — this repo only consumes the database that CMS is assumed to write to.
- The external demo-booking backend (`thevertical.top`) — submissions and their storage/processing are entirely outside this repo.
- Email deliverability — delegated to a personal/organizational Gmail account via SMTP, not a transactional email provider (e.g., SES, SendGrid, Postmark).
- Resume storage — not controlled anywhere; resumes only ever exist transiently as an email attachment.
- CAPTCHA/bot protection — the visible control on the demo form does not actually verify anything.

---

## 19. Potential Architecture Issues

**Found in code** (listed as observations, not yet fixed):

1. **Two data stores for one resource:** `/api/careers` (Prisma) vs. `/api/careers/[id]` (JSON file) can drift out of sync — a career could exist in one store and not the other, or have different field values (this was actually observed: the same slug had `status: "published"` in Prisma and `status: "active"` in the JSON file).
2. **No resume storage:** applicant resumes are only ever an email attachment; if the email fails to send, is deleted, or the inbox is inaccessible, the resume is permanently lost with no recovery path, and there is no way to re-download a resume for an application later found in the `JobApplication` table.
3. **External form dependency:** the Get a Demo form sends leads to an external, third-party PHP endpoint this project doesn't control or have visibility into — no way to audit, retry, or migrate those submissions from this codebase.
4. **Inconsistent legacy domains:** `thevertical.top` vs. `theverticalai.top` appear in different parts of the code for conceptually similar "legacy backend" calls — worth confirming which is actually correct/intended.
5. **Non-functional CAPTCHA:** the demo form's CAPTCHA is purely decorative, offering no actual bot protection despite visually implying one exists.
6. **No schema migrations:** `prisma/schema.prisma` has no accompanying `prisma/migrations/` history — the schema was built by introspecting a database whose structure is controlled by a separate project. Any future schema change on either side needs manual coordination; there's no single source of truth or migration trail.
7. **Dead/unused dependencies:** several installed packages (`@aws-sdk/client-s3`, `@google/generative-ai`, `@react-oauth/google`, `svg-captcha`, `cookieconsent`, `axios` + its custom instance pointed at an unrelated domain, `next-sitemap` with no config) add bundle/maintenance weight without being used, and could mislead future readers of the codebase about what the site actually integrates with.
8. **No sitemap/robots generation despite the Cookie Policy implying compliance tooling:** `next-sitemap` is installed but has no config file, and no `robots.ts`/`sitemap.ts` exist — search engines have no generated sitemap from this codebase.
9. **No visitor-facing cookie consent mechanism:** despite having a full Cookie Policy page describing consent controls, `cookieconsent` (installed) is never actually rendered anywhere.
10. **Orphaned page:** `/careers/detail` is a non-functional prototype page still reachable in production if linked or guessed, potentially confusing.
11. **Shared single API key:** `ADMIN_API_KEY` is one static secret for all write access across every content type — no scoping, no per-user audit trail, no rotation mechanism visible in code.

---

## 20. Recommendations for Connecting This Website With a Separate Admin/CMS Project

*(Explicitly recommendations — none of this exists today.)*

1. **Formalize the schema ownership boundary.** Decide which repo is the source of truth for `prisma/schema.prisma` (this site currently just introspects a DB owned elsewhere). If the admin CMS owns the schema, this repo should have a documented, repeatable "sync schema" step rather than ad-hoc `prisma db pull`.
2. **Version and migrate together.** Introduce `prisma migrate` (with a real `migrations/` history) on whichever side owns the schema, so both projects can pin to a known schema version instead of silently drifting.
3. **Replace the shared static `ADMIN_API_KEY`** with per-integration credentials (e.g., a dedicated service token for the admin CMS specifically), and consider short-lived tokens if the CMS is exposed to multiple editors.
4. **Unify the careers data path** onto Prisma only, retiring `careers-db.json`, so the admin CMS has one place to edit a job listing and both list/detail views agree.
5. **Give the admin CMS a way to manage resumes**, if desired: add an actual object-storage upload (the `@aws-sdk/client-s3` dependency is already present, just unwired) and populate `JobApplication.resumeUrl`, so applications reviewed via `/api/job-applications` can also retrieve the resume.
6. **Bring the demo-booking form in-house**, storing submissions in this project's own DB (e.g., a new `DemoRequest` table) so the admin CMS can see and act on leads instead of them living solely on the external `thevertical.top` backend.
7. **Document the integration contract** (which fields, which routes, which auth) between the two projects in one shared place, since right now the relationship is only inferable by comparing database schemas, not by reading either codebase in isolation.
8. **Remove or wire up the unused dependencies** identified in §19.7, to keep the two projects' actual capabilities legible to anyone reading either codebase.

---

## Architecture Diagram

```
┌─────────────────────────────┐        ┌──────────────────────────────┐
│   Admin CMS (separate repo) │        │   Public Website (this repo)  │
│   D:\Vertical AI\admin CMS  │        │                                │
│   (not inspected in depth)  │        │  Next.js App Router            │
└──────────────┬───────────────┘        │  ┌──────────────────────────┐ │
               │ writes (assumed)        │  │ Client Components        │ │
               │                         │  │  fetch("/api/...")       │ │
               ▼                         │  └───────────┬──────────────┘ │
      ┌─────────────────┐               │              │                │
      │   PostgreSQL     │◄──────────────┼──────────────┘                │
      │ (DATABASE_URL,   │   Prisma      │  ┌──────────────────────────┐ │
      │  shared by both  │◄──────────────┼──│ Server Components        │ │
      │  projects)       │               │  │  (legal pages: direct    │ │
      └─────────────────┘               │  │  prisma.*.findFirst)     │ │
                                         │  └──────────────────────────┘ │
                                         │                                │
                                         │  ┌──────────────────────────┐ │
                                         │  │ /api/* route handlers    │ │
                                         │  │ (Prisma reads/writes,    │ │
                                         │  │  ADMIN_API_KEY on writes)│ │
                                         │  └──────────────────────────┘ │
                                         └───────────────┬────────────────┘
                                                          │
                        ┌─────────────────────────────────┼───────────────────────────────┐
                        ▼                                 ▼                               ▼
              ┌───────────────────┐             ┌──────────────────┐            ┌──────────────────────┐
              │ Gmail SMTP        │             │ thevertical.top   │            │ Google Tag Manager /  │
              │ (job application  │             │ /App/api.php      │            │ Google Analytics       │
              │  emails)          │             │ (Get a Demo form) │            │ (page-view tracking)   │
              └───────────────────┘             └──────────────────┘            └──────────────────────┘
```

**Legend:** solid boxes/arrows are confirmed from code. The Admin CMS box and its "writes" arrow are the one inferred (not directly verified) relationship in this diagram — everything else was traced through actual source files in this repository.
