# Codex Task: Connect Location Contact Form to Cloudflare Email Notification

## Project Context

This website is hosted through Cloudflare. The current "Start the Conversation" form on the location/contact page appears to use a `mailto:` behavior or otherwise attempts to open the visitor's local email client. That is not acceptable for production because it fails when the visitor does not have a local email client configured.

We have already created and tested the business inquiry alias:

`inquiries@acaringadulthome.com`

This alias is working and should be used as the recipient address for website inquiry notifications.

## Goal

Replace the current form behavior with a Cloudflare-backed form submission flow.

When a visitor submits the "Start the Conversation" form:

1. The browser should submit the form to a Cloudflare server-side endpoint.
2. The endpoint should validate the submitted fields.
3. The endpoint should generate a clear email notification.
4. The notification should be sent to:

`inquiries@acaringadulthome.com`

5. The user should receive a friendly success or failure message on the page.
6. The form must not open the visitor's email client.

## Preferred Architecture

Use a Cloudflare Pages Function or Cloudflare Worker endpoint.

Preferred endpoint:

`/api/contact`

The HTML form should submit to this endpoint using `POST`.

Example:

```html
<form id="contact-form" action="/api/contact" method="POST">
```

Do not use:

```html
mailto:
```

Do not expose private email-sending logic in client-side JavaScript.

## Files to Inspect

Inspect the repository and locate the correct files before making changes. Likely files may include:

* `location-contact.html`
* `contact.html`
* `index.html`
* `script.js`
* `styles.css`
* any Cloudflare Pages Functions folder
* any existing `functions/` directory
* any existing `wrangler.toml`, `wrangler.jsonc`, or Cloudflare configuration file

Do not assume the file names without checking the repo.

## Required Form Fields

The form should collect only general inquiry information.

Required fields:

* `name`
* `email`
* `phone`
* `inquiry_role`
* `inquiry_type`
* `message`

Suggested field labels:

* Name
* Email
* Phone
* I am a
* Inquiry type
* Message

Suggested `inquiry_role` options:

* Family member
* Placement coordinator
* Case manager
* Community partner
* Other

Suggested `inquiry_type` options:

* Availability
* Schedule a tour
* Referral discussion
* General question

## Privacy and Compliance Guardrails

This form is for general inquiries only.

Do not add fields that request:

* diagnosis
* detailed medical history
* Social Security number
* Medicaid number
* Medicare number
* date of birth
* financial account information
* medical record uploads
* resident assessment documents
* prescriptions
* insurance documents

Add this visible note near the message box:

```html
<p class="form-note">
  Please do not include Social Security numbers, Medicaid numbers, medical records,
  detailed diagnosis information, or other sensitive health information in this form.
  This form is for general inquiries only. We will follow up directly if more details are needed.
</p>
```

## Anti-Spam Requirement

Add a honeypot field to the form.

Example:

```html
<input type="text" name="website" tabindex="-1" autocomplete="off" class="hp-field" aria-hidden="true">
```

The field should be hidden from users using CSS.

If the honeypot field has a value during submission, the server-side endpoint should quietly reject or ignore the submission.

Do not rely only on client-side validation.

## Server-Side Validation

The `/api/contact` endpoint must validate:

* request method is `POST`
* `name` is present
* `email` is present and looks like a valid email address
* `message` is present
* honeypot field is empty

Suggested length limits:

* `name`: max 100 characters
* `email`: max 150 characters
* `phone`: max 50 characters
* `inquiry_role`: max 80 characters
* `inquiry_type`: max 80 characters
* `message`: max 2000 characters

Trim all submitted values.

Reject suspicious or oversized input.

Return JSON responses.

Success response:

```json
{
  "ok": true,
  "message": "Thank you. Your inquiry has been sent."
}
```

Failure response:

```json
{
  "ok": false,
  "message": "We could not send your inquiry. Please call or email us directly."
}
```

## Email Notification Content

Send the email notification to:

`inquiries@acaringadulthome.com`

Suggested subject:

`New Website Inquiry - ACaring Adult Home`

Suggested sender/from address:

`website@acaringadulthome.com`

If Cloudflare requires the sender to be an address on the routed domain, use an address under:

`acaringadulthome.com`

Do not use the visitor's email address as the email sender. Instead, place the visitor's email in the body and, if supported safely, as a reply-to field.

Email body should include:

```text
New website inquiry received.

Name:
{name}

Email:
{email}

Phone:
{phone}

Role:
{inquiry_role}

Inquiry Type:
{inquiry_type}

Message:
{message}

Submitted from:
ACaring Adult Home website

Privacy reminder:
This form is intended for general inquiries only. Sensitive medical, Medicaid, Social Security, or detailed health information should not be submitted through this form.
```

## Cloudflare Email Binding

Use Cloudflare’s supported email-sending binding for Workers/Pages Functions if available in this project.

Expected binding name:

`EMAIL`

Codex should check the current Cloudflare/Wrangler setup and add the appropriate configuration if the repo uses `wrangler.toml` or `wrangler.jsonc`.

Use the configured binding to send the email server-side.

If the current project does not yet have Cloudflare Function/Worker configuration, create the minimum required structure for Cloudflare Pages Functions.

Preferred structure:

```text
functions/
  api/
    contact.ts
```

or, if the project is plain JavaScript:

```text
functions/
  api/
    contact.js
```

Choose the style that matches the existing repo.

## Front-End Behavior

Update the form so it submits cleanly.

Preferred behavior:

1. Prevent duplicate submissions while the request is processing.
2. Disable the submit button during submission.
3. Show a success message when the server returns success.
4. Show an error message when the server fails.
5. Keep the phone/email fallback visible on the page.
6. Do not clear the form unless the submission succeeds.
7. After success, clear the form or show a confirmation state.

Suggested user-facing success message:

`Thank you. Your inquiry has been sent. We will follow up as soon as possible.`

Suggested user-facing failure message:

`We could not send your inquiry from the website. Please call us or email inquiries@acaringadulthome.com directly.`

## Accessibility Requirements

Make sure:

* every input has a proper label
* error/success message area uses `aria-live="polite"`
* required fields are clearly marked
* keyboard navigation works
* hidden honeypot is not confusing to screen readers

## Styling Requirements

Keep styling consistent with the current ACaring Adult Home website.

Do not create a visually unrelated form.

The form should remain:

* warm
* professional
* calm
* readable
* mobile friendly
* aligned with the existing location/contact page layout

## Testing Checklist

After implementation, test the following:

1. Submit the form with valid information.
2. Confirm the browser does not open an email client.
3. Confirm the request goes to `/api/contact`.
4. Confirm the email arrives at `inquiries@acaringadulthome.com`.
5. Confirm required field validation works.
6. Confirm invalid email validation works.
7. Confirm the honeypot blocks bot-like submissions.
8. Confirm success message displays.
9. Confirm failure message displays if the endpoint fails.
10. Confirm the form works on desktop and mobile.
11. Confirm the page layout is not broken.
12. Confirm no sensitive medical fields were added.

## Important Stop Condition

If Cloudflare email sending requires a paid feature or account setting that is not available in this Cloudflare account, do not invent a workaround and do not add a paid third-party dependency without approval.

Instead, stop and report:

* what failed
* what Cloudflare setting or binding is missing
* what free alternatives are available
* whether Web3Forms, FormSubmit, or another free endpoint would be the simplest fallback

## Acceptance Criteria

This task is complete when:

* The form no longer uses `mailto:`.
* The form submits to a Cloudflare server-side endpoint.
* Server-side validation exists.
* A notification email is sent to `inquiries@acaringadulthome.com`.
* The visitor sees a clear success or failure message.
* Sensitive medical information is not requested.
* The implementation is documented clearly enough for future maintenance.
