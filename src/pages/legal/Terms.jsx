import LegalPage from "./LegalPage";
export default function Terms() { return <LegalPage title="Terms & Conditions" intro="These terms apply when you browse SEUNCART, create an account or place an order. Product-specific information shown on a listing or at checkout forms part of the purchase details." sections={[
  { title: "Products and prices", body: "We aim to keep product descriptions, stock and prices accurate. Prices and availability can change, and the final amount shown before payment is the amount to review before authorizing checkout." },
  { title: "Orders and delivery", body: "An order is confirmed after successful payment and order creation. Delivery estimates are targets and may be affected by courier capacity, weather, public holidays or an incomplete address." },
  { title: "Acceptable use", body: "Customers must not submit fraudulent orders, interfere with checkout, attempt unauthorized access or use the service for unlawful activity. Returns, refunds and warranty requests remain subject to the relevant published policy." }
]} />; }
