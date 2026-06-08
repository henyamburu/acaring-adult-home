# A Caring Contact API Worker Setup

This folder contains the Cloudflare Worker API for the A Caring Adult Home contact form.

## Cloudflare project

Project name:

```text
acaring-contact-api
```

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
