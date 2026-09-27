create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  size text not null, description text not null default '', amazon_url text not null default '',
  image_url text not null default '', details text not null default '', created_at timestamptz default now()
);
create table if not exists public.promotional_banners (
  id uuid primary key default gen_random_uuid(), slug text unique not null, eyebrow text not null default '',
  headline text not null default '', body text not null default '', cta_label text not null default '',
  cta_url text not null default '', is_active boolean not null default false, created_at timestamptz default now()
);
create table if not exists public.site_content (
  key text primary key, value jsonb not null default '{}'::jsonb, updated_at timestamptz default now()
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(), name text not null, quote text not null,
  meta text not null default '', is_published boolean not null default true, created_at timestamptz default now()
);
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;
