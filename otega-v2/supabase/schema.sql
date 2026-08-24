-- =========================================================================
-- Otega Outreach — Supabase schema
-- Run this whole file in Supabase Dashboard → SQL Editor → New query.
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS everywhere).
-- =========================================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- 1) SITE SETTINGS  (single row, id = 'global') — includes Founder content
-- -------------------------------------------------------------------------
create table if not exists public.site_settings (
  id text primary key default 'global',
  org_name text not null default 'Otega Outreach',
  tagline text default '',
  logo_url text,
  hero_video_url text,
  hero_image_url text,
  hero_headline text default 'Reaching Nations With The Gospel',
  hero_subtext text default '',

  -- Founder page content
  founder_name text default '',
  founder_title text default 'Founder & President',
  founder_photo_url text,
  founder_signature_url text,
  founder_quote text default '',
  founder_bio text default '',
  founder_vision text default '',
  founder_mission text default '',
  founder_facebook_url text,
  founder_instagram_url text,
  founder_youtube_url text,

  -- Contact / org details
  contact_email text default '',
  contact_phone text default '',
  whatsapp_number text default '',
  address text default '',
  facebook_url text,
  instagram_url text,
  youtube_url text,
  twitter_url text,

  -- Giving details
  bank_name text default '',
  account_number text default '',
  account_name text default '',
  flutterwave_public_key text default '',

  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values ('global')
  on conflict (id) do nothing;

alter table public.site_settings enable row level security;
drop policy if exists "Public read settings" on public.site_settings;
create policy "Public read settings" on public.site_settings for select using (true);

-- -------------------------------------------------------------------------
-- 2) ADMIN USERS  (custom auth — service-role only, never exposed publicly)
-- -------------------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  display_name text,
  is_super boolean not null default false,
  can_upload boolean not null default true,
  can_publish boolean not null default true,
  can_edit boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
-- No public policies at all: this table is only ever touched by the
-- service-role key from the /api serverless functions.

-- -------------------------------------------------------------------------
-- 3) EVANGELISTS
-- -------------------------------------------------------------------------
create table if not exists public.evangelists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  title text default 'Evangelist',
  region text default '',
  state text default '',
  bio text default '',
  photo_url text,
  phone text,
  whatsapp text,
  email text,
  souls_won int default 0,
  testimony_count int default 0,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists evangelists_status_idx on public.evangelists (status);
create index if not exists evangelists_slug_idx on public.evangelists (slug);

alter table public.evangelists enable row level security;
drop policy if exists "Public read published evangelists" on public.evangelists;
create policy "Public read published evangelists"
  on public.evangelists for select using (status = 'published');

-- -------------------------------------------------------------------------
-- 4) BLOG POSTS
-- -------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text default '',
  content text default '',
  featured_image text,
  author text default '',
  category text default 'General',
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  views int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

alter table public.blog_posts enable row level security;
drop policy if exists "Public read published posts" on public.blog_posts;
create policy "Public read published posts"
  on public.blog_posts for select using (status = 'published');

-- -------------------------------------------------------------------------
-- 5) TESTIMONIES  (public can submit, only approved ones are publicly listed)
-- -------------------------------------------------------------------------
create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  evangelist_id uuid references public.evangelists (id) on delete set null,
  title text default '',
  content text not null,
  image_url text,
  approved boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonies_approved_idx on public.testimonies (approved);

alter table public.testimonies enable row level security;
drop policy if exists "Public read approved testimonies" on public.testimonies;
create policy "Public read approved testimonies"
  on public.testimonies for select using (approved = true);

drop policy if exists "Public submit testimony" on public.testimonies;
create policy "Public submit testimony"
  on public.testimonies for insert
  with check (approved = false and featured = false);

-- -------------------------------------------------------------------------
-- 6) PRAYER REQUESTS  (public can submit; never publicly listable)
-- -------------------------------------------------------------------------
create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  category text default 'General',
  request text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'answered', 'archived')),
  private boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.prayer_requests enable row level security;
drop policy if exists "Public submit prayer request" on public.prayer_requests;
create policy "Public submit prayer request"
  on public.prayer_requests for insert with check (status = 'new');
-- Intentionally no public SELECT policy — prayer requests are private.

-- -------------------------------------------------------------------------
-- 7) CONTACT MESSAGES
-- -------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;
drop policy if exists "Public submit message" on public.messages;
create policy "Public submit message"
  on public.messages for insert with check (status = 'new');

-- -------------------------------------------------------------------------
-- 8) PHOTOS
-- -------------------------------------------------------------------------
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  description text default '',
  image_url text not null,
  storage_path text,
  category text default 'gallery',
  status text not null default 'published' check (status in ('pending', 'published', 'rejected')),
  views int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.photos enable row level security;
drop policy if exists "Public read published photos" on public.photos;
create policy "Public read published photos"
  on public.photos for select using (status = 'published');

-- -------------------------------------------------------------------------
-- 9) VIDEOS
-- -------------------------------------------------------------------------
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  description text default '',
  video_url text,
  thumbnail_url text,
  source text not null default 'upload' check (source in ('upload', 'youtube')),
  youtube_id text,
  storage_path text,
  status text not null default 'published' check (status in ('pending', 'published', 'rejected')),
  views int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;
drop policy if exists "Public read published videos" on public.videos;
create policy "Public read published videos"
  on public.videos for select using (status = 'published');

-- -------------------------------------------------------------------------
-- 10) PARTNERS
-- -------------------------------------------------------------------------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  description text default '',
  status text not null default 'published' check (status in ('draft', 'published')),
  "order" int default 0,
  created_at timestamptz not null default now()
);

alter table public.partners enable row level security;
drop policy if exists "Public read published partners" on public.partners;
create policy "Public read published partners"
  on public.partners for select using (status = 'published');

-- -------------------------------------------------------------------------
-- 11) DONATIONS
-- -------------------------------------------------------------------------
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text default 'Anonymous',
  donor_email text,
  donor_phone text,
  amount numeric(12, 2) not null,
  currency text not null default 'NGN',
  purpose text default 'General',
  payment_method text default 'flutterwave',
  tx_ref text,
  status text not null default 'pending' check (status in ('pending', 'successful', 'failed')),
  created_at timestamptz not null default now()
);

create index if not exists donations_status_idx on public.donations (status);

alter table public.donations enable row level security;
drop policy if exists "Public create donation" on public.donations;
create policy "Public create donation"
  on public.donations for insert with check (status = 'pending');
-- No public SELECT — donation records are admin-only.

-- -------------------------------------------------------------------------
-- 12) NOTIFICATIONS  (admin-only, generated by triggers below)
-- -------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'info',
  title text not null,
  message text default '',
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;
-- No public policies — admin API (service role) only.

-- -------------------------------------------------------------------------
-- 13) Auto-notify triggers: new prayer request / testimony / message / donation
-- -------------------------------------------------------------------------
create or replace function public.notify_new_row()
returns trigger as $$
begin
  if TG_TABLE_NAME = 'prayer_requests' then
    insert into public.notifications (type, title, message, link)
    values ('prayer_request', 'New prayer request', new.name || ' submitted a prayer request', '/admin/prayer-requests');
  elsif TG_TABLE_NAME = 'testimonies' then
    insert into public.notifications (type, title, message, link)
    values ('testimony', 'New testimony submitted', new.name || ' shared a testimony awaiting review', '/admin/testimonies');
  elsif TG_TABLE_NAME = 'messages' then
    insert into public.notifications (type, title, message, link)
    values ('message', 'New contact message', new.name || ': ' || left(new.message, 80), '/admin/notifications');
  elsif TG_TABLE_NAME = 'donations' then
    insert into public.notifications (type, title, message, link)
    values ('donation', 'New donation', new.donor_name || ' — ' || new.currency || ' ' || new.amount, '/admin/donations');
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_notify_prayer_request on public.prayer_requests;
create trigger trg_notify_prayer_request
  after insert on public.prayer_requests
  for each row execute function public.notify_new_row();

drop trigger if exists trg_notify_testimony on public.testimonies;
create trigger trg_notify_testimony
  after insert on public.testimonies
  for each row execute function public.notify_new_row();

drop trigger if exists trg_notify_message on public.messages;
create trigger trg_notify_message
  after insert on public.messages
  for each row execute function public.notify_new_row();

drop trigger if exists trg_notify_donation on public.donations;
create trigger trg_notify_donation
  after insert on public.donations
  for each row execute function public.notify_new_row();

-- -------------------------------------------------------------------------
-- 14) Storage buckets
--     Create these two buckets in Dashboard → Storage (Public: YES), OR
--     run this block which does it for you.
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media files" on storage.objects;
create policy "Public read media files"
  on storage.objects for select using (bucket_id = 'media');

-- Uploads/updates/deletes to storage are performed server-side by the
-- /api/admin/upload endpoint using the service-role key, which bypasses
-- RLS entirely — no authenticated-role storage policy is required for the
-- app to function. The policies below are kept for defense-in-depth in
-- case a future admin flow uses real Supabase Auth sessions.
drop policy if exists "Admin upload media" on storage.objects;
create policy "Admin upload media"
  on storage.objects for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "Admin update media" on storage.objects;
create policy "Admin update media"
  on storage.objects for update to authenticated using (bucket_id = 'media');

drop policy if exists "Admin delete media" on storage.objects;
create policy "Admin delete media"
  on storage.objects for delete to authenticated using (bucket_id = 'media');

-- -------------------------------------------------------------------------
-- 15) Seed a super-admin fallback reminder
-- -------------------------------------------------------------------------
-- The primary super-admin login is controlled by the ADMIN_PASSWORD env var
-- (see .env.example) — no DB row is required for that account. Use the
-- Admin → Settings → "Admin Users" panel to create additional named
-- sub-admins once you're logged in; they get written to admin_users with a
-- salted PBKDF2 hash by /api/admin/users.js.

-- Done. Next: set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY,
-- SUPABASE_SERVICE_ROLE_KEY and ADMIN_PASSWORD in your environment.
