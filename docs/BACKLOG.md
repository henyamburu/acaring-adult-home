# Backlog — ACaring Adult Home Website

_Last updated: 2026-06-09_

## Priority legend

- **P0** — Required for basic readiness
- **P1** — Important for resident/referral pipeline
- **P2** — Useful improvement
- **P3** — Future enhancement

## Backlog table

| ID | Priority | Area | Task | Status | Notes |
|---|---:|---|---|---|---|
| AFH-001 | P0 | Contact | Verify official phone, email, and address on every page | Complete | Contact details audited; no placeholder contact details found |
| AFH-002 | P0 | Forms | Connect `contact.html` form to email or approved intake workflow | Complete | Cloudflare Worker `acaring-contact-api` handles contact submissions |
| AFH-003 | P0 | Forms | Add privacy notice above form | Complete | Form copy warns users not to submit sensitive medical details |
| AFH-004 | P0 | Forms | Add form confirmation/success state | Complete | Live contact form test completed |
| AFH-005 | P0 | Forms | Add spam prevention | Complete | Honeypot field is implemented in the Worker workflow |
| AFH-006 | P0 | QA | Check all links and navigation | Complete | Internal links and anchors checked; stale contact links fixed |
| AFH-007 | P0 | Images | Replace broken/placeholder image references | Open | See `PRIVACY_IMAGE_POLICY.md` |
| AFH-008 | P0 | Deployment | Confirm Cloudflare Pages deploys latest GitHub files | Complete | `main` is current and Worker setup is documented |
| AFH-009 | P1 | Analytics | Confirm Cloudflare Web Analytics is installed once | Open | Placeholder comments remain; real script still needs owner/account install |
| AFH-010 | P1 | Referrals | Strengthen `referrals.html` into a professional referral pathway | Complete | Family, case manager, discharge planner, placement coordinator, and CTA language added |
| AFH-011 | P1 | Events | Build reusable event/activity card layout | Open | Keep static at first |
| AFH-012 | P1 | SEO | Add page titles and meta descriptions | Complete | Verified unique public page titles and descriptions |
| AFH-013 | P1 | Accessibility | Ensure forms have labels and readable contrast | Complete | Contact form label audit completed |
| AFH-014 | P1 | Contact | Add “Start the Conversation” section with map/location context | Complete | Contact page includes two-location context and map links |
| AFH-015 | P1 | Content | Add “What happens after you contact us?” section | Complete | FAQ and referral content explain next steps |
| AFH-016 | P2 | Content | Add FAQ section | Complete | Accessible FAQ accordion and matching FAQ schema added |
| AFH-017 | P2 | Content | Create simple family guide page | Open | Good trust-building page |
| AFH-018 | P2 | Analytics | Track inquiry sources manually | Complete | Optional “How did you hear about us?” field added and forwarded safely |
| AFH-019 | P2 | Operations | Add inquiry review checklist | Open | Can be in docs first, later page/download |
| AFH-020 | P3 | System | Add lightweight CMS or JSON data source for events | Future | Only when static editing becomes annoying |
| AFH-021 | P3 | Content | Add resource library | Future | Articles and placement education |
| AFH-022 | P1 | Local Visibility | Add Local Visibility Sprint metadata, local content, NAP footer, structured data, sitemap, robots, FAQ, referral updates, and inquiry-source tracking | Complete | Implemented 2026-06-09 |
| AFH-023 | P1 | Structured Data | Split LocalBusiness schema into Organization plus separate LocalBusiness nodes per location | Complete | Implemented with `@graph`; no ratings, sameAs, geo, or medical subtype added |
| AFH-024 | P1 | Redirects | Replace `contact.html` meta refresh with Cloudflare Pages 301 redirects | Complete | Added `_redirects`; removed redirect page from sitemap |
| AFH-025 | P2 | Trust Links | Add authoritative Washington DSHS Adult Family Home resource link | Complete | Added official DSHS Adult Family Home Locator link without endorsement language |

## Recommended next sprint

### Sprint: Local Visibility

1. Add unique titles and meta descriptions to every public page.
2. Add Federal Way Adult Family Home content without keyword stuffing.
3. Add consistent footer NAP and clear local-location wording.
4. Add LocalBusiness JSON-LD using only verified public details.
5. Add `sitemap.xml` and `robots.txt`.
6. Expand the FAQ into an accessible accordion.
7. Strengthen the referral page for families and professional referral partners.
8. Add optional inquiry-source tracking to the public form and Worker.
9. Run metadata, form-label, script, analytics, and link checks.

## Codex task prompt for next sprint

```text
Using the current repository and docs/ folder, implement the next sprint: contact and inquiry readiness. Do not redesign the entire site. Inspect contact.html, script.js, and any shared layout first. Connect or prepare the contact form according to docs/FORM_CONTACT_WORKFLOW.md. Add a privacy-safe notice that asks users not to submit sensitive medical information. Ensure all form fields have labels, mobile layout works, and success/error states are clear. Update docs/DEV_LOG.md and docs/DECISIONS.md with what changed.
```
