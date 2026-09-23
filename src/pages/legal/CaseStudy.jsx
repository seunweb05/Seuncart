import LegalPage from "./LegalPage";
export default function CaseStudy() { return <LegalPage title="SEUNCART Case Study" intro="SEUNCART is a full-stack portfolio project demonstrating a polished e-commerce workflow for premium technology products, from discovery and media delivery to checkout and order history." sections={[
  { title: "Product experience", body: "The storefront combines React and Vite with responsive product discovery, search, filtering, product detail pages, cart management, customer accounts and a focused checkout flow." },
  { title: "Commerce architecture", body: "Supabase supports authentication and order data, Paystack handles payment checkout, Cloudinary can optimize product media, and Firebase Hosting serves the frontend. The project keeps public client configuration separate from secret payment operations." },
  { title: "Engineering decisions", body: "The interface uses responsive image loading, fixed hero assets, accessible controls, light and dark themes, row-level order policies and focused loading states to make the experience dependable as well as visually refined." }
]} />; }
