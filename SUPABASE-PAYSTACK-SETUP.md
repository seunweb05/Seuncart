# SEUNCART — Supabase + Paystack setup

## Supabase project
Project URL:
`https://wdgbfuxhxrtbfymkgsqj.supabase.co`

Paystack Edge Function URL:
`https://wdgbfuxhxrtbfymkgsqj.supabase.co/functions/v1/dynamic-service`

## Frontend variables
The production build uses `.env.production` for public values only:
- `VITE_PAYSTACK_PUBLIC_KEY`
- `VITE_SUPABASE_PAYSTACK_FUNCTION_URL`
- `VITE_USD_TO_NGN`

## Store database and authentication
The storefront now uses Supabase Auth for buyer accounts and Supabase Database for products and orders. In Supabase Dashboard -> SQL Editor, run the complete file `supabase/schema.sql` once. It creates the tables, indexes and Row Level Security policies. The owner email permitted to manage products and orders is `seunjoel05@gmail.com`.

Firebase Firestore is no longer used by the browser application, so a Firebase billing upgrade is not required for the store data path.

Do NOT put `PAYSTACK_SECRET_KEY` or a Supabase secret/service-role key in any `VITE_*` variable.

## Supabase Edge Function secrets
In Supabase Dashboard → Edge Functions → Secrets, add:
- `PAYSTACK_SECRET_KEY` = your Paystack SECRET key
- `USD_TO_NGN` = `1500` (or your chosen USD→NGN rate)

The secret key must remain server-side.

## Deploy the function
From the project root, after installing the Supabase CLI and authenticating:

```bash
supabase login
supabase link --project-ref wdgbfuxhxrtbfymkgsqj
supabase functions deploy paystack
```

If you prefer Dashboard deployment, deploy the contents of:
`supabase/functions/dynamic-service/index.ts`

## Test flow
1. Use a Paystack test public/secret key pair.
2. Open checkout from SEUNCART.
3. The browser calls the Supabase Edge Function.
4. The Edge Function calls Paystack using the secret key.
5. Paystack returns an authorization URL.
6. After checkout, SEUNCART verifies the reference through the Edge Function.
7. Only a successful verified transaction should be treated as paid.

## Important
The current storefront displays USD. Paystack's Nigerian charge path in this project converts the USD display amount to NGN using `USD_TO_NGN`, then sends the NGN amount to Paystack. Change the conversion rate before real transactions because exchange rates change.
