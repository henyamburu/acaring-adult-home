# Decisions — ACaring Adult Home Website

_Last updated: 2026-06-09_

Use this file to record decisions that affect the site structure, content model, privacy posture, deployment, or future maintainability.

## Decision log

| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-05-30 | Keep the site as a static multi-page HTML/CSS/JS website for now | Lowest-cost, simplest to deploy, easy to edit, appropriate for current size | Active |
| 2026-05-30 | Treat the inquiry form as a conversation starter, not a medical intake form | Reduces risk of collecting sensitive health information through a simple website | Active |
| 2026-05-30 | Avoid resident-identifying images unless written authorization and business approval exist | Protects resident dignity and reduces privacy risk | Active |
| 2026-05-30 | Build the events page as static cards first | Avoids overengineering before content volume exists | Active |
| 2026-05-30 | Use Cloudflare Analytics or a privacy-light analytics approach during early phase | Enough to detect traffic without building a complex marketing stack | Active |
| 2026-06-02 | Use a Cloudflare Pages Function with an `EMAIL` binding for website inquiries | Keeps form submission server-side, avoids unreliable `mailto:` behavior, and sends notifications to the approved inquiry alias | Active |
| 2026-06-02 | Use `website@acaringadulthome.com` as the verified Cloudflare sender address for inquiry notifications | Sender has been enabled in Cloudflare and matches the configured `EMAIL` binding | Active |
| 2026-06-09 | Use conservative local SEO wording focused on "Adult Family Home in Federal Way, WA" | Supports local search without keyword stuffing, ranking claims, fake reviews, or medical overclaims | Active |
| 2026-06-09 | Keep both Federal Way residential locations visible because they were already public on the site | Structured data and footer wording use the two existing public locations; owner should still confirm this remains approved for public display | Active |
| 2026-06-09 | Add optional inquiry-source tracking to the contact form | Helps understand whether inquiries come from Google Search, Google Maps, state resources, referral partners, family/friends, social media, or other sources without collecting sensitive health data | Active |
| 2026-06-09 | Use `Organization` plus separate `LocalBusiness` schema nodes for the two locations | More accurately represents the business and avoids one LocalBusiness entity with multiple addresses in a single address array | Active |
| 2026-06-09 | Do not add `geo`, `sameAs`, `aggregateRating`, reviews, or a medical schema subtype | Coordinates, the shared Google Business Profile URL, displayed compliant reviews, and medical-clinic representation have not been verified for markup use | Active |
| 2026-06-09 | Use Cloudflare Pages `_redirects` for contact redirects | Provides 301 behavior for `/contact.html` and `/contact` instead of relying on meta refresh | Active |
| 2026-06-09 | No GA4 or GTM script is installed; safe conversion event hooks are conditional only | Prevents new tracking from being added without approval while allowing future non-PII inquiry success measurement | Active |

## Pending decisions

| Decision needed | Options | Recommendation |
|---|---|---|
| Inquiry storage | Email only, email + spreadsheet, CRM | Start with email; later add spreadsheet/CRM if volume grows |
| Events data model | Hardcoded HTML cards, JSON file rendered by JS, CMS | Start hardcoded; move to JSON when updates become frequent |
| Public locations | One public address, two public addresses, service area only | Both addresses remain public because they were already on the site; owner should confirm ongoing approval |
| Separate Google Business Profiles | One shared profile, two profiles, none verified | Use one shared profile for now; no `sameAs` link is added until the official profile URL is confirmed |
| GA4 or GTM | Cloudflare Web Analytics only, GA4, GTM, none | No GA4/GTM script installed; revisit only with owner approval and non-PII event rules |
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
