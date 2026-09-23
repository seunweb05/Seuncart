import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Search, ShoppingBag, Sun, User } from "lucide-react";
import { money } from "../lib/products";
import { imageSrcSet, optimizeImageUrl } from "../lib/imageUtils";
import { useCart } from "../lib/cart";
import HeroProductSettings from "./HeroProductSettings";

export default function Header({ dark, setDark, products }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { count } = useCart();
  const suggestions = products.filter(product => product.name?.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    localStorage.setItem("sc-dark", next ? "1" : "0");
    window.dispatchEvent(new CustomEvent("seuncart-theme-change", { detail: next }));
  };

  return <>
    <div className="topbar"><span>Authentic tech • Secure Nigerian checkout</span><span>Need help? <a href="https://wa.me/2349154644958" target="_blank" rel="noreferrer">Chat on WhatsApp</a></span></div>
    <header className="header sticky top-0 z-50">
      <div className="nav">
        <Link to="/" className="logo" aria-label="SEUNCART home"><img src="/icon-192.svg" alt="" /><span>SEUN<span>CART</span></span></Link>
        <nav className="desktopNav" aria-label="Main navigation">
          <Link className={location.pathname === "/shop" ? "active" : ""} to="/shop">Shop</Link>
          <Link to="/shop?category=Phones">Phones</Link>
          <Link to="/shop?category=Laptops">Laptops</Link>
          <Link to="/shop?category=Accessories">Accessories</Link>
          <Link to="/blog">Guides</Link>
        </nav>
        <div className="search">
          <Search size={18} />
          <input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === "Enter" && navigate(`/shop?q=${encodeURIComponent(query)}`)} placeholder="Search iPhone, MacBook, AirPods..." aria-label="Product search" />
          {query && <div className="suggest">{suggestions.length ? suggestions.map(product => <Link key={product.id} to={`/product/${product.id}`} onClick={() => setQuery("")}><img src={optimizeImageUrl(product.images?.[0], 480)} srcSet={imageSrcSet(product.images?.[0])} sizes="48px" loading="lazy" decoding="async" width="48" height="48" alt={product.name} /><span>{product.name}<small>{money(product.price)}</small></span></Link>) : <div className="noSuggest">No products found</div>}</div>}
        </div>
        <div className="actions">
          <button onClick={toggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"} title={dark ? "Use light theme" : "Use dark theme"}>{dark ? <Sun /> : <Moon />}</button>
          <Link to="/account" aria-label="Account"><User /></Link>
          <Link className="cartIcon" to="/cart" aria-label="Shopping cart"><ShoppingBag /><b>{count}</b></Link>
        </div>
      </div>
    </header>
    <HeroProductSettings products={products} />
  </>;
}
