# Deployment and Analytics — ACaring Adult Home Website

_Last updated: 2026-05-30_

## Current deployment assumption

The site is likely being maintained through GitHub and deployed through Cloudflare Pages or a similar Cloudflare setup.

Codex should confirm the actual deployment configuration from the repository and project settings before making assumptions.

## Deployment goals

- Keep deployment simple.
- Avoid unnecessary build steps.
- Make changes easy to verify.
- Reduce confusion when GitHub updates do not immediately appear live.

## Cloudflare Pages checklist

- [ ] Confirm production branch.
- [ ] Confirm deployment history after push.
- [ ] Confirm build command is empty or appropriate for static HTML.
- [ ] Confirm output directory is correct.
- [ ] Confirm custom domain is attached.
- [ ] Confirm SSL is active.
- [ ] Confirm latest deployment matches GitHub commit.

## Cache troubleshooting

If the site does not update after deployment:

1. Confirm the GitHub commit exists.
2. Confirm Cloudflare Pages deployment ran.
3. Confirm deployment succeeded.
4. Open the deployed preview URL.
5. Test in incognito/private browser.
6. Hard refresh the browser.
7. Purge Cloudflare cache only if needed.

## Analytics goal

Early analytics should answer:

- Is anyone visiting the site?
- Which pages are being viewed?
- Where are visitors coming from?
- Are people reaching the contact/referrals page?

## Recommended early metrics

| Metric | Why it matters |
|---|---|
| Page views | Basic visibility |
| Unique visitors | Reach |
| Top pages | Content interest |
| Referrers | Outreach source signal |
| Contact page visits | Intent signal |
| Form submissions | Conversion signal |
| Referral page visits | Professional/referral interest |

## Privacy-light analytics

Cloudflare Web Analytics is a reasonable early-stage analytics option because it can provide visibility without introducing a heavy marketing stack.

## Manual monthly review

Create a monthly note with:

- Total visitors
- Top pages
- Contact page visits
- Form submissions
- Source/referrer patterns
- Outreach actions taken
- Next content or outreach action

## Future tracking idea

Later, add a simple inquiry source field:

```text
How did you hear about us?
```

Options:

- Family/friend
- Case manager
- Hospital/discharge planner
- Placement coordinator
- WA Cares/network contact
- Google search
- Social media
- Other

Do not overbuild analytics before traffic exists.
