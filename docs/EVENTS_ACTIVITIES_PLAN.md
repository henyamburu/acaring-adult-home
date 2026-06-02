# Events and Activities Plan — ACaring Adult Home Website

_Last updated: 2026-05-30_

## Purpose

The events/activities page should help families and referral partners feel the home has routine, warmth, and life inside it.

This page should not require heavy maintenance.

## Page goals

- Show that daily life is active and structured.
- Build trust with families.
- Give referral partners confidence in the home environment.
- Provide a place for seasonal updates and community notes.
- Avoid exposing resident identity or private details.

## Recommended sections

### 1. Upcoming activities

Use for simple planned activities:

- Seasonal meal themes
- Music afternoons
- Birthday month recognition without resident names
- Outdoor/garden time
- Family visit windows
- Holiday preparation
- Community awareness activities

### 2. Everyday rhythms

Use evergreen content that does not go stale:

- Morning routines
- Meal times
- Light activities
- Quiet time
- Evening routines
- Family communication

### 3. Community notes

Use for occasional updates:

- Local senior/disability resource events
- Family caregiver education links
- Referral partner announcements
- WA Cares-related updates if verified

### 4. Past highlights

Use only if content can be maintained.

Avoid resident names, faces, or details unless approved.

## Suggested activity card fields

| Field | Purpose |
|---|---|
| Title | Short activity name |
| Date or timeframe | Optional; only use if maintained |
| Category | Daily life, seasonal, family, community |
| Short description | 1–3 sentences |
| Image | Optional privacy-safe image |
| CTA | Optional link to contact page |

## Static HTML card pattern

```html
<article class="activity-card">
  <p class="activity-card__eyebrow">Seasonal Activity</p>
  <h2>Warm meal and conversation afternoon</h2>
  <p>A simple afternoon routine focused on familiar meals, calm conversation, and a comfortable home setting.</p>
  <a href="contact.html">Ask about daily life</a>
</article>
```

## Privacy-safe event content examples

Good examples:

- “Spring garden preparation”
- “Family-friendly visiting afternoon”
- “Comfort meal week”
- “Music and memory-friendly afternoon”
- “Quiet evening routine focus”

Avoid examples:

- “John’s dementia care celebration”
- “Resident medication education night”
- “Photos from our residents’ care plans”
- “Behavior support group for current residents”

## Maintenance rule

If the page uses specific dates, review it monthly.

If monthly review is not realistic, use evergreen activity sections instead of a live calendar.

## Future enhancement

When static HTML becomes difficult to update, move activities into a simple `activities.json` file and render cards with JavaScript.

Do not add a database or CMS until updates become frequent enough to justify the complexity.
