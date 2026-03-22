# Sleek Portfolio

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Package Manager

This repository uses `pnpm` as the source of truth.

- Use `pnpm install` to install dependencies.
- Use `pnpm dev` for local development.
- Use `pnpm build` for production builds.
- Use `pnpm lint` for lint checks.

## Environment Variables

Create `.env.local` with the following variables:

```bash
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Notes:
- `SUPABASE_URL` is the preferred server-side URL used by API routes.
- `SUPABASE_SERVICE_ROLE_KEY` is required by server-side visitor tracking in API routes.
- Keep the service role key server-only and never expose it in client code.
- For backward compatibility, `NEXT_PUBLIC_SUPABASE_URL` is still supported as a fallback.

## Supabase Migration Status

The visitors counter has been migrated to Supabase.

- Runtime logic: [src/lib/visitors.ts](src/lib/visitors.ts)
- API route: [src/app/api/visitors/route.ts](src/app/api/visitors/route.ts)
- SQL schema migration: [supabase/migrations/202603210001_create_visitors_table.sql](supabase/migrations/202603210001_create_visitors_table.sql)

## Applying Database Migration

Use the Supabase CLI to apply migrations to your project:

```bash
supabase db push
```

If you use remote linking:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```
