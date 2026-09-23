# SEUNCART — Portfolio Case Study

**Role:** Independent developer  
**Project type:** Full-stack e-commerce portfolio project  
**Focus:** React, Firebase, Cloudinary, Paystack, Supabase Edge Functions, performance and responsive UX

## What I personally built
I designed and implemented the storefront UI, product browsing experience, cart and checkout flow, customer account area, Firestore data layer, admin product/order dashboard, Cloudinary image-upload workflow, payment integration, responsive styling, performance optimizations, policy pages and deployment configuration.

## Engineering highlights
- 40-product starter catalog with search and multi-dimensional filters.
- Product detail pages with galleries and specifications.
- Persistent shopping cart using browser storage.
- Firebase email/password authentication.
- Firestore-backed catalog and orders.
- Admin CRUD with Firebase custom-claim authorization.
- Cloudinary multi-image uploads and responsive delivery.
- Paystack checkout with USD storefront / NGN payment handling.
- Optional Supabase Edge Function for server-side Paystack initialization and verification.
- Mobile-first responsive layout, dark mode and PWA shell caching.
- Customer-facing FAQ, shipping, returns, privacy, terms, warranty, payments and contact pages.

## Performance work
The original storefront could request large remote images and did not consistently communicate the actual display size to the browser. This version centralizes image delivery, uses responsive `srcset`, lazy loading, explicit dimensions, Cloudinary transformations, preconnect and Firebase caching.

## Important portfolio honesty
SEUNCART is an independent project, not a claimed client project. Starter product prices and some catalog imagery are illustrative. The project documentation clearly separates implemented functionality from production steps that still require real business credentials, licensed content and authoritative pricing/order data.
