# Form and Contact Workflow — ACaring Adult Home Website

_Last updated: 2026-05-30_

## Purpose

The contact form should help a family member, referral partner, case manager, discharge planner, or interested party start a conversation.

It should not become a public medical intake form.

## Recommended form copy

Place this near the form:

```text
Please use this form to start a general conversation with us. For privacy, do not include detailed medical history, medication lists, Social Security numbers, Medicaid or Medicare numbers, or other sensitive personal information in this form. We can discuss next steps directly by phone.
```

## Recommended fields

| Field | Type | Required | Notes |
|---|---|---:|---|
| Full name | Text | Yes | Person submitting inquiry |
| Email | Email | Yes | For response |
| Phone | Tel | Yes | Important for care conversations |
| Preferred contact method | Select/radio | No | Phone, email, either |
| Relationship to prospective resident | Select | No | Family, guardian, case manager, placement coordinator, other |
| Inquiry type | Select | No | Availability, services, referral, tour, general question |
| Short message | Textarea | No | Include privacy warning above this field |
| How did you hear about us? | Select/text | No | Useful later for source tracking |

## Fields to avoid on public website

Do not add these fields unless there is a verified secure intake workflow and business approval:

- Diagnosis
- Medication list
- Full date of birth
- Social Security number
- Medicaid/Medicare number
- Insurance ID
- Detailed care plan
- Behavior history
- Hospital discharge documents
- Legal/guardianship documents
- Upload attachment field

## Recommended workflow options

### Option A — Form-to-email service

Good for quick setup.

**Pros:**

- Fast to implement
- Usually low maintenance
- Good for early stage

**Cons:**

- Third-party handling of form data must be reviewed
- Pricing/features can change
- Must avoid sensitive medical details

### Option B — Cloudflare Pages Function or Worker + email service

Good if the site is already on Cloudflare and you want more control.

**Pros:**

- Fits Cloudflare deployment
- Can add spam protection
- Can control validation and routing

**Cons:**

- More technical setup
- May require email API service
- Must document environment variables and deployment process

### Option C — Google Form as temporary intake link

Good as a short-term bridge only.

**Pros:**

- Very fast
- Easy to test
- Responses can go to spreadsheet

**Cons:**

- Less professional
- More privacy-sensitive if users overshare
- Not ideal for the finished website

### Option D — `mailto:` fallback

Use only as a fallback.

**Pros:**

- Very simple
- No third-party form backend

**Cons:**

- Unreliable user experience
- Opens user’s email app
- Does not provide clean success/error handling

## Recommended near-term choice

Use **Option A or B** depending on how quickly the site needs to go live.

- If speed matters most: use a reputable form-to-email service with spam protection.
- If control matters most and Cloudflare is already used: use Cloudflare Worker/Pages Function with an email API.

## Form submission email format

Subject:

```text
New Website Inquiry — ACaring Adult Home
```

Body:

```text
New inquiry received from the website.

Name:
Email:
Phone:
Preferred contact method:
Relationship:
Inquiry type:
How they heard about us:

Message:

Reminder: Do not reply with sensitive resident details unless using an approved secure communication method.
```

## Success message

```text
Thank you for reaching out. Your message has been received. Someone from ACaring Adult Home will follow up with you directly.
```

## Error message

```text
We could not send your message right now. Please call us directly or try again later.
```

## Implementation notes for Codex

When implementing:

- Validate required fields client-side and server-side where possible.
- Never rely only on client-side validation.
- Add honeypot or Turnstile-style spam prevention if available.
- Keep JavaScript simple.
- Document environment variables if using a serverless function.
- Update `DECISIONS.md` after selecting the approach.
- Update `DEV_LOG.md` with test results.
