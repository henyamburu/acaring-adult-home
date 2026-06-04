# Cloudflare Contact Form Runbook for ACaring Adult Home

**Purpose:** Reusable implementation guide for a static website hosted on Cloudflare Pages with a server-side contact form handled by a separate Cloudflare Worker and Email Routing.

**Primary production flow:**

```text
Visitor submits contact form
→ /api/contact on the custom domain
→ Cloudflare Worker route
→ Worker validates FormData
→ Worker sends email through env.EMAIL
→ Cloudflare Email Routing delivers to verified destination inbox
```

---

## 1. Production cleanup checklist

Before calling the implementation complete, clean up debugging artifacts:

- Remove or disable any `?smoke=email` endpoint.
- Remove temporary `?probe=` logic unless it is harmless and intentionally documented.
- Remove any `Hello world` Worker starter code.
- Change `GET /api/contact` to return `405 Method Not Allowed`, or a clear JSON message such as `This endpoint only accepts POST contact submissions`.
- Keep logs safe: do not log full names, phone numbers, email bodies, messages, diagnosis details, or other sensitive user-submitted data.
- Remove plaintext `CLOUDFLARE_API_TOKEN` variables from the Worker if no longer needed.
- Revoke any Cloudflare API token that was exposed in screenshots, logs, or shared chat.
- Confirm public fallback address remains `inquiries@acaringadulthome.com`.
- Confirm actual Worker `destination_address` is the verified destination inbox, currently `acaringadulthome@gmail.com`.
- Confirm shared site assets use absolute paths: `/styles.css`, `/script.js`, `/images/...`.
- Confirm the form warning tells visitors not to submit SSN, Medicaid/Medicare numbers, medical records, or detailed diagnosis information.

---

## 2. Architecture decisions

### Use two Cloudflare projects

| Project | Role | Notes |
|---|---|---|
| `acaring-adult-home` | Cloudflare Pages website | Hosts static HTML, CSS, JS, images, and public pages. |
| `acaring-contact-api` | Cloudflare Worker API | Handles only `/api/contact*` and sends email through `env.EMAIL`. |

### Why not put email sending inside Pages?

The Pages project should stay simple. Earlier testing showed the Pages configuration rejected `send_email`. The stable pattern is:

```text
Pages = website hosting
Worker = contact API and email sending
```

---

## 3. Cloudflare dashboard setup - human steps

Codex can edit code, but it cannot reliably click through the Cloudflare dashboard. These items should be done manually.

### 3.1 Create the Pages project

1. Go to **Workers & Pages**.
2. Use the Pages path: **Looking to deploy Pages? Get started**.
3. Connect the GitHub repository.
4. Use:

```text
Framework preset: None
Build command: exit 0
Build output directory: .
Root directory: repo root, unless files live in a subfolder
```

5. Attach custom domains:

```text
acaringadulthome.com
www.acaringadulthome.com
```

### 3.2 Configure DNS

Expected DNS pattern:

```text
acaringadulthome.com       CNAME  acaring-adult-home.pages.dev   Proxied
www.acaringadulthome.com   CNAME  acaring-adult-home.pages.dev   Proxied
```

Avoid leaving `www` pointed to old GitHub Pages hosting.

### 3.3 Configure Email Routing

1. Go to the domain: `acaringadulthome.com`.
2. Open **Email Routing**.
3. Enable Email Routing.
4. Create public aliases/rules, for example:

```text
inquiries@acaringadulthome.com → acaringadulthome@gmail.com
referrals@acaringadulthome.com → acaringadulthome@gmail.com
```

5. Verify the destination address. For this site, the verified destination shown in Cloudflare is:

```text
acaringadulthome@gmail.com
```

Important: the Worker send_email binding must target the verified destination address, not only the public alias.

### 3.4 Configure the Worker route

Create or open the Worker project:

```text
acaring-contact-api
```

In **Domains & Routes**, add:

```text
acaringadulthome.com/api/contact*
www.acaringadulthome.com/api/contact*
```

Do not route the whole domain to the Worker. The website should remain on Pages.

### 3.5 Configure the Worker email binding

In the Worker project, add an **Email Service** binding:

```text
Binding name: EMAIL
Destination address: acaringadulthome@gmail.com
```

The code must call:

```js
env.EMAIL.send(...)
```

---

## 4. Repository structure

Recommended structure:

```text
repo-root/
  index.html
  location-contact.html
  styles.css
  script.js
  wrangler.toml                  # Pages config only

  contact-worker/
    wrangler.toml                # Worker config only
    src/
      index.js                   # Worker code
```

### Pages `wrangler.toml`

```toml
name = "acaring-adult-home"
pages_build_output_dir = "."
compatibility_date = "2026-06-03"
```

Do not put `[[send_email]]` in the Pages config.

### Worker `contact-worker/wrangler.toml`

```toml
name = "acaring-contact-api"
main = "src/index.js"
compatibility_date = "2026-06-03"

[[routes]]
pattern = "acaringadulthome.com/api/contact*"
zone_name = "acaringadulthome.com"

[[routes]]
pattern = "www.acaringadulthome.com/api/contact*"
zone_name = "acaringadulthome.com"

[[send_email]]
name = "EMAIL"
destination_address = "acaringadulthome@gmail.com"
```

Deploy from inside `contact-worker/`:

```powershell
cd C:\Users\henya\OneDrive\Code\acaring-adult-home\contact-worker
npx wrangler deploy
```

If deploying from the repo root, use an explicit config path:

```bash
npx wrangler deploy --config contact-worker/wrangler.toml
```

---

## 5. Contact Worker template - production version

This version intentionally excludes smoke-test endpoints.

```js
const RECIPIENT_EMAIL = "acaringadulthome@gmail.com";
const PUBLIC_ALIAS_EMAIL = "inquiries@acaringadulthome.com";
const FAILURE_MESSAGE =
  "We could not send your inquiry. Please call or email us directly.";

const LIMITS = {
  name: 100,
  email: 150,
  phone: 50,
  preferred_contact: 80,
  inquiry_role: 80,
  inquiry_type: 80,
  message: 2000
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function trimValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function tooLong(fields) {
  return Object.entries(LIMITS).some(([key, limit]) => fields[key].length > limit);
}

function buildEmailText(fields) {
  return [
    "New website inquiry received.",
    "",
    "Name:", fields.name,
    "",
    "Email:", fields.email,
    "",
    "Phone:", fields.phone,
    "",
    "Preferred contact method:", fields.preferred_contact || "Not provided",
    "",
    "Role:", fields.inquiry_role,
    "",
    "Inquiry Type:", fields.inquiry_type,
    "",
    "Message:", fields.message,
    "",
    "Submitted from:", "ACaring Adult Home website",
    "",
    "Privacy reminder:",
    "This form is intended for general inquiries only. Sensitive medical, Medicaid, Social Security, or detailed health information should not be submitted through this form."
  ].join("\n");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/contact")) {
      return jsonResponse({ ok: false, message: "Not found." }, 404);
    }

    if (request.method === "OPTIONS") {
      return jsonResponse({ ok: true });
    }

    if (request.method !== "POST") {
      return jsonResponse({
        ok: false,
        message: "This endpoint only accepts contact form submissions."
      }, 405);
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 12000) {
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 413);
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error("Contact form parse failed", { message: error?.message });
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
    }

    if (trimValue(formData.get("website"))) {
      return jsonResponse({ ok: true, message: "Thank you. Your inquiry has been sent." });
    }

    const fields = {
      name: trimValue(formData.get("name")),
      email: trimValue(formData.get("email")),
      phone: trimValue(formData.get("phone")),
      preferred_contact: trimValue(formData.get("preferred_contact")),
      inquiry_role: trimValue(formData.get("inquiry_role")),
      inquiry_type: trimValue(formData.get("inquiry_type")),
      message: trimValue(formData.get("message"))
    };

    const invalid =
      !fields.name ||
      !fields.email ||
      !fields.phone ||
      !fields.inquiry_role ||
      !fields.inquiry_type ||
      !fields.message ||
      !isValidEmail(fields.email) ||
      tooLong(fields);

    if (invalid) {
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
    }

    if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
      console.error("Missing EMAIL binding");
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
    }

    try {
      await env.EMAIL.send({
        to: RECIPIENT_EMAIL,
        from: PUBLIC_ALIAS_EMAIL,
        subject: "New Website Inquiry - ACaring Adult Home",
        text: buildEmailText(fields),
        replyTo: fields.email
      });
    } catch (error) {
      console.error("Contact email send failed", {
        name: error?.name,
        message: error?.message,
        code: error?.code
      });
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
    }

    return jsonResponse({
      ok: true,
      message: "Thank you. Your inquiry has been sent."
    });
  }
};
```

---

## 6. Static site form requirements

The form must post to:

```js
fetch("/api/contact", {
  method: "POST",
  body: new FormData(form)
});
```

Do not use `mailto:`.

Do not manually set `Content-Type` when sending `FormData`.

Required fields:

```text
name
email
phone
inquiry_role
inquiry_type
message
```

Optional:

```text
preferred_contact
```

Honeypot:

```html
<input type="text" name="website" tabindex="-1" autocomplete="off" class="hp-field" aria-hidden="true">
```

Privacy note near the message box:

```html
<p class="form-note">
  Please do not include Social Security numbers, Medicaid numbers, medical records,
  detailed diagnosis information, or other sensitive health information in this form.
  This form is for general inquiries only. We will follow up directly if more details are needed.
</p>
```

---

## 7. Absolute asset paths

Use root-relative paths for shared assets:

```html
<link rel="stylesheet" href="/styles.css">
<script src="/script.js" defer></script>
```

Avoid:

```html
<link rel="stylesheet" href="styles.css">
<script src="script.js" defer></script>
```

Why: when nested routes such as `/api/contact` render a fallback or debug page, relative paths can resolve as `/api/styles.css`, causing missing CSS.

---

## 8. Testing checklist

### 8.1 Worker route test

```text
https://acaringadulthome.com/api/contact
```

Expected for GET:

```text
405 Method Not Allowed
```

### 8.2 Direct POST test

```js
const fd = new FormData();
fd.set("name", "Live Form Test");
fd.set("email", "test@example.com");
fd.set("phone", "555-555-5555");
fd.set("preferred_contact", "email");
fd.set("inquiry_role", "Family member");
fd.set("inquiry_type", "General question");
fd.set("message", "This is a full POST test.");
fd.set("website", "");

fetch("/api/contact", {
  method: "POST",
  body: fd
})
  .then(async (r) => {
    console.log("Status:", r.status);
    console.log("Content-Type:", r.headers.get("content-type"));
    console.log("Body:", await r.text());
  })
  .catch(console.error);
```

Expected:

```text
Status: 200
Email arrives at acaringadulthome@gmail.com
```

### 8.3 Wrangler tail logs

```powershell
cd C:\Users\henya\OneDrive\Code\acaring-adult-home\contact-worker
npx wrangler tail acaring-contact-api
```

Use this only during debugging. Keep logs safe.

---

## 9. Troubleshooting matrix

| Symptom | Meaning | Fix |
|---|---|---|
| `/api/contact` returns Pages 404 | Worker route not active or wrong domain mapping | Add `acaringadulthome.com/api/contact*` route to Worker |
| `/api/contact` returns `Hello world` | Route is active, but Worker starter code is still deployed | Deploy real `contact-worker/src/index.js` |
| `wrangler deploy` warns about Pages project | Deploy is running from repo root and reading Pages config | Run from `contact-worker/` or use `--config contact-worker/wrangler.toml` |
| POST returns 400 | Required field missing or field names mismatch | Compare form names with Worker validation |
| POST returns 500 with recipient-not-allowed email error | Worker is sending to alias instead of verified destination | Use `acaringadulthome@gmail.com` as `destination_address` and `to` |
| Smoke test succeeds but form fails | Email works; frontend/form payload issue | Inspect Network tab and POST response |
| CSS loads as `/api/styles.css` | Relative asset path problem | Use `/styles.css` and `/script.js` |

---

## 10. Codex task prompt for future reuse

```md
# Task: Add Cloudflare Worker contact form pipeline

Implement a server-side contact form for a static website hosted on Cloudflare Pages.

## Architecture

- Pages project hosts the website.
- Separate Worker handles `/api/contact*`.
- Worker validates FormData and sends email through `env.EMAIL`.
- Do not use `mailto:`.
- Do not put `[[send_email]]` in the Pages `wrangler.toml`.

## Repo structure

Create or verify:

repo-root/
  index.html
  location-contact.html
  styles.css
  script.js
  wrangler.toml
  contact-worker/
    wrangler.toml
    src/
      index.js

## Pages config

Use root `wrangler.toml` only for Pages:

name = "SITE_PAGES_PROJECT_NAME"
pages_build_output_dir = "."
compatibility_date = "YYYY-MM-DD"

## Worker config

Use `contact-worker/wrangler.toml`:

name = "SITE_CONTACT_WORKER_NAME"
main = "src/index.js"
compatibility_date = "YYYY-MM-DD"

[[routes]]
pattern = "DOMAIN/api/contact*"
zone_name = "DOMAIN"

[[routes]]
pattern = "www.DOMAIN/api/contact*"
zone_name = "DOMAIN"

[[send_email]]
name = "EMAIL"
destination_address = "VERIFIED_DESTINATION_EMAIL"

## Worker requirements

- Use standalone Worker syntax: `export default { async fetch(request, env) { ... } }`.
- Accept only POST for `/api/contact*`.
- Return 405 for GET.
- Parse FormData.
- Validate: name, email, phone, inquiry_role, inquiry_type, message.
- Accept optional preferred_contact.
- Use honeypot field website.
- Send to VERIFIED_DESTINATION_EMAIL through env.EMAIL.
- Public fallback alias may remain PUBLIC_ALIAS_EMAIL.
- No smoke-test endpoint in production.
- No unsafe PII logging.

## Static site cleanup

- Use `/styles.css`, not `styles.css`.
- Use `/script.js`, not `script.js`.
- Keep the privacy note near the message field.

## Acceptance tests

- GET `/api/contact` returns 405, not 404 and not Hello world.
- Direct POST returns 200.
- Email arrives at the verified destination inbox.
- Actual form submit shows success.
```

---

## 11. Source references

- Cloudflare Workers Routes: https://developers.cloudflare.com/workers/configuration/routing/routes/
- Cloudflare Workers Wrangler configuration: https://developers.cloudflare.com/workers/wrangler/configuration/
- Send emails from Workers: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/
- Cloudflare Pages Functions get started: https://developers.cloudflare.com/pages/functions/get-started/
