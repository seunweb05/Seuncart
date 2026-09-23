import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const reference = params.get("ref") || "Unavailable";

  return <section className="section wrap center success">
    <div className="successIcon"><CheckCircle2 /></div>
    <div className="eyebrow">PAYMENT COMPLETE</div>
    <h1>You have paid for your order!</h1>
    <p>Reference: <strong>{reference}</strong></p>
    <div className="heroBtns">
      <Link className="primary" to="/orders">View My Orders</Link>
      <Link className="ghost" to="/shop">Continue Shopping</Link>
    </div>
  </section>;
}
