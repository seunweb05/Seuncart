# SEUNCART — Architecture & Engineering Notes

## System map

```text
Browser (React + Vite)
  ├─ Firebase Auth ────────────────> customer/admin identity
  ├─ Firestore ────────────────────> products, orders, reviews, wishlist
  ├─ Cloudinary ───────────────────> optimized product media
  ├─ Firebase Hosting ─────────────> static deployment + SPA rewrite
  └─ Supabase Edge Function ───────> optional secure Paystack initialize/verify
                                      └─ Paystack API
```

## Frontend
- React 19 + Vite
- React Router for client-side navigation
- Reusable cart, authentication, image and store helpers
- Responsive CSS for mobile and desktop
- PWA shell caching for repeat visits

## Data layer
- Firestore is the application catalog/order data store.
- Public product reads are allowed by Firestore rules.
- Product writes and order management require the `admin` custom claim.
- Customer order reads are limited to the authenticated customer's UID.

## Media pipeline
1. Admin selects product images.
2. Images are uploaded to Cloudinary with an unsigned preset.
3. Firestore stores the resulting secure image URLs.
4. The storefront requests responsive Cloudinary transformations.
5. `f_auto` and `q_auto` allow modern formats/quality selection.
6. Lazy loading keeps below-the-fold images from blocking initial rendering.

## Payment architecture
### Portfolio/test mode
The Paystack public key may be used by the browser for test checkout.

### Secure mode
Set `VITE_SUPABASE_PAYSTACK_FUNCTION_URL` to the deployed Supabase Edge Function. The browser sends the USD amount to the function; the function converts it to NGN and initializes Paystack using `PAYSTACK_SECRET_KEY`, which remains server-side. After Paystack redirects back, the app asks the function to verify the reference before creating the Firestore order.

> For a commercial launch, replace the illustrative USD→NGN rate with a controlled pricing/FX source and move authoritative order pricing to a trusted backend. The portfolio implementation deliberately documents this boundary instead of claiming that a browser-supplied cart is an authoritative price source.

## Admin security
The `/admin` UI checks the Firebase `admin` custom claim. Firestore rules independently enforce that claim, so hiding the route is not the security boundary.

Set the claim from a trusted environment using `functions/setAdminClaim.js`, then refresh the user's ID token by signing out/in.

## Performance decisions
- Cloudinary responsive widths: 320–1200px.
- `loading="lazy"` for catalog/thumb images.
- `loading="eager"` + high fetch priority for the hero/main product image.
- Explicit image dimensions reduce layout shift.
- Firebase Hosting caches immutable static assets for one year.
- `index.html` remains no-cache so new deployments are discovered promptly.
- Cloudinary preconnect reduces connection setup time.
- Optional Cloudinary Fetch can optimize remote starter images; enable with `VITE_CLOUDINARY_FETCH=true` only after confirming the Cloudinary account supports the feature.
