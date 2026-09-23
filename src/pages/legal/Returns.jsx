import LegalPage from "./LegalPage";
export default function Returns() { return <LegalPage title="Returns & Refunds" intro="We want every SEUNCART purchase to feel considered and dependable. Eligible items may be returned within 7 days of delivery, subject to the conditions below." sections={[
  { title: "Seven-day return window", body: "Request a return within 7 days of delivery and include your order reference, product name and reason. Requests received after this period may not qualify unless a product warranty applies." },
  { title: "Condition and exclusions", body: "Items should be unused, complete with accessories and packaging, and in a condition suitable for inspection. Damage from misuse, liquid, unauthorized repair, missing parts or normal wear may be excluded." },
  { title: "Refund review", body: "After the returned item is inspected, an approved refund is sent through the applicable payment channel. Processing time depends on Paystack and the customer's bank. Wrong or damaged items should be reported promptly with photos." }
]} />; }
