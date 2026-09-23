import LegalPage from "./LegalPage";
export default function Payments() { return <LegalPage title="Payments" intro="SEUNCART uses Paystack to provide a secure online checkout. Product prices are displayed in USD, while the Nigerian checkout may process the equivalent amount in NGN." sections={[
  { title: "Secure Paystack checkout", body: "Payment details are entered in Paystack's protected checkout experience. SEUNCART does not ask customers to send card numbers, CVV, PINs or OTPs through WhatsApp, email or chat." },
  { title: "Payment confirmation", body: "A successful transaction produces a unique SEUN reference. The order is recorded only after the payment callback is received and the order details are saved successfully." },
  { title: "Payment questions", body: "If your bank account was charged but you do not see an order confirmation, contact support with the Paystack reference and payment date. Never share your PIN or OTP with support." }
]} />; }
