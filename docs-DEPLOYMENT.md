# SEUNCART Deployment Checklist

## Firebase Hosting only
This is enough to deploy the React frontend. Firebase Hosting can serve the storefront, but it does **not** provide the private Paystack secret by itself.

```bash
npm install
npm run build
firebase deploy --only hosting
```

## Supabase secure Paystack backend
1. Create/sign into Supabase.
2. Create a Free project.
3. Deploy `supabase/functions/dynamic-service`.
4. Add the secret `PAYSTACK_SECRET_KEY` to the function environment.
5. Add `USD_TO_NGN` to the function environment and keep it synchronized with the storefront configuration.
6. Put the deployed function URL in `VITE_SUPABASE_PAYSTACK_FUNCTION_URL` before building.
7. Keep `sk_test_...` / `sk_live_...` out of Git, React, `.env` files committed to GitHub, and browser storage.

## Firebase admin claim
Run `functions/setAdminClaim.js` from a trusted Node/Firebase Admin environment. Do not expose Admin SDK credentials in the frontend.

## Before real sales
- Replace Paystack test public key with the client's live public key.
- Configure the Supabase secret with the live Paystack secret.
- Replace the illustrative FX rate with a controlled rate.
- Confirm all product prices, stock, delivery charges, warranty and return terms.
- Use product photography that you own or are licensed to use commercially.
- Add the real registered business details if applicable.
- Test successful, failed, cancelled and duplicate payment flows.
- Verify order creation only after server-side payment verification.
