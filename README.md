# Lead Waterfall

AI-powered B2B lead generation SaaS marketing website. Built with Next.js 16 App Router, Tailwind CSS, Framer Motion, and Supabase.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Fill in your Supabase credentials

# 3. Dev server
npm run dev
```

## Supabase Setup

Run in your Supabase SQL editor:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  email text not null,
  company_name text,
  lead_goal text
);

alter table leads enable row level security;

create policy "Allow public inserts" on leads
  for insert with check (true);
```

## Deploy to Vercel

1. Push to GitHub
2. Import on [vercel.com/new](https://vercel.com/new)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
app/
  layout.tsx           Root layout + metadata
  page.tsx             Main page
  globals.css          Tailwind base styles
components/
  Navbar.tsx           Sticky glassmorphic navigation
  Hero.tsx             Hero + animated data waterfall canvas
  Features.tsx         Bento grid feature cards
  PipelineSimulator.tsx  Interactive slider + particle stream
  LeadCaptureForm.tsx  Supabase lead capture form
  Pricing.tsx          3-tier pricing (monthly/annual toggle)
  Footer.tsx           Footer with links and socials
lib/
  supabaseClient.js    Supabase client singleton
```
