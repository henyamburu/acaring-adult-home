# Backlog — ACaring Adult Home Website

_Last updated: 2026-06-08_

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
| AFH-009 | P1 | Analytics | Confirm Cloudflare Web Analytics is installed once | Open | Avoid duplicate scripts |
| AFH-010 | P1 | Referrals | Strengthen `referrals.html` into a professional referral pathway | Open | Include family + case manager language |
| AFH-011 | P1 | Events | Build reusable event/activity card layout | Open | Keep static at first |
| AFH-012 | P1 | SEO | Add page titles and meta descriptions | Open | Local search + trust wording |
| AFH-013 | P1 | Accessibility | Ensure forms have labels and readable contrast | Open | Use semantic HTML |
| AFH-014 | P1 | Contact | Add “Start the Conversation” section with map/location context | Open | Include two locations only if business wants both public |
| AFH-015 | P1 | Content | Add “What happens after you contact us?” section | Open | Sets family expectations |
| AFH-016 | P2 | Content | Add FAQ section | Open | Family/referral questions |
| AFH-017 | P2 | Content | Create simple family guide page | Open | Good trust-building page |
| AFH-018 | P2 | Analytics | Track inquiry sources manually | Open | Add optional “How did you hear about us?” field |
| AFH-019 | P2 | Operations | Add inquiry review checklist | Open | Can be in docs first, later page/download |
| AFH-020 | P3 | System | Add lightweight CMS or JSON data source for events | Future | Only when static editing becomes annoying |
| AFH-021 | P3 | Content | Add resource library | Future | Articles and placement education |

## Recommended next sprint

### Sprint: Contact + inquiry readiness

1. Confirm contact information.
2. Connect form.
3. Add privacy-safe form text.
4. Test successful submission.
5. Add form submission instructions to `DEV_LOG.md`.
6. Update `DECISIONS.md` with chosen form provider/architecture.

## Codex task prompt for next sprint

```text
Using the current repository and docs/ folder, implement the next sprint: contact and inquiry readiness. Do not redesign the entire site. Inspect contact.html, script.js, and any shared layout first. Connect or prepare the contact form according to docs/FORM_CONTACT_WORKFLOW.md. Add a privacy-safe notice that asks users not to submit sensitive medical information. Ensure all form fields have labels, mobile layout works, and success/error states are clear. Update docs/DEV_LOG.md and docs/DECISIONS.md with what changed.
```
