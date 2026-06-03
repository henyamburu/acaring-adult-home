# Codex Instructions — ACaring Adult Home Website

_Last updated: 2026-05-30_

This is the controlling instruction file for Codex work on the ACaring Adult Home website.

## Project role

You are assisting with a small Adult Family Home website. The site must be calm, trustworthy, clear, and practical. It should help families and referral partners start a conversation about placement and care.

## Before making changes

Always inspect:

1. Current repository structure
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. `docs/BACKLOG.md`
5. `docs/DECISIONS.md`
6. `docs/TESTING_CHECKLIST.md`

Then summarize:

- What you found
- Which files you plan to modify
- Any risks or assumptions

## General development rules

- Preserve the existing static site unless specifically instructed otherwise.
- Prefer small, focused changes over large rewrites.
- Keep HTML semantic and readable.
- Keep CSS maintainable and avoid duplication.
- Do not introduce unnecessary frameworks.
- Do not add a build system unless there is a clear benefit.
- Do not change business facts unless explicitly given updated information.
- Do not invent licenses, certifications, care capabilities, staff credentials, or availability.
- Do not overpromise medical, behavioral, dementia, or developmental disability care.
- Use respectful, non-institutional language.

## Content tone

Use language that is:

- Warm
- Direct
- Calm
- Family-friendly
- Professional
- Practical
- Plain English

Avoid language that is:

- Pushy
- Overly clinical
- Overly sales-oriented
- Fear-based
- Too generic
- Too long

## Privacy and sensitive information rules

The public website must not be treated as a medical intake system.

For public forms:

- Ask only for minimal contact and inquiry details.
- Include clear instruction not to submit sensitive medical details.
- Do not request diagnosis, medication lists, Social Security numbers, Medicaid IDs, Medicare IDs, full date of birth, or detailed behavioral/medical history.

For images:

- Do not add identifiable resident photos unless the business confirms written authorization.
- Prefer exterior, room, meal, hands-without-face, garden, activity setup, staff-only, and staged photos.
- Do not use images that show charts, medication containers, resident names, care plans, whiteboards, paperwork, or personal identifiers.

## Form handling rules

When modifying forms:

- Use real `<label>` elements.
- Use accessible error states.
- Add success state.
- Include spam prevention when possible.
- Avoid sending form data to unknown or unapproved third-party scripts.
- Update `docs/DECISIONS.md` with the chosen form approach.
- Update `docs/DEV_LOG.md` with implementation and testing notes.

## Events/activity page rules

When modifying `events.html`:

- Keep content easy to update.
- Use reusable card patterns.
- Avoid resident-identifying photos.
- Include dates only when they can be maintained.
- Remove or archive stale events.
- Make events feel like daily life/trust-building, not entertainment marketing.

## SEO rules

When improving SEO:

- Use unique `<title>` and meta description per page.
- Keep headings logical.
- Use local relevance naturally.
- Do not keyword-stuff.
- Do not create pages with thin or duplicated content.

## Accessibility rules

- Use semantic HTML.
- Ensure forms have labels.
- Ensure links and buttons have clear text.
- Ensure color contrast is readable.
- Ensure the site works on mobile.
- Ensure keyboard navigation is not broken.

## Completion requirements

Before completing a task, Codex must:

1. Summarize changed files.
2. Explain why the change was made.
3. Note any assumptions.
4. Run through the relevant parts of `TESTING_CHECKLIST.md`.
5. Update `DEV_LOG.md`.
6. Update `DECISIONS.md` if a decision was made.
7. Identify the next recommended task.

## Default non-coding response format

When asked for analysis only, use:

```text
Current finding:
Recommended direction:
Risks:
Files likely affected:
Next task:
```

## Default coding response format

When asked to modify code, use:

```text
Summary:
Files changed:
Testing performed:
Assumptions:
Next recommended step:
```

## Git, Commit, and Pull Request Rule

Codex may make code, content, documentation, or configuration changes without asking for permission each time, as long as the requested task is clear and the changes stay within the stated scope.

Codex is allowed to:

- Create new files
- Modify existing files
- Delete files only when clearly justified by the task
- Stage changes
- Commit changes
- Push a feature branch, when repository access allows it

Codex must **not** push directly to `main`, `master`, or any protected production branch.

Codex must always work from a separate branch using a clear branch name, for example:

```text
codex/contact-form-workflow
codex/events-page-update
codex/referral-page-improvements
codex/docs-update
