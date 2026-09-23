
# SEUNCART Portfolio Ready E-Commerce Platform

SEUNCART is an independent full-stack e-commerce portfolio project built to demonstrate production-minded React development, cloud data services, media optimization, payment integration and admin operations.

## Stack
- React 19 + Vite
- Firebase Authentication, Firestore, Storage and Hosting
- Cloudinary for product media delivery and uploads
- Paystack for Nigerian checkout
- Optional Supabase Edge Function for server-side Paystack initialization/verification
- React Router + responsive CSS

## Implemented features
- 40-product starter catalog
- Search, brand/category/RAM/storage/price filters
- Product details, image gallery, specifications and stock state
- Persistent shopping cart
- Customer accounts and order history
- Admin dashboard with product CRUD, image uploads and order-status management
- Customer FAQ, shipping, returns, privacy, terms, warranty, payments and contact pages
- USD storefront with NGN Paystack conversion for the Nigerian payment flow
- Dark mode, responsive mobile/desktop UI and PWA shell caching

## Performance
Images use centralized responsive delivery helpers, `srcset`, display-aware `sizes`, lazy loading, async decoding, explicit dimensions and Cloudinary format/quality transformations. The hero/main product image is prioritized. Firebase Hosting caches immutable static assets while `index.html` remains no-cache.

For remote starter images, `VITE_CLOUDINARY_FETCH=true` can route them through Cloudinary Fetch if that feature is enabled on the account. Product images should still be replaced with commercially licensed/owned photography before a real store launch.

## Secure payment mode
Firebase Hosting alone can host the frontend. It does not safely hold a Paystack secret key. For a secure payment flow without Firebase Blaze Cloud Functions, deploy `supabase/functions/dynamic-service` as a Supabase Edge Function.

Set:
```text
VITE_SUPABASE_PAYSTACK_FUNCTION_URL=<deployed function URL>
VITE_USD_TO_NGN=1500
```

Set `PAYSTACK_SECRET_KEY` and `USD_TO_NGN` as Supabase function secrets/environment values. The browser receives only the public Paystack key; the secret stays server-side. The secure flow initializes the transaction on the server, redirects to Paystack, verifies the reference server-side, checks the verified amount and only then creates the Firestore order.

**Important production boundary:** the starter cart is browser-controlled. For a commercial store, authoritative product prices and stock should also be loaded/rechecked on a trusted backend before payment/order creation. The portfolio documentation intentionally calls this out rather than claiming that client-supplied pricing is authoritative.

## Admin security
`/admin` checks the Firebase `admin` custom claim. Firestore rules independently require that claim for product writes and order management. Use `functions/setAdminClaim.js` from a trusted environment to grant the claim, then sign out/in to refresh the ID token.

## Deployment
### Frontend
```bash
npm install
npm run build
firebase deploy --only hosting
```

### Supabase payment function
Deploy the function in `supabase/functions/dynamic-service` using the Supabase CLI after configuring the project. Do not commit Paystack secret keys.

See:
- `PORTFOLIO.md` — client-facing case study
- `docs-ARCHITECTURE.md` — architecture and security boundaries
- `docs-DEPLOYMENT.md` — deployment checklist
- `SUPABASE-PAYSTACK-SETUP.md` — payment backend setup
- `PRODUCT-PHOTO-NOTES.md` — image licensing notes


## Supabase + Paystack

This build is wired to the Supabase project `wdgbfuxhxrtbfymkgsqj`. The frontend calls the Paystack Edge Function at `https://wdgbfuxhxrtbfymkgsqj.supabase.co/functions/v1/dynamic-service`. Only public configuration is shipped to the browser; the Paystack secret remains in Supabase Edge Function secrets.
=======
# Seuncart
>>>>>>> e35a410bd5a2c7a0441effa1c11d0b647a0623e9
