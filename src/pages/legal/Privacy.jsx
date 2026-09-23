import LegalPage from "./LegalPage";
export default function Privacy() { return <LegalPage title="Privacy Policy" intro="SEUNCART collects only the information needed to operate a reliable technology store, process orders, deliver products and provide customer support." sections={[
  { title: "Information we use", body: "This may include your name, email address, phone number, delivery address, account details, cart contents and order history. Payment credentials are handled by Paystack and are not stored by SEUNCART." },
  { title: "Service providers", body: "Supabase supports authentication and order data, Paystack processes payments, Cloudinary may deliver product images, and delivery providers receive the information needed to fulfil an order." },
  { title: "Your choices", body: "You may ask to access or correct eligible personal information, or ask a privacy question by contacting seunjoel05@gmail.com. We retain order records where needed for support, accounting, fraud prevention and legal obligations." }
]} />; }
