# Codex Task Prompts — ACaring Adult Home Website

_Last updated: 2026-05-30_

Use these prompts directly with Codex.

---

## Task 1 — Repository audit only

```text
Audit this repository for the ACaring Adult Home website. Do not modify application code yet. Read the docs/ folder first, especially docs/CODEX_INSTRUCTIONS.md, docs/PROJECT_STATE.md, and docs/TESTING_CHECKLIST.md.

Then report:
- current file structure
- pages found
- missing pages or broken references
- contact form status
- image references and missing assets
- deployment/build assumptions
- privacy-sensitive issues
- highest priority next changes

Update docs/DEV_LOG.md with your findings. Do not change HTML/CSS/JS yet.
```

---

## Task 2 — Contact form readiness

```text
Implement contact form readiness for the ACaring Adult Home website.

Read docs/FORM_CONTACT_WORKFLOW.md first.

Requirements:
- Keep the form as a general inquiry form, not a medical intake form.
- Add a privacy-safe notice telling users not to submit detailed medical history, medication lists, Social Security numbers, Medicaid/Medicare numbers, or other sensitive personal information.
- Ensure all fields have accessible labels.
- Add clear required fields.
- Add success and error messaging.
- Add or prepare spam-prevention support if appropriate.
- Do not introduce a full framework.
- Do not redesign the entire site.

After changes:
- Update docs/DEV_LOG.md.
- Update docs/DECISIONS.md if a form provider or architecture is selected.
- Summarize changed files and testing performed.
```

---

## Task 3 — Events page structure

```text
Improve the events/activities page for the ACaring Adult Home website.

Read docs/EVENTS_ACTIVITIES_PLAN.md and docs/PRIVACY_IMAGE_POLICY.md first.

Requirements:
- Keep the page static for now.
- Create reusable activity/event cards.
- Include evergreen activity content if no real dates are provided.
- Avoid resident-identifying images or details.
- Add a CTA back to contact.html.
- Keep the tone warm, calm, and practical.

After changes:
- Update docs/DEV_LOG.md.
- Note any image assumptions.
- Summarize changed files and testing performed.
```

---

## Task 4 — Referral page strengthening

```text
Improve referrals.html so it works better for case managers, discharge planners, placement coordinators, and family decision-makers.

Requirements:
- Explain who can start a referral conversation.
- Clarify that placement depends on assessment, availability, and fit.
- Add a simple “how to start” process.
- Link clearly to contact.html.
- Avoid collecting sensitive medical details on the public page.
- Do not overpromise services or placement.

After changes:
- Update docs/DEV_LOG.md.
- Summarize changed files and testing performed.
```

---

## Task 5 — SEO and metadata pass

```text
Run a basic SEO and metadata pass across the static site.

Requirements:
- Add or improve unique title tags.
- Add unique meta descriptions.
- Preserve calm Adult Family Home tone.
- Improve heading structure where needed.
- Add local relevance naturally, without keyword stuffing.
- Do not make unsupported care claims.

After changes:
- Update docs/DEV_LOG.md.
- Summarize changed files and testing performed.
```

---

## Task 6 — Image/privacy audit

```text
Audit all image references in the ACaring Adult Home website.

Read docs/PRIVACY_IMAGE_POLICY.md first.

Report:
- images referenced by each page
- missing image files
- images that appear privacy-sensitive
- alt text issues
- recommended replacements

Do not add resident-identifying images. If changes are requested, use only approved existing image assets or privacy-safe placeholders.

Update docs/DEV_LOG.md with findings.
```

---

## Task 7 — Cloudflare deployment troubleshooting

```text
Review the repository and deployment assumptions for the ACaring Adult Home website.

Read docs/DEPLOYMENT_ANALYTICS.md first.

Report:
- whether the repo appears to be static HTML/CSS/JS
- whether a build command is needed
- likely Cloudflare Pages output directory
- possible reasons live site may lag behind GitHub changes
- steps to verify latest deployment

Do not change code unless specifically instructed.
```

---

## Task 8 — Monthly website review

```text
Perform a monthly review of the ACaring Adult Home website.

Check:
- contact information
- form function
- page freshness
- events/activity page freshness
- broken links
- missing images
- privacy-sensitive content
- analytics placement
- referral page usefulness
- mobile layout

Update docs/DEV_LOG.md with findings and create a prioritized next-action list in docs/BACKLOG.md.
```
