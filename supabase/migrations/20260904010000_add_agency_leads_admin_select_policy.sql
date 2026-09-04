-- Consolidated record of everything done to unblock `public.agency_leads` in this incident:
-- the original table creation + anon INSERT policy (both run manually in the Supabase SQL
-- Editor per the previous migration in this repo), plus the new admin SELECT policy below.
--
-- BACKGROUND: `agency_leads` was created directly in the Supabase dashboard, not through a
-- tracked migration. Enabling RLS on it (without an accompanying SELECT policy) blocked the
-- Admin/"Godmode" portal from reading rows, even though the public landing page's INSERT
-- continued to work once the anon INSERT policy was restored.
--
-- AUDIT NOTE ON SCOPING - IMPORTANT, READ BEFORE RUNNING:
-- This repo (`centravity-marketing`) is the public marketing site only. It contains no admin
-- routes, no login/auth pages, and no admin-portal source code, so the exact mechanism the
-- Admin/Godmode portal uses to authenticate to Supabase could NOT be verified from this
-- codebase. Two things are known for certain and drove how this policy is scoped:
--
--   1. It must NOT be granted to `anon`. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is a public key shipped
--      in this site's client-side JS bundle - granting `anon` SELECT would let anyone on the
--      internet read every lead's name/email/agency straight out of the browser console.
--
--   2. It must NOT reuse the `profiles.role = 'owner'` pattern seen elsewhere in this codebase
--      (e.g. components/DashboardTab.tsx, MyPerformanceTab.tsx). In that schema, "owner" means a
--      *customer's* agency owner, scoped to their own agency - not a Centravity staff member.
--      Keying this policy off that role would hand every paying customer's owner account read
--      access to the entire cross-tenant prospect list.
--
-- Given the founder confirmed RLS itself is the blocker (not a service_role-based backend, which
-- would bypass RLS entirely regardless of policies), the Admin portal is presumably logging an
-- internal team member in via Supabase Auth, so Postgres sees them as `authenticated`. The policy
-- below gates on an email allowlist pulled from the JWT, which is the simplest correct mechanism
-- that doesn't depend on a `profiles`/`admins` schema this repo can't see.
--
-- >>> BEFORE RUNNING: replace the placeholder email(s) below with the real admin/founder
-- >>> account email(s) that log into the Admin portal. If the portal instead uses a dedicated
-- >>> `admins` table or a `profiles.is_platform_admin` flag, tell me and I'll rewrite this to
-- >>> check that instead - it will be more maintainable than an inline email list.
--
-- Run this migration against the linked project (`supabase db push`) or paste it into the
-- Supabase SQL Editor once. It's idempotent - re-running it is a no-op if the table/policies
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
-- explicit INSERT policy. This intentionally does NOT grant SELECT/UPDATE/DELETE to `anon`.
drop policy if exists "Allow public lead inserts" on public.agency_leads;
create policy "Allow public lead inserts"
  on public.agency_leads
  for insert
  to anon
  with check (true);

-- Admin/Godmode portal read access - scoped to `authenticated` + an explicit email allowlist.
-- >>> EDIT THIS LIST before running. <<<
drop policy if exists "Allow admin reads" on public.agency_leads;
create policy "Allow admin reads"
  on public.agency_leads
  for select
  to authenticated
  using (
    (auth.jwt() ->> 'email') in (
      'founder@centravityhq.com'
      -- add additional internal admin emails here, one per line
    )
  );
