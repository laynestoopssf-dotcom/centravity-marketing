-- Catches up version control on `public.agency_leads`, the table the marketing landing page
-- (`app/page.tsx` -> `handleLeadSubmit`) writes Beta/Waitlist signups into.
--
-- This table was originally created directly in the Supabase dashboard, not through a tracked
-- migration, so it never had a `.sql` file in this repo. That drift is exactly how its INSERT
-- policy for the `anon` role went missing/was tightened without anyone noticing in git history -
-- the public signup form started getting rejected with a silent 401
-- ("new row violates row-level security policy for table agency_leads") and no lead ever landed
-- in the table.
--
-- The column list below is a best-effort reconstruction based on the exact payload the frontend
-- inserts (see `handleLeadSubmit`). Verify column types against the live table in the Supabase
-- dashboard before relying on this to rebuild a fresh environment - the `create table if not
-- exists` below is a no-op against the existing production table either way.
--
-- Run this migration against the linked project (`supabase db push`) or paste it into the
-- Supabase SQL Editor once. It's idempotent - re-running it is a no-op if the table/policy
-- already exist/match.

create table if not exists public.agency_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  agency_name text,
  lead_type text not null default 'beta'
);

alter table public.agency_leads enable row level security;

-- The public landing page submits with the anon key and no auth session, so `anon` needs an
-- explicit INSERT policy. This intentionally does NOT grant SELECT/UPDATE/DELETE to `anon` -
-- leads should only be reviewable via the Supabase dashboard (service role) or an authenticated
-- internal tool, never readable back out through the public anon key.
drop policy if exists "Allow public lead inserts" on public.agency_leads;
create policy "Allow public lead inserts"
  on public.agency_leads
  for insert
  to anon
  with check (true);
