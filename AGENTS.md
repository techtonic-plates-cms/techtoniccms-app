# AGENTS.md

## About TechtonicCMS

TechtonicCMS is a headless CMS built around a **dynamic GraphQL schema** — content types and their fields are defined at runtime, and the GraphQL API schema reflects those definitions automatically. Access to content and operations is governed by **ABAC (Attribute-Based Access Control)** permissions, meaning what a user can read, create, update, or delete depends on attributes of the user, the resource, and the context.

This frontend app (`techtoniccms-app`) is the management UI for TechtonicCMS. It talks exclusively to the TechtonicCMS GraphQL API and has no direct database access.

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: deno (NOT node/npm — use `deno task` for project scripts)
- **Framework**: SvelteKit 2 + Svelte 5 (runes mode)
- **Add-ons**: prettier, tailwindcss, sveltekit-adapter, mdsvex, paraglide, storybook, mcp

---

## Commands

All scripts run via `deno task` (maps to `package.json` scripts):

```bash
deno task dev               # Start dev server
deno task build             # Production build
deno task check             # Type-check with svelte-check
deno task lint              # Prettier format check
deno task format            # Auto-format with Prettier
deno task storybook         # Storybook dev server (port 6006)
deno task codegen:gql       # Regenerate GraphQL types from API schema
deno task add:component     # Add a shadcn-svelte component (e.g. deno task add:component button)
```

## Architecture

### GraphQL API Client

The GraphQL API is accessed through two layers:

1. **`techtonic-client-gql/mod.ts`** — local workspace package that contains GraphQL Code Generator output: typed documents, fragment masking, and all generated TypeScript types. Regenerate with `deno task codegen:gql` whenever the API schema changes (requires `DEV_API_URL` env var pointing to the GraphQL endpoint).

2. **`src/lib/server/gql.ts`** — server-only client wrapper. Exposes `gqlFetch<TResult, TVariables>(document, variables?, options?)` which creates a `graphql-request` client authenticated via Bearer token. Always pass explicit generics — never rely on inference from TypedDocumentNode.

```ts
// Correct pattern
const result = await gqlFetch<MyQuery, MyQueryVariables>(
	MY_QUERY,
	{ id },
	{ token: locals.accessToken }
);
```

The schema of the api is usualy located in `$API_URL/graphql`.

### Remote Functions (NOT load functions)

This project uses SvelteKit's experimental remote functions (`kit.experimental.remoteFunctions: true` in `svelte.config.js`). **Do not use `load` functions or `+page.server.ts` files.** Instead:

- `query(async () => { ... })` — for server-side data fetching (SSR + client calls)
- `form(schema, async (data) => { ... })` — for form submissions with Valibot validation

Remote functions live in `*.remote.ts` files and are imported directly into `.svelte` components.

```ts
// src/lib/something.remote.ts
import { query, form, getRequestEvent } from '$app/server';
export const getData = query(async () => { ... });

// +page.svelte
import { getData } from '$lib/something.remote';
const data = await getData();
```

### Auth

Auth state is populated in `src/hooks.server.ts` via two cookies:

- `ACCESS_TOKEN` (14 min) — validated against `ME_QUERY` on every request
- `REFRESH_TOKEN` (7 days) — used to silently obtain a new access token when the access token expires

After the hook runs, `event.locals.user` and `event.locals.accessToken` are available server-side.

**Protect a page/layout** by calling `requireAuth()` from `src/lib/auth.remote.ts`:

```ts
const user = await requireAuth(); // redirects to /login if unauthenticated
```

**Public pages** that need to check auth use `getMe()` instead (returns `null` if not logged in).

Form fields prefixed with `_` (e.g. `_password`) are stripped before being sent back to the client.

### Styling

- Tailwind CSS 4 + shadcn-svelte. Use `cn()` (re-exported from `src/lib/utils.ts`) for conditional class composition.
- Add shadcn components: `deno task add:component <name>` — components land in `src/lib/components/ui/`.
- Use `tailwind-variants` for component variant logic (see `button.svelte` as a reference).

#### Components

The documentation for Shadcn components is located at the following url: `https://www.shadcn-svelte.com/llms.txt`

Fetch the documentation to see all available components.

### i18n

Paraglide JS handles i18n. Translation messages live in `/messages/`. The `handleParaglide` hook in `src/hooks.server.ts` injects `lang` and `dir` into the HTML template.

---

## Svelte MCP Tools

You have access to a Svelte MCP server with Svelte 5 and SvelteKit documentation. Use it for all Svelte/SvelteKit work:

### 1. `list-sections`

Use FIRST to discover available documentation sections. Always call this when working on a Svelte/SvelteKit task to find relevant sections.

### 2. `get-documentation`

After `list-sections`, fetch ALL sections relevant to the task (use the `use_cases` field to judge relevance).

### 3. `svelte-autofixer`

Run on any Svelte code you write **before** sending it to the user. Keep calling until no issues are returned.

### 4. `playground-link`

Generates a Svelte Playground link. Only call after explicit user confirmation and **never** when code has been written to project files.

## Desing

Design guidelines are located in @DESIGN.md . Keep it in mind when making design alterations or additions.
