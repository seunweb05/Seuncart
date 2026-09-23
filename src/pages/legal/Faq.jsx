import LegalPage from "./LegalPage";
export default function Faq() { return <LegalPage title="Frequently Asked Questions" intro="SEUNCART is a premium technology store focused on authentic products, secure checkout and dependable Nigerian delivery. These answers cover the questions customers ask most often." sections={[
  { title: "Are SEUNCART products authentic?", body: "We source products from trusted channels and publish clear product details. If you have an authenticity concern, contact support with your order reference so our team can investigate promptly." },
  { title: "How do I place an order?", body: "Choose a product, add it to your cart, enter your delivery details and complete payment through the secure Paystack checkout. Your order reference appears after successful payment." },
  { title: "How can I contact support?", body: "Contact SEUNCART through WhatsApp or email for product questions, delivery updates, returns and warranty support. Include your order reference whenever you are asking about an existing order." }
]} />; }
