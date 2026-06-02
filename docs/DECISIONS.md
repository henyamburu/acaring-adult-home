# Decisions — ACaring Adult Home Website

_Last updated: 2026-05-30_

Use this file to record decisions that affect the site structure, content model, privacy posture, deployment, or future maintainability.

## Decision log

| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-05-30 | Keep the site as a static multi-page HTML/CSS/JS website for now | Lowest-cost, simplest to deploy, easy to edit, appropriate for current size | Active |
| 2026-05-30 | Treat the inquiry form as a conversation starter, not a medical intake form | Reduces risk of collecting sensitive health information through a simple website | Active |
| 2026-05-30 | Avoid resident-identifying images unless written authorization and business approval exist | Protects resident dignity and reduces privacy risk | Active |
| 2026-05-30 | Build the events page as static cards first | Avoids overengineering before content volume exists | Active |
| 2026-05-30 | Use Cloudflare Analytics or a privacy-light analytics approach during early phase | Enough to detect traffic without building a complex marketing stack | Active |

## Pending decisions

| Decision needed | Options | Recommendation |
|---|---|---|
| Form provider | Cloudflare Worker/Pages Function, Formspree, Basin, Google Forms, mailto fallback | Prefer a real form-to-email workflow with spam protection; avoid `mailto` as final solution |
| Inquiry storage | Email only, email + spreadsheet, CRM | Start with email; later add spreadsheet/CRM if volume grows |
| Events data model | Hardcoded HTML cards, JSON file rendered by JS, CMS | Start hardcoded; move to JSON when updates become frequent |
| Public locations | One public address, two public addresses, service area only | Confirm business preference before publishing both locations prominently |
| Photography | Original property photos, staged staff photos, stock photos, abstract/home-detail photos | Prefer original property/detail photos with no residents shown |

## Decision rules for Codex

Codex must add a new entry here whenever it:

- Adds a dependency
- Changes deployment behavior
- Changes form handling
- Adds analytics/tracking
- Adds a new content type
- Changes file structure
- Introduces external scripts
- Changes privacy-sensitive behavior
- Adds or removes public business contact details

## Anti-decisions

Do **not** do these without explicit approval:

- Do not convert the site to React/Next/Vite just to make small edits.
- Do not introduce a database for basic events or contact text.
- Do not collect detailed medical intake data through the public website.
- Do not publish identifiable resident photos.
- Do not add tracking pixels beyond approved analytics.
- Do not add aggressive popups or sales funnels.
