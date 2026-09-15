# powerful. the power metal podcast — Strapi CMS

The headless CMS behind a power-metal podcast site: blog posts are written in a TipTap rich-text editor and published to the Next.js frontend, with lifecycle hooks that trigger on-demand revalidation of the live site.

## What this is

The content backend of a two-repo podcast project. Authors manage the show's blog posts here — title, cover image, and rich-text body in the Strapi admin panel — and the companion frontend, [powerful-podcast-nextjs](https://github.com/abonnell/powerful-podcast-nextjs), consumes the content over Strapi's REST API. When a post is published, updated, unpublished, or deleted, a lifecycle hook calls the Next.js revalidation endpoint so the change appears on the site immediately without a rebuild.

It started as a personal/learning project to pair a headless CMS with a Next.js App Router site, and it is the CMS the live podcast site actually uses.

## Tech stack

- **Strapi v5.42.1** headless CMS (`@strapi/strapi`)
- **TipTap rich-text editor** via `@notum-cz/strapi-plugin-tiptap-editor` 1.2.3
- **Better SQLite 3** 11.3.0 default database; `config/database.ts` also ships MySQL and PostgreSQL connection configs
- Built-in plugins: `users-permissions`, `cloud` (same version as Strapi)
- **TypeScript** configuration and generated types; React 18 admin panel
- **Yarn** (`yarn.lock`); `.nvmrc` pins Node v22.22.2 (package `engines`: Node >=18 <=22)

## Features

- **Blog content type** — `Title` (required string), `Cover` (image media), and a `Body` custom field backed by the TipTap editor's "full" preset; draft-and-publish and i18n enabled (`src/api/blog/content-types/blog/schema.json`)
- **Themed TipTap editor** — color palette and content styling matched to the frontend's design tokens (primary green `#6bbd45` and friends), with three presets: `minimal`, `standard`, and `full` (`config/plugins.ts`)
- **Author-aware API** — `createdBy`/`updatedBy` are private by default in Strapi v5; a custom controller and a route middleware explicitly repopulate them and re-attach them to responses so the frontend can show bylines (`src/api/blog/controllers/blog.ts`, `src/api/blog/middlewares/author-middleware.ts`)
- **Automatic Next.js revalidation** — `afterCreate`/`afterUpdate`/`afterDelete` lifecycles POST to the Next.js `/api/revalidate` endpoint when `NEXTJS_URL` and `NEXTJS_REVALIDATION_SECRET` are configured, and skip (or fail) gracefully without blocking the publish operation when they are not (`src/api/blog/content-types/blog/lifecycles.ts`)
- **Generated TypeScript types** — schema-driven types under `types/generated/`
- **Committed `.env.example`** with placeholders for every secret and the revalidation variables

## Architecture

- Server code under `src/api/blog` organized into content-type (schema + lifecycles), controllers, routes (with middleware), and services; global config under `config/` (`server.ts`, `database.ts`, `admin.ts`, `api.ts`, `middlewares.ts`, `plugins.ts`).
- **TipTap integration** — how the editor is configured and how the Next.js app renders its JSON output is documented in **[TIPTAP_FRONTEND_INTEGRATION.md](TIPTAP_FRONTEND_INTEGRATION.md)**.
- **Next.js revalidation** — how the lifecycle hooks talk to the frontend, the required `NEXTJS_URL` / `NEXTJS_REVALIDATION_SECRET` environment variables, and the paths that get revalidated are documented in **[NEXTJS_REVALIDATION.md](NEXTJS_REVALIDATION.md)**.
- **Database** — SQLite by default via `DATABASE_CLIENT`/`DATABASE_FILENAME` (`config/database.ts` writes to `.tmp/data.db`); `database/migrations/` exists only as an empty scaffold — there are no migration files in the repo yet.

## Getting started

Prerequisites: Node.js 18–22 (see `.nvmrc`; `nvm use` picks the pinned version) and Yarn.

```bash
# 1. Install dependencies
yarn install

# 2. Create and fill your environment file
cp .env.example .env
# Replace the placeholder secrets:
#   APP_KEYS        -> comma-separated keys, e.g. generated via `openssl rand -base64 32`
#   API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT, JWT_SECRET
#                     -> one random value each, e.g. `openssl rand -base64 32`
#   NEXTJS_URL      -> your Next.js app URL (http://localhost:3000 in dev)
#   NEXTJS_REVALIDATION_SECRET -> must match REVALIDATION_SECRET in the Next.js app
#                     -> e.g. `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

# 3. Start the dev server (admin UI + API)
yarn develop
# -> http://localhost:1337/admin

# 4. Production build and start
yarn build
yarn start
```

Revalidation only runs once `NEXTJS_URL` and `NEXTJS_REVALIDATION_SECRET` are set to values matching the Next.js app; see [NEXTJS_REVALIDATION.md](NEXTJS_REVALIDATION.md).

## Roadmap / known limitations

- The only authorable content type so far is `blog`.
- `database/migrations/` has no migrations yet — schema changes currently flow through Strapi's own content-type lifecycle.
- Revalidation is fire-and-forget: a failed POST is logged, not retried, so the publish operation is never blocked.

## AI-assisted development disclosure

Parts of this project were produced with AI assistance and then reviewed, corrected, and integrated by hand. Hand-hardened areas include: the lifecycle-hook revalidation wiring with its fail-open error handling, the `createdBy`/`updatedBy` repopulation logic in the controller and middleware, the TipTap presets and theme matching the frontend, TypeScript config and generated-type hygiene, and the placeholder-only `.env.example` that documents every required secret.