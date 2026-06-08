# Project State — ACaring Adult Home Website

_Last updated: 2026-06-08_

## Website purpose

ACaring Adult Home needs a clear, warm, and trustworthy website that helps families, case managers, discharge planners, placement coordinators, and referral partners understand the home and start a conversation.

The website should support resident placement efforts, not merely present static information.

## Current known structure

The site has been organized as a static multi-page website rather than one long scrolling page.

Known files/pages:

| File | Purpose | Current status |
|---|---|---|
| `index.html` | Home page / first impression | Existing |
| `about.html` | About the home and care philosophy | Existing |
| `care-services.html` | Services and support offered | Existing |
| `who-we-serve.html` | Resident fit and care categories | Existing |
| `daily-life.html` | Daily rhythms, meals, activities, supervision | Existing |
| `events.html` | Activities / upcoming events | Existing but likely needs stronger structure |
| `referrals.html` | Referral pathway and placement partner messaging | Existing |
| `contact.html` | Contact and inquiry form | Connected to Cloudflare Worker contact API |
| `styles.css` | Global styling | Existing |
| `script.js` | Global JavaScript | Existing |

## Current design direction

The website should feel:

- Calm
- Trustworthy
- Warm
- Family-oriented
- Practical
- Professional but not institutional
- Clear enough for referral partners
- Respectful of residents and privacy

Avoid:

- Overly corporate healthcare language
- Aggressive sales language
- Generic stock-photo-heavy design
- Claims that sound clinical, guaranteed, or outside the home’s licensed scope
- Any content that implies medical treatment beyond what the home is authorized and staffed to provide

## Current known pending work

| Area | Need |
|---|---|
| Contact form | Complete: inquiry submissions route through the `acaring-contact-api` Worker |
| Contact page | Make the page more action-oriented and clear |
| Referral workflow | Clarify how case managers/families should start an inquiry |
| Events / activities | Build a structure for upcoming activities, family updates, and community presence |
| HIPAA/privacy-safe imagery | Define what photos may be used and what should be avoided |
| Analytics | Confirm Cloudflare Web Analytics or equivalent is installed and working |
| SEO basics | Improve titles, descriptions, local search signals, and structured headings |
| Accessibility | Ensure mobile, keyboard, contrast, and form label behavior are acceptable |
| Deployment | Keep GitHub to Cloudflare Pages deployment clean and predictable |

## Known business context

- The website is for an Adult Family Home in Federal Way, Washington.
- Two addresses have been discussed for ACaring Adult Home locations:
  - 2401 South 359th Street, Federal Way, WA 98003
  - 32634 49th Pl SW, Federal Way, WA 98023
- The site should support inquiries for adult family home placement and care conversations.
- The site may later support events, educational resources, referral partner content, and a stronger local authority/referral funnel.

## Technical assumptions

Current assumption: static website using HTML, CSS, and JavaScript.

No build system should be introduced unless there is a strong reason. Static HTML is acceptable for now because the site is small, low-cost, easy to deploy, and easy to maintain.

## Main risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| Form collects too much sensitive data | Website inquiries can accidentally collect health information | Keep form minimal; avoid diagnosis/medical detail fields; use callback-based workflow |
| Resident photos create privacy exposure | Images can reveal resident identity, health status, or living situation | Use empty-room, staged, staff-only, object, exterior, meal, and activity-area photos unless written authorization exists |
| Site becomes static brochure | Does not help fill resident openings | Build contact/referral funnel and outreach assets |
| Too many changes at once | Static site can become inconsistent | Codex should make small, documented changes |
| Events page becomes stale | Old events reduce trust | Use simple dated content rules and hide expired items when possible |

## Definition of “done” for near-term site readiness

The website is considered minimally ready when:

- All navigation links work.
- Contact information is accurate.
- Inquiry form is connected or a clear interim contact method exists.
- No placeholder phone/email remains.
- No placeholder image names are broken.
- Cloudflare deployment is stable.
- Analytics is confirmed.
- Form test submission is received successfully.
- Mobile layout is usable.
- No page asks for unnecessary sensitive health information.

## Recent completion notes

- Contact form Worker setup is complete and documented in `contact-worker/docs/contact-worker-setup.md`.
- Cloudflare Worker deploy settings, `EMAIL` binding, live contact form test, and Worker logs/status review have been marked complete.
