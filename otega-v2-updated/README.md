# Otega Outreach — v2

Full rebuild of the outreach site: **Next.js + Firebase → Vite + React + TypeScript + Supabase**,
structured the same way as `glowingpalace` (Vite SPA + `/api` Vercel serverless functions + Supabase
Postgres, no Firebase anywhere).

## What's new vs. the old repo
- Firebase (Firestore + Storage) is completely removed — everything runs on Supabase.
- A dedicated **Founder page** (`/founder`) with photo, quote, bio, vision/mission, and socials —
  all editable from **Admin → Settings → Founder**, no redeploy needed.
- One consistent black / lime / yellow visual system across every page (matches your other builds).
- A generic `ResourceManager` admin component drives every CRUD screen (Evangelists, Blog, Testimonies,
  Prayer Requests, Messages, Media, Partners, Donations, Notifications) from a field-config list, so
  every module is fully wired without hand-building nine separate admin screens.
- Auto-notifications: a Postgres trigger fires into the `notifications` table whenever a visitor submits
  a testimony, prayer request, contact message, or donation — powers the Admin dashboard's badges.
- A live dashboard (`/admin`) with real counts pulled from Supabase (published content, pending
  testimonies, new prayer requests, unread notifications, total given).

## Project structure
```
api/                    Vercel serverless functions (admin only — service-role key, never exposed)
  _lib/                 supabaseAdmin.js, auth.js (PBKDF2 sub-admin auth), resources.js (whitelist)
  admin/
    login.js            POST — issues an x-admin-token
    users.js            Super-admin only: manage named sub-admins
    settings.js         GET/PATCH the singleton site_settings row (incl. Founder content)
    dashboard.js         GET aggregated stats
    upload.js           POST — small file upload (base64 body, ~4MB cap)
    upload-signed-url.js POST — signed URL for large files (videos)
    [resource]/index.js  GET (list) / POST (create) — generic, driven by resources.js whitelist
    [resource]/[id].js   PATCH (update) / DELETE — generic
src/
  lib/
    supabase.ts          Public anon-key client
    publicData.ts        All public reads + narrow RLS-guarded inserts (testimony/prayer/message/donation)
    adminApi.ts           All admin reads/writes, going through /api/admin/*
    types.ts               Shared TypeScript interfaces
  components/             Navbar, Footer, cards, forms, admin/ResourceManager, admin/AdminSidebar
  pages/                  One file per public route + pages/admin/ for every admin screen
supabase/
  schema.sql              Everything: tables, RLS policies, storage bucket, notification triggers
```

## Setup

1. **Create a Supabase project.** In the SQL Editor, paste and run the whole of `supabase/schema.sql`.
   It's idempotent — safe to re-run.

2. **Copy `.env.example` to `.env`** and fill in:
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — Project Settings → API
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, **never** put this in a `VITE_` var or commit it
   - `ADMIN_PASSWORD` — your super-admin login password (username is left blank/`superadmin`)

3. **Install & run:**
   ```bash
   npm install
   npm run dev        # front end only, on :5173
   # in a second terminal, to also run the /api functions locally:
   npx vercel dev      # serves both the SPA and /api on :3000
   ```
   `vite.config.ts` proxies `/api` to `localhost:3001` if you run `vite` and a bare API server
   separately — simplest is just `vercel dev` for full local parity with production.

4. **Deploy to Vercel:** push this repo, import it in Vercel, add the same env vars in
   Project Settings → Environment Variables, deploy. `vercel.json` handles SPA routing so
   `/admin/*` and every other client route resolve to `index.html` while `/api/*` still hits
   the serverless functions.

5. **First login:** go to `/admin/login`, leave username blank, enter your `ADMIN_PASSWORD`.
   From **Settings → Admin Users** you can then create named sub-admins with scoped permissions
   (upload / publish / edit) without ever sharing the super-admin password.

6. **Fill in Settings** (`/admin/settings`) — organization name, hero content, the full Founder
   section, contact details, and bank/giving details. Every public page reads from this one row,
   so the site is fully content-driven from day one.

## Notes on file uploads
- Images go through `/api/admin/upload` as a base64 JSON body — fine for typical photo sizes but
  capped by Vercel's ~4.5MB serverless request limit.
- For larger files (sermon/outreach videos), `uploadLargeFile()` in `src/lib/adminApi.ts` requests a
  Supabase **signed upload URL** and `PUT`s the file directly to Storage, bypassing that limit.
- Everything lands in the single public `media` storage bucket, organized by folder
  (`evangelists/`, `blog/`, `photos/`, `videos/`, `partners/`, `settings/`, `testimonies/`).

## What still needs your judgment call
- **Donations**: the giving flow is currently "show bank details + record intent" (matches your bank-
  transfer-first pattern from GPCM). If you want a live gateway charge (Flutterwave popup) instead of
  transfer + manual confirmation, that's a contained addition to `DonationForm.tsx` — the `donations`
  table, admin screen, and settings field for the public key are already there waiting for it.
- **Rich text**: blog/testimony content is stored and rendered as plain text (line breaks → paragraphs)
  to keep things simple and fast on mobile. Swap in a rich-text editor later without touching the schema.
