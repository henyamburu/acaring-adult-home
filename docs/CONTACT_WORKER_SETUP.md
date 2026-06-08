## Task: Realign `contact-worker` as a clean Cloudflare Worker API project

We need to clean and standardize the `contact-worker` folder so it deploys reliably as the Cloudflare Worker project `acaring-contact-api`.

### Current structure

```text
contact-worker/
├─ .wrangler/
│  └─ tmp/
├─ src/
│  └─ index.js
└─ wrangler.toml
```

### Required final structure

```text
contact-worker/
├─ src/
│  └─ index.js
├─ package.json
├─ wrangler.toml
├─ .gitignore
└─ docs/
   └─ contact-worker-setup.md
```

### Required changes

1. Remove `contact-worker/.wrangler/` from version control.

   * This is Wrangler local/cache output and should not be committed.
   * Do not remove any actual Worker source code.

2. Add `contact-worker/.gitignore` with:

```text
.wrangler/
node_modules/
.env
.dev.vars
```

3. Add `contact-worker/package.json`:

```json
{
  "name": "acaring-contact-api",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "wrangler": "^4.98.0"
  }
}
```

4. Update `contact-worker/wrangler.toml` so it clearly defines a Worker entry point:

```toml
name = "acaring-contact-api"
main = "src/index.js"
compatibility_date = "2026-06-08"
workers_dev = true
```

5. Inspect `contact-worker/src/index.js`.

   * Preserve the existing contact form logic if it already works.
   * Do not replace working email/submission logic with a placeholder.
   * Confirm it exports a valid Cloudflare Worker handler:

```js
export default {
  async fetch(request, env, ctx) {
    // existing contact form logic should remain here
  }
};
```

6. Add `contact-worker/docs/contact-worker-setup.md` with these notes:

````md
# A Caring Contact API Worker Setup

This folder contains the Cloudflare Worker API for the A Caring Adult Home contact form.

## Cloudflare project

Project name:

```text
acaring-contact-api
````

Project type:

```text
Worker
```

Do not configure this as a Cloudflare Pages project.

## Cloudflare build settings

```text
Root directory: contact-worker
Build command: npm install
Deploy command: npm run deploy
```

## Required files

```text
contact-worker/
├─ src/index.js
├─ package.json
├─ wrangler.toml
├─ .gitignore
└─ docs/contact-worker-setup.md
```

## Do not commit

```text
.wrangler/
node_modules/
.env
.dev.vars
```

Secrets such as email API keys should be stored in Cloudflare Worker environment variables or secrets, not committed to Git.

```

7. Do not modify the public website files unless required for the Worker endpoint integration.

8. Commit these changes to a new branch and open a PR. Do not merge automatically.
```
