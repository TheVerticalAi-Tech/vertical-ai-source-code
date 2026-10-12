# The Vertical AI — Website Test Cases

**Scope:** `D:\Vertical AI\vertical-ai-source-code` (public marketing website)
**Test type:** Manual/QA functional test cases — no automated framework exists in this repo yet.
**Prerequisite for every test below:** the admin CMS (`CMS_API_URL`, default `http://localhost:3000` locally) must be running and reachable — nearly every page and form on this site depends on it. If the CMS is down, expect loading spinners or "Failed to load" states, not crashes (verify this is still true — see §7).

Each test case has: **ID**, **Steps**, **Expected Result**. Priority: 🔴 Critical, 🟡 Important, ⚪ Nice-to-have.

---

## 1. Content Pages — Data Loads Correctly

### 1.1 Homepage (`/`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| HP-01 | Load `/` | Page renders fully: hero, industries grid, platform orbital animation, "AI in Action" horizontal scroll, testimonials, footer — no console errors | 🔴 |
| HP-02 | Check the industries grid section | Shows all industries currently published in the CMS (count should match `GET /api/industries`), not a fixed hardcoded number | 🔴 |
| HP-03 | Check "AI in Action" scroll section | Shows one card per published platform (`GET /api/platforms`), each with a title, description, and image — no blank/broken image boxes | 🔴 |
| HP-04 | Hover over "Platform OS" in the header nav | Dropdown shows all published platforms with correct name + tagline, not a fixed list of 5 | 🟡 |
| HP-05 | Hover over "Industries" in the header nav | Dropdown shows all published industries | 🟡 |
| HP-06 | Scroll to footer | "Platform OS" and "Industries" columns list all published items, links navigate correctly | 🟡 |
| HP-07 | Open browser dev tools console during full page load | Zero errors, zero "Each child in a list should have a unique key" warnings, zero "empty string passed to src" warnings | 🔴 |

### 1.2 Industry pages (`/industry-detail?slug=...`)
Test **every** slug currently published (as of this session: `bfsi`, `healthcare`, `telecom`, `ecommerce`, `automotive`, `edtech`, `bpo`, `microfinance`, `travel`, `hr-services`).

| ID | Steps | Expected | Priority |
|---|---|---|---|
| IND-01 | Load `/industry-detail?slug=<each slug>` | Page loads fully with no runtime error overlay, for **every** slug — not just the first one tested | 🔴 |
| IND-02 | Check hero section | Title, highlighted subtitle, description, and hero image all render (no broken image) | 🔴 |
| IND-03 | Check "Other Features" tab section | All feature tabs are clickable, each shows a unique image, title, description; scrolling the page updates the active tab (scroll-spy) | 🔴 |
| IND-04 | Check "Vertical Product" pillars section | All pillar cards show a title and description | 🟡 |
| IND-05 | Check case study section | Challenge, solution, image, and all "Measurable Results" bullet points render — this section previously crashed with `Cannot read properties of undefined (reading 'map')` | 🔴 |
| IND-06 | Check "Agent Mapping" section | All agent cards show title, subtitle, bullet points, and image (no blank cards) | 🔴 |
| IND-07 | Check compliance/governance showcase | All items show title, description, image, and tag pills (tags previously could be empty due to a `tag1`/`tag2` vs `tags` mismatch) | 🔴 |
| IND-08 | Check "Metrics" section | Each stat shows correct prefix/number/suffix/label/description, and the number animates on scroll into view | 🟡 |
| IND-09 | Check use-case tabs at bottom | Tab buttons show correct labels, clicking each shows title/description/capabilities/outcomes for that tab | 🔴 |
| IND-10 | Click "Talk to an Expert" / "Get a Demo" CTAs (multiple present) | Navigates to `/get-demo` | 🟡 |
| IND-11 | No `slug` param, e.g. `/industry-detail` | Falls back to `bfsi` (default), loads without error | 🟡 |
| IND-12 | Invalid slug, e.g. `/industry-detail?slug=doesnotexist` | Shows "Failed to load industry details." message, not a crash | 🟡 |

### 1.3 Platform OS pages (`/platform-detail?slug=...`)
Test all 5: `maestro`, `vocalis`, `guardian`, `insights`, `conversa`.

| ID | Steps | Expected | Priority |
|---|---|---|---|
| PLAT-01 | Load `/platform-detail?slug=<each>` | Loads fully for every platform, no runtime error | 🔴 |
| PLAT-02 | Check hero section | Title, highlight, description, hero image render | 🔴 |
| PLAT-03 | Check trusted client logos marquee | Logos scroll/loop correctly, no broken images | ⚪ |
| PLAT-04 | Check "How It Works" steps | Each step shows title, description, and image — no blank/broken image (previously `step.image`/`step.desc` didn't exist on the data) | 🔴 |
| PLAT-05 | Check "Intelligence Layer" steps | Same as above for this second step-based section | 🔴 |
| PLAT-06 | Check "Mission-Critical Workflows" use-case cards | Each card shows title, subtitle, description, outcome pills, and an image (previously all cards showed a gray placeholder due to `card.image` vs `card.imageUrl`) | 🔴 |
| PLAT-07 | Check "Measurable Impact" stats | Numbers animate correctly with prefix/suffix | 🟡 |
| PLAT-08 | Check "Security & Compliance" section | Feature list and floating grid items render with correct titles | 🟡 |
| PLAT-09 | Invalid slug | Shows "Failed to load platform data." | 🟡 |

### 1.4 Case Studies (`/case-studies`, `/case-study-detail?slug=...`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| CS-01 | Load `/case-studies` | Shows all published case studies (currently seeded 3 + any added via CMS), each with title, industry, client name, KPI badge | 🔴 |
| CS-02 | Click a case study card | Navigates to `/case-study-detail?slug=...` | 🔴 |
| CS-03 | Load detail page directly | Banner, breadcrumb, main heading, testimonial quote, all content sections, key results sidebar, and implementation checklist all render | 🔴 |
| CS-04 | Invalid slug | Shows "Case study not found." | 🟡 |

### 1.5 Blog (`/blog`, `/blogdetail?slug=...`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| BLOG-01 | Load `/blog` | Lists all published blog posts | 🔴 |
| BLOG-02 | Open a blog post | Title, banner, author, date, reading time, and full content (article sections or structured content blocks) render | 🔴 |
| BLOG-03 | Invalid slug | Shows "Blog post not found." | 🟡 |

### 1.6 Careers (`/careers`, `/careers/[slug]`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| CAR-01 | Load `/careers` | Lists all published job listings | 🔴 |
| CAR-02 | Click a job listing | Navigates to `/careers/[slug]`, loads the job detail — **must not 404** (this page previously always 404'd due to a `notFound()`-before-fetch-completes bug) | 🔴 |
| CAR-03 | Directly load `/careers/<valid-slug>` via URL (not by clicking through) | Loads correctly, same as CAR-02 — confirms the fix covers direct navigation too | 🔴 |
| CAR-04 | Load `/careers/<invalid-slug>` | Shows the real Next.js not-found page, not a stuck "Loading..." | 🟡 |
| CAR-05 | Check job detail sidebar | Department, location, employment type, experience, salary all render | 🟡 |

### 1.7 Team (`/team`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| TEAM-01 | Load `/team` | Shows all published team members (photo, name, role) — grid count matches `GET /api/team-members` | 🔴 |
| TEAM-02 | Click a team member card | Modal opens with full bio (multi-paragraph) and LinkedIn link if present | 🟡 |
| TEAM-03 | Team member with no LinkedIn/Twitter/mail | Card/modal still renders without broken links | ⚪ |

### 1.8 Why Us (`/why-us`, `/why-us/[slug]`)
Test all 6: `framework`, `architecture`, `security`, `compliance`, `privacy`, `philosophy`.

| ID | Steps | Expected | Priority |
|---|---|---|---|
| WHY-01 | Load `/why-us` | Grid shows all 6 published pillars | 🔴 |
| WHY-02 | Load each `/why-us/<slug>` | Hero, main heading, intro description, featured image, key-results metrics, both strategic/technical sections, capabilities list, and impact section all render | 🔴 |
| WHY-03 | Invalid slug | Shows "Pillar not found." | 🟡 |

### 1.9 Testimonials (`/testimonials`) & FAQ (`/faq`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| TEST-01 | Load `/testimonials` | Shows all published testimonials with company logo, rating, quote | 🟡 |
| FAQ-01 | Load `/faq` | Shows all published FAQs | 🟡 |
| FAQ-02 | Check FAQ sections on industry/platform detail pages | Shows only FAQs scoped to that specific industry/platform (`?scopeKey=`), not all FAQs | 🟡 |

### 1.10 Legal pages
| ID | Steps | Expected | Priority |
|---|---|---|---|
| LEG-01 | Load `/privacy-policy` | Title, banner, "Last updated" date, full sectioned content, and contact box with correct support email render | 🔴 |
| LEG-02 | Load `/terms-conditions` | Same checks as LEG-01 | 🔴 |
| LEG-03 | Load `/security` | Same checks as LEG-01 | 🔴 |
| LEG-04 | Load `/cookies` | Same checks as LEG-01 | 🔴 |
| LEG-05 | Inspect content formatting on all 4 pages | Section spacing matches the live production site (numbered `<h2>` headings, spaced sections, bullet lists) — not run-together text | 🟡 |

---

## 2. Forms

### 2.1 Get a Demo (`/get-demo`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| DEMO-01 | Fill all required fields (Name, Email, Phone, "How can we help?") and submit | Success state ("You're all set!") shown **only** when the CMS actually returns success | 🔴 |
| DEMO-02 | Submit with CMS unreachable (stop CMS, then submit) | Shows a real error message, **not** a false success — this was a known bug that's since been fixed; regression-test it | 🔴 |
| DEMO-03 | Select "Other" in the dropdown without filling "Please specify" | Submission is blocked (client-side required-field check) | 🟡 |
| DEMO-04 | Submit with an invalid email format | Browser's native `type="email"` validation blocks submission | ⚪ |
| DEMO-05 | Leave the CAPTCHA checkbox unchecked | Submission is blocked by the `required` attribute — but note this offers **no real bot protection**, just a UI gate | 🟡 |
| DEMO-06 | Enter a country code + phone number | Submitted `phone` field is correctly composed as `+<code> <number>` | ⚪ |
| DEMO-07 | Successful submission | A record appears via the CMS's own applications view (verify with whoever owns the CMS) | 🟡 |

### 2.2 Job Application (`/careers/[slug]` → "Apply for this Position")
| ID | Steps | Expected | Priority |
|---|---|---|---|
| APP-01 | Open the apply dialog, submit with all required fields + a valid PDF resume | Success message shown, dialog resets | 🔴 |
| APP-02 | Submit without a resume | Blocked with "Please upload your resume (PDF/DOCX)" | 🔴 |
| APP-03 | Upload a resume over 5MB | Blocked with "File size must be under 5MB" | 🟡 |
| APP-04 | Upload a `.txt` or `.zip` file as resume | Blocked with "Please upload a PDF or DOCX file" | 🟡 |
| APP-05 | Select "Employee Referral" as source without entering a referrer name | Blocked until referrer name is provided | 🟡 |
| APP-06 | Select "Other" as source without specifying | Blocked until specified | 🟡 |
| APP-07 | Submit with all required fields, leave optional ones (LinkedIn, expected CTC, cover letter) blank | Submission succeeds; those fields default to "Not provided"/"Not specified" | 🟡 |
| APP-08 | Submit with the CMS unreachable | Shows a real error, does not falsely claim success | 🔴 |
| APP-09 | Successful submission | A record appears via the CMS's own applications view, and any configured notification/confirmation emails are sent — verify this actually works end-to-end since this project no longer sends emails itself | 🔴 |
| APP-10 | Submit twice in a row (no artificial delay) | No duplicate/double-submission on double-click of the submit button | ⚪ |

### 2.3 Support ("Open a Support Case", `/support`)
| ID | Steps | Expected | Priority |
|---|---|---|---|
| SUP-01 | Fill all fields and submit | Success state shown, form resets, "Submit another case" option works | 🔴 |
| SUP-02 | Submit with an empty/missing field (name, email, category, or message) | Blocked with an appropriate toast message | 🟡 |
| SUP-03 | Submit with an invalid email format | Blocked with "Please enter a valid work email" | 🟡 |
| SUP-04 | Submit with the CMS unreachable | Shows a real error message | 🔴 |

---

## 3. API Endpoints (`/api/*`)

For each `GET` list endpoint below, verify: returns `200`, `{success: true, data: [...]}` shape, and count matches what's actually published in the CMS.

| Endpoint | Method | Auth? | Test |
|---|---|---|---|
| `/api/industries` | GET | No | Returns all published industries; `?slug=X` filters to one |
| `/api/industries/[id]` | GET | No | Returns one industry by id or slug; 404 for unknown |
| `/api/industries` / `[id]` | POST/PUT/DELETE | Yes | `401` without `Authorization: Bearer <ADMIN_API_KEY>`; succeeds with it |
| `/api/platforms` (+`[id]`) | GET/POST/PUT/DELETE | Same pattern | Same checks as industries |
| `/api/case-studies` (+`[id]`) | GET/POST/PUT/DELETE | Same pattern | Same checks |
| `/api/legal-documents` (+`[id]`) | GET/POST/PUT/DELETE | Same pattern | Same checks; `?slug=` filter works |
| `/api/why-framework` (+`[id]`) | GET/POST/PUT/DELETE | Same pattern | Same checks |
| `/api/team-members` | GET/POST | Same pattern | Sorted by `sortOrder` ascending |
| `/api/blogs` (+`[id]`) | GET/POST/PUT/DELETE | Write needs auth | Single-item lookup by id or slug works |
| `/api/careers` | GET/POST | Write needs auth | — |
| `/api/faqs` | GET only | No | `?scopeKey=` filters correctly |
| `/api/testimonials` | GET only | No | — |
| `/api/apply-job` | POST | No | Forwards to CMS; returns CMS's `id` on success, passes through CMS's `400`/`issues` on validation failure |
| `/api/support` | POST | No | Same forwarding behavior |
| `/api/get-demo` | POST | No | Same forwarding behavior |
| `/api/job-applications` (+`[id]`) | GET/PUT/DELETE | **Yes, including GET** | This is the one endpoint where reading also requires auth (applicant PII) — verify `401` without the key |

**Auth test (apply to every write endpoint):**
| ID | Steps | Expected |
|---|---|---|
| API-AUTH-01 | POST/PUT/DELETE with no `Authorization` header | `401 { success: false, error: "Missing Authorization header" }` |
| API-AUTH-02 | POST/PUT/DELETE with a wrong token | `401 { success: false, error: "Invalid API key" }` |
| API-AUTH-03 | POST/PUT/DELETE with the correct `ADMIN_API_KEY` | Succeeds (`200`/`201`) |

**CMS unreachable test (apply to every GET endpoint):**
| ID | Steps | Expected |
|---|---|---|
| API-DOWN-01 | Stop the CMS, then call any `/api/<resource>` GET | Returns `500` with a clear error message — the page consuming it should show a loading/error state, not crash the whole app |

---

## 4. Regression Tests — Specific Bugs Found This Session

These are worth keeping as a permanent regression checklist, since they were each caused by the CMS's data shape changing without notice:

| ID | What broke before | Verify now |
|---|---|---|
| REG-01 | `/careers/[slug]` always 404'd because `notFound()` fired before the data fetch completed | Every careers detail page loads on the **first** request, not just after a client-side refetch |
| REG-02 | Platform use-case card images always blank (`card.image` vs actual `card.imageUrl`) | Images render on platform-detail use-case cards |
| REG-03 | "How It Works"/"Intelligence Layer" step images and descriptions blank (`step.image`/`step.desc` vs `step.imageUrl`/`step.description`) | Both sections show real images and text |
| REG-04 | Industry case-study section crashed the whole page (`caseStudy.results` undefined) | Case study section renders, including all bullet results |
| REG-05 | `OtherFeatures` tab buttons all shared the same (missing) React key, breaking scroll-spy | Each feature tab has a unique, working scroll-to-section behavior |
| REG-06 | Industry agent cards / compliance cards / use-case tabs showed missing fields due to `name`/`tagline`/`bulletPoints` vs `title`/`subtitle`/`bullets`, and `tag1`/`tag2` vs `tags[]` | All of these sections show complete, correct content on **every** industry, not just one |
| REG-07 | Job applications used to be written to this project's own Postgres directly and email sent via this project's Gmail SMTP | Confirm applications now reach the CMS and (separately) that CMS-side email delivery actually works — there is no fallback anymore if it doesn't |

---

## 5. Non-Functional / Environment Checks

| ID | Check | Expected | Priority |
|---|---|---|---|
| ENV-01 | `CMS_API_URL` in the deployed environment | Points to the real deployed CMS URL, **not** `http://localhost:3000` — confirmed still pointing at localhost as of this test plan being written | 🔴 |
| ENV-02 | `DATABASE_URL`, `ADMIN_API_KEY`, `BUILD_ACCESS_KEY` in the deployed environment | All set to real production values, not local/dev secrets | 🔴 |
| SEC-01 | Try loading the site over plain HTTP in production | Redirects to HTTPS (verify at the hosting/CDN level, not in this codebase) | 🟡 |
| SEO-01 | Check for `sitemap.xml` and `robots.txt` | Currently **not generated** — `next-sitemap` is installed but unconfigured; decide if this is needed before launch | 🟡 |
| PERF-01 | Run Lighthouse on a content-heavy page (e.g. an industry-detail page) | Note that `images.unoptimized: true` means no automatic image optimization — expect this to affect the score | 🟡 |
| LEGAL-01 | Check for a cookie consent banner anywhere on the site | Currently **does not exist**, despite the Cookie Policy describing one — flag as a content/compliance mismatch, not a code bug to "fix" silently | 🟡 |
| A11Y-01 | Tab through the header navigation and all forms using only the keyboard | All interactive elements are reachable and usable (not verified during this session — spot-check) | ⚪ |
| RESP-01 | Load every page in §1 at mobile (375px), tablet (768px), and desktop (1440px) widths | No horizontal scroll, no overlapping content, mobile menu accordion works | 🟡 |

---

## 6. Known Non-Issues (don't file these as bugs)

- The "I'm not a robot" checkbox on `/get-demo` is decorative by design in the current code — it's a UI gate only, not a security feature. Real bot protection would need a separate implementation.
- `src/lib/prisma.ts` and direct-Postgres writes still exist for several resources' `POST`/`PUT`/`DELETE` operations — this is intentional/pending cleanup, not a bug (writes go direct to DB while reads go through the CMS's API).
- Icons shown on industry/platform nav dropdowns and cards are cycled from a fixed local set (the CMS has no icon field) — icons will not necessarily match the "meaning" of each item, and that's expected.

---

## 7. Suggested Test Execution Order

1. **Environment check (§5)** first — confirm `CMS_API_URL` and other env vars before testing anything else, since a wrong URL invalidates every other result.
2. **API endpoints (§3)** — fastest to verify, and catches CMS-shape issues before you waste time clicking through pages.
3. **Content pages (§1)** — one full pass through every listed slug for industries/platforms/why-us, not just the first one (this is where every regression bug was hiding this session).
4. **Forms (§2)** — including the "CMS unreachable" negative case for each.
5. **Regression checklist (§4)** — explicitly re-verify each past bug is still fixed.
6. **Non-functional (§5)** — as time allows, before a production launch specifically.
