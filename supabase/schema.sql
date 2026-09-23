create table if not exists public.products (
  id text primary key,
  name text not null,
  brand text,
  category text,
  price numeric not null default 0,
  old_price numeric,
  stock integer not null default 0,
  ram text,
  storage text,
  badge text,
  rating numeric default 5,
  reviews integer default 0,
  description text,
  images jsonb not null default '[]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  image_credit text,
  image_source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists image_credit text;
alter table public.products add column if not exists image_source text;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  reference text not null unique,
  email text not null,
  name text,
  phone text,
  address text,
  items jsonb not null default '[]'::jsonb,
  amount numeric not null default 0,
  payment_currency text not null default 'NGN',
  payment_amount_kobo integer,
  payment_status text not null default 'success',
  status text not null default 'paid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists total_amount numeric;
alter table public.orders add column if not exists shipping_address text;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null default 1,
  price numeric not null default 0,
  created_at timestamptz not null default now()
);

alter table public.orders alter column user_id drop not null;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select using (true);

drop policy if exists "Owner can manage products" on public.products;
create policy "Owner can manage products" on public.products for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'seunjoel05@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'seunjoel05@gmail.com');

drop policy if exists "Buyers can create own orders" on public.orders;
create policy "Buyers can create own orders" on public.orders for insert to anon, authenticated
  with check (user_id is null or auth.uid() = user_id);

drop policy if exists "Buyers can read own orders" on public.orders;
create policy "Buyers can read own orders" on public.orders for select to authenticated
  using (auth.uid() = user_id or lower(auth.jwt() ->> 'email') = 'seunjoel05@gmail.com');

drop policy if exists "Owner can manage orders" on public.orders;
create policy "Owner can manage orders" on public.orders for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'seunjoel05@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'seunjoel05@gmail.com');

drop policy if exists "Buyers can create own order items" on public.order_items;
create policy "Buyers can create own order items" on public.order_items for insert to authenticated
  with check (exists (select 1 from public.orders where orders.id = order_id and orders.user_id = auth.uid()));

drop policy if exists "Buyers can read own order items" on public.order_items;
create policy "Buyers can read own order items" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders where orders.id = order_id and orders.user_id = auth.uid()));

create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

alter table public.products replica identity full;
alter table public.orders replica identity full;
alter publication supabase_realtime add table public.products;
alter publication supabase_realtime add table public.orders;
