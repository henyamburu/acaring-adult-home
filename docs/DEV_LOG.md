# Development Log — ACaring Adult Home Website

_Last updated: 2026-06-09_

Use this file as the running project memory for Codex and future development sessions.

## Log entries

### 2026-06-09 - Confirmed public address display decision

**Changed:**

- Recorded owner decision to keep both full Federal Way residential addresses public.

**Reason:**

The site intentionally uses both full addresses in location content, map links, footer wording, and LocalBusiness structured data.

**Testing performed:**

- Documentation-only update.

**Follow-up needed:**

- Revisit only if the owner later changes the privacy posture for public address display.

### 2026-06-09 - Recorded post-deploy local SEO verification

**Changed:**

- Marked completed local visibility backlog items for referral content, form labels, contact map/context, next-step FAQ content, FAQ accordion, and inquiry-source tracking.

**Reason:**

Production checks 1 through 4 were completed after merge/deploy: Cloudflare Pages deployment, sitemap/robots and contact redirects, and live inquiry delivery.

**Testing performed:**

- Production deploy confirmed.
- `/sitemap.xml` and `/robots.txt` checked.
- `/contact.html` and `/contact` redirect behavior checked.
- Live test inquiry submitted and email delivery confirmed.
- Live structured-data validation completed for the homepage and contact page.

**Follow-up needed:**

- Use one shared Google Business Profile for now; add `sameAs` only after the official profile URL is confirmed.
- Install Cloudflare Web Analytics once and keep any analytics events non-PII.

### 2026-06-09 - Completed Local SEO Cleanup Sprint

**Changed:**

- Replaced single LocalBusiness schemas containing two addresses with `@graph` structured data.
- Added one `Organization` node and two separate `LocalBusiness` nodes with unique `@id` values.
- Added FAQPage JSON-LD on `location-contact.html` that mirrors the visible FAQ accordion exactly.
- Added absolute canonical URLs to indexable pages.
- Added Cloudflare Pages `_redirects` rules for `/contact.html` and `/contact`.
- Removed `contact.html` from `sitemap.xml` and kept `404.html` as noindex.
- Added a local-area section and official DSHS Adult Family Home Locator resource link on `location-contact.html`.
- Added a safe `inquiry_submit_success` conversion event hook using only `inquiry_type`, `inquiry_role`, `preferred_contact`, and `hear_about`.
- Refined homepage meta description to focus on availability, care fit, referrals, and next steps.

**Files modified:**

- `index.html`
- `location-contact.html`
- `contact.html`
- `script.js`
- `sitemap.xml`
- `_redirects`
- `docs/BACKLOG.md`
- `docs/DECISIONS.md`
- `docs/DEV_LOG.md`

**Reason:**

Structured data should model the organization and two locations accurately, redirects should use HTTP 301 behavior where Cloudflare Pages supports it, and tracking should remain safe and non-PII.

**Testing performed:**

- Schema audit confirmed no LocalBusiness node uses an address array.
- Schema audit confirmed no `geo`, `sameAs`, `aggregateRating`, review, or `MedicalClinic` data was added.
- FAQ schema text was compared against the visible FAQ questions and answers.
- Redirect and sitemap audit confirmed `contact.html` is excluded from the sitemap and covered by `_redirects`.
- `node --check script.js`

**Follow-up needed:**

- One shared Google Business Profile is expected for now; confirm the official profile URL before adding any `sameAs` markup.
- Install Cloudflare Web Analytics once when the production account script is available; GA4/GTM should remain absent unless explicitly approved.

### 2026-06-09 - Implemented Local Visibility Sprint

**Changed:**

- Added and audited unique titles and meta descriptions across public HTML entry points.
- Added Federal Way Adult Family Home content to the homepage without ranking claims or medical overclaims.
- Added LocalBusiness JSON-LD on the homepage and contact page using the public phone, email, area served, and two existing public Federal Way locations.
- Added `sitemap.xml` and `robots.txt`.
- Converted legacy `care-services.html` and `who-we-serve.html` into useful public pages instead of immediate redirects.
- Expanded the FAQ accordion with practical family and referral-partner questions.
- Strengthened `referrals.html` for families, case managers, discharge planners, placement coordinators, and representatives.
- Added optional "How did you hear about us?" tracking to the contact form and Cloudflare Worker.
- Added consistent footer NAP content to core pages.

**Files modified:**

- `index.html`
- `about.html`
- `care-services.html`
- `who-we-serve.html`
- `daily-life.html`
- `care-fit.html`
- `referrals.html`
- `events.html`
- `location-contact.html`
- `contact.html`
- `404.html`
- `script.js`
- `styles.css`
- `contact-worker/src/index.js`
- `functions/api/contact.disabled.js`
- `sitemap.xml`
- `robots.txt`
- `docs/BACKLOG.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/DEV_LOG.md`

**Reason:**

Improve local search visibility and conversion clarity for families and referral partners while preserving privacy-safe, assessment-based language.

**Testing performed:**

- `node --check script.js`
- `node --check contact-worker/src/index.js`
- Metadata audit for titles, descriptions, keyword tags, and noindex.
- Heading audit confirmed one H1 per main public page.
- Form field audit confirmed labels for visible contact fields and optional inquiry-source tracking.
- Script audit confirmed no analytics script is installed beyond placeholder comments.

**Follow-up needed:**

- Resolved later on 2026-06-09: owner confirmed both full residential addresses should remain public.
- Run a live post-deploy structured-data test and contact form submission on production.

### 2026-06-08 - Completed public copy and claim-safety pass

**Changed:**

- Revised public-facing copy across core static pages to remove internal website-builder language.
- Softened dementia and developmental disability wording so it remains conditional and assessment-based.
- Changed the navigation label from Admissions to Referrals while keeping `referrals.html`.
- Added a sitewide footer disclaimer for informational, eligibility, placement, and emergency boundaries.
- Simplified contact form privacy copy and kept submissions general.
- Cleaned shared meta keywords to reduce specialty-care keyword stuffing.
- Updated the content guide with claim-safety and privacy rules.

**Files modified:**

- `index.html`
- `about.html`
- `care-fit.html`
- `daily-life.html`
- `events.html`
- `referrals.html`
- `location-contact.html`
- `404.html`
- `contact.html`
- `care-services.html`
- `who-we-serve.html`
- `styles.css`
- `docs/CONTENT_GUIDE.md`
- `docs/DEV_LOG.md`

**Reason:**

The site should use warmer, clearer, claim-safe Adult Family Home language and avoid implying specialty care, guaranteed placement, or medical/legal advice.

**Testing performed:**

- Public-copy phrase audit
- Claim-risk term audit
- Footer disclaimer audit
- HTML link and anchor audit
- `node --check script.js`

**Follow-up needed:**

- Resolved later on 2026-06-09: owner confirmed both full residential addresses should remain public.

### 2026-06-08 - Completed contact detail and navigation audit

**Changed:**

- Verified public contact references for phone, email, and Federal Way addresses.
- Updated stale contact navigation on `care-services.html` and `who-we-serve.html` to point to `location-contact.html#contact`.
- Wired the older page mobile navigation buttons to the existing `toggleMenu()` behavior.
- Marked AFH-001 and AFH-006 complete in the backlog.

**Files modified:**

- `care-services.html`
- `who-we-serve.html`
- `docs/BACKLOG.md`
- `docs/DEV_LOG.md`

**Reason:**

The site should route visitors to the current contact form and should not retain stale contact-page links or broken internal anchors.

**Testing performed:**

- `node --check script.js`
- Local PowerShell link and anchor audit for HTML pages

**Follow-up needed:**

- Continue with AFH-007 image/reference QA and AFH-009 analytics confirmation.

### 2026-06-08 - Verified contact Worker setup

**Changed:**

- Marked the contact Worker operational setup as complete.
- Updated project tracking docs to show the contact form Worker workflow is no longer pending.
- Documented that Cloudflare Worker deploy settings, `EMAIL` binding, live form test, and Worker status review are complete.

**Files modified:**

- `contact-worker/docs/contact-worker-setup.md`
- `docs/BACKLOG.md`
- `docs/PROJECT_STATE.md`
- `docs/DEV_LOG.md`

**Reason:**

The contact form API setup has been completed and should be reflected in the project tracking docs.

**Testing performed:**

- Documentation-only update; no runtime code changed.

**Follow-up needed:**

- Continue with referral pathway, analytics confirmation, SEO basics, and accessibility QA.

### 2026-06-02 - Connected location contact form to Cloudflare endpoint

**Changed:**

- Replaced the `mailto:` contact form behavior with a `POST /api/contact` submission.
- Added a Cloudflare Pages Function that validates inquiry fields, blocks honeypot spam submissions, and sends email through the `EMAIL` binding.
- Updated the public inquiry fallback email to `inquiries@acaringadulthome.com`.
- Kept the form privacy-safe by requiring only general inquiry fields and warning against sensitive medical or identity details.
- Added minimal Wrangler configuration for the Cloudflare email binding.

**Files modified:**

- `location-contact.html`
- `script.js`
- `styles.css`
- `functions/api/contact.js`
- `wrangler.toml`
- `docs/DECISIONS.md`
- `docs/DEV_LOG.md`

**Reason:**

The production form should work for visitors without opening a local email client and should route inquiry notifications server-side through Cloudflare.

**Testing performed:**

- `node --check script.js`
- `node --check functions/api/contact.js`

**Follow-up needed:**

- Deploy to Cloudflare Pages and submit a live test inquiry to confirm delivery to `inquiries@acaringadulthome.com`.

**Cloudflare setup update:**

- `website@acaringadulthome.com` has been enabled in Cloudflare as the sender address.

### 2026-05-30 — Documentation pack created

Created Codex-ready documentation for the ACaring Adult Home website.

Key goals captured:

- Keep current static multi-page website structure.
- Connect the contact/inquiry workflow.
- Make the contact form privacy-safe.
- Create a practical path for events and activities.
- Preserve warm Adult Family Home tone.
- Build toward a referral funnel rather than a static brochure.
- Add testing and decision-tracking discipline.

Files added:

- `README.md`
- `PROJECT_STATE.md`
- `ROADMAP.md`
- `BACKLOG.md`
- `DECISIONS.md`
- `DEV_LOG.md`
- `CODEX_INSTRUCTIONS.md`
- `TESTING_CHECKLIST.md`
- `FORM_CONTACT_WORKFLOW.md`
- `EVENTS_ACTIVITIES_PLAN.md`
- `PRIVACY_IMAGE_POLICY.md`
- `CONTENT_GUIDE.md`
- `DEPLOYMENT_ANALYTICS.md`
- `COMPLIANCE_REFERENCES.md`
- `CODEX_TASKS.md`

## Template for future entries

### YYYY-MM-DD — Short title

**Changed:**

- Item 1
- Item 2

**Files modified:**

- `path/file.html`
- `path/file.css`

**Reason:**

Short explanation.

**Testing performed:**

- Desktop view checked
- Mobile view checked
- Form submitted
- Links checked

**Follow-up needed:**

- Item 1
- Item 2
