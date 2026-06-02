# Testing Checklist — ACaring Adult Home Website

_Last updated: 2026-05-30_

Use this checklist before considering any Codex task complete.

## 1. Page availability

- [ ] `index.html` loads.
- [ ] `about.html` loads.
- [ ] `care-services.html` loads.
- [ ] `who-we-serve.html` loads.
- [ ] `daily-life.html` loads.
- [ ] `events.html` loads.
- [ ] `referrals.html` loads.
- [ ] `contact.html` loads.
- [ ] No page has obvious broken layout.

## 2. Navigation

- [ ] Header navigation works on every page.
- [ ] Footer navigation works on every page.
- [ ] Current page state is not misleading.
- [ ] Mobile navigation works, if present.
- [ ] Logo/home link returns to `index.html`.

## 3. Contact and forms

- [ ] Contact phone is correct.
- [ ] Contact email is correct.
- [ ] Address/location copy is correct.
- [ ] Form labels are visible or accessible.
- [ ] Required fields are appropriate.
- [ ] Form does not request sensitive medical details.
- [ ] Privacy-safe warning appears before message field.
- [ ] Submit button is clear.
- [ ] Success state appears after valid submission.
- [ ] Error state appears after failure.
- [ ] Test submission reaches intended destination.
- [ ] Spam prevention works or is planned.

## 4. Privacy-sensitive review

- [ ] No resident-identifying photos unless approved.
- [ ] No visible documents, medication containers, charts, names, or care plans in images.
- [ ] No testimonials reveal sensitive health conditions without explicit written authorization.
- [ ] No page collects unnecessary protected/sensitive information.
- [ ] No hidden third-party tracking scripts beyond approved analytics.

## 5. Events and activities

- [ ] Events page has current or evergreen content.
- [ ] Expired events are removed or clearly marked as past.
- [ ] Activity images are privacy-safe.
- [ ] Events do not imply a care guarantee.
- [ ] Content is easy to update later.

## 6. Mobile responsiveness

Test at approximately:

- [ ] 375px width
- [ ] 768px width
- [ ] 1024px width
- [ ] Desktop width

Check:

- [ ] Text is readable.
- [ ] Buttons are tappable.
- [ ] Form fields are usable.
- [ ] Map/card sections do not overflow.
- [ ] Images scale properly.

## 7. Accessibility

- [ ] Page has one main `<h1>`.
- [ ] Heading order is logical.
- [ ] Links have meaningful text.
- [ ] Buttons have meaningful text.
- [ ] Images have useful `alt` text or empty `alt=""` when decorative.
- [ ] Form errors are understandable.
- [ ] Keyboard navigation is usable.
- [ ] Contrast appears readable.

## 8. SEO basics

- [ ] Each page has a unique `<title>`.
- [ ] Each page has a useful meta description.
- [ ] Local relevance is included naturally where appropriate.
- [ ] Open Graph tags are present if supported.
- [ ] No duplicate placeholder metadata remains.

## 9. Performance

- [ ] Images are reasonably compressed.
- [ ] No oversized image files are used unnecessarily.
- [ ] Scripts are deferred where appropriate.
- [ ] No large third-party libraries are added without reason.

## 10. Deployment

- [ ] Code committed to the correct branch.
- [ ] Cloudflare deployment completed successfully.
- [ ] Live site reflects latest changes.
- [ ] Browser cache or Cloudflare cache issues are noted if present.
- [ ] Final live URL is tested.
