import { Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth.jsx";
import { money } from "../lib/products";
import { supabase } from "../lib/supabase";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    let active = true;
    const loadOrders = async () => {
      const { data, error: queryError } = await supabase.from("orders")
        .select("reference,status,total_amount,shipping_address,created_at,order_items(product_name,quantity,price)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (queryError) setError(queryError.message);
      else setOrders(data || []);
    };
    if (!supabase) setError("Supabase is not configured.");
    else loadOrders();
    return () => { active = false; };
  }, [user?.id]);

  if (!user) return <section className="section wrap center"><Package /><h1>Sign in to view your orders</h1><Link className="primary" to="/login">Log in</Link></section>;
  if (error) return <section className="section wrap center"><p className="error">{error}</p></section>;

  return <section className="section wrap orders">
    <div className="sectionHead"><div><div className="eyebrow">ORDER HISTORY</div><h1>My orders</h1></div></div>
    {!orders.length ? <div className="empty small"><Package /><h3>No orders</h3></div> : orders.map(order => <article className="orderCard" key={order.reference}>
      <div><small>{order.reference}</small><strong>{order.status}</strong></div>
      <p>{money(order.total_amount)}</p>
      <p>{order.shipping_address}</p>
      <div className="orderProducts">{(order.order_items || []).map((item, index) => <span key={`${item.product_name}-${index}`}>{item.product_name} x {item.quantity}</span>)}</div>
    </article>)}
  </section>;
}
