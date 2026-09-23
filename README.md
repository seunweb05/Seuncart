# SEUNCART — Portfolio Ready E-Commerce Platform

SEUNCART is an independent full-stack e-commerce portfolio project built to demonstrate production-minded React development, cloud data services, media optimization, payment integration and admin operations.

**Live Demo:** `https://your-live-url.vercel.app`  
**Stack:** React 19 + Vite, Firebase (Auth, Firestore, Storage, Hosting), Cloudinary, Paystack, Supabase Edge Functions

### Stack
- React 19 + Vite
- Firebase Authentication, Firestore, Storage and Hosting
- Cloudinary for product media delivery and uploads
- Paystack for Nigerian checkout
- Optional Supabase Edge Function for server-side Paystack initialization/verification
- React Router + responsive CSS

### Implemented Features
- 40-product starter catalog
- Search, brand / category / RAM / storage / price filters
- Product details, image gallery, specifications and stock state
- Persistent shopping cart
- Customer accounts and order history
- Admin dashboard with product CRUD, image uploads and order-status management
- Customer FAQ, shipping, returns, privacy, terms, warranty, payments and contact pages
- USD storefront with NGN Paystack conversion for the Nigerian payment flow
- Dark mode, responsive mobile/desktop UI and PWA shell caching

### Performance
Images use centralized responsive delivery helpers, `srcset`, display-aware `sizes`, lazy loading, async decoding, explicit dimensions and Cloudinary format/quality transformations. The hero/main product image is prioritized. Firebase Hosting caches immutable static assets while `index.html` remains no-cache.

For remote starter images, `VITE_CLOUDINARY_FETCH=true` can route them through Cloudinary Fetch if that feature is enabled on the account. Product images should still be replaced with commercially licensed/owned photography before a real store launch.

### Admin Security
`/admin` checks the Firebase `admin` custom claim. Firestore rules independently require that claim for product writes and order management.
Use `functions/setAdminClaim.js` from a trusted environment to grant the claim, then sign out/in to refresh the ID token.

### Environment Variables
Create a `.env` file in the root. Do NOT commit Paystack secret keys.
