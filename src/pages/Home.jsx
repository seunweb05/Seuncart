import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Heart, MessageCircle, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS, money } from "../lib/products";
import { imageSrcSet, optimizeImageUrl } from "../lib/imageUtils";

const DEFAULT_HERO_ID = "iphone-18-pro";
const CATEGORY_ITEMS = [
  { label: "iPhone", href: "/shop?category=Phones" },
  { label: "MacBook", href: "/shop?category=Laptops" },
  { label: "iPad", href: "/shop?category=Tablets" },
  { label: "AirPods", href: "/shop?category=Audio" },
  { label: "Accessories", href: "/shop?category=Accessories" },
  { label: "Cameras", href: "/shop?category=Cameras" },
];

function Trust() {
  return <section className="trust wrap">{[[ShieldCheck, "Secure checkout", "Pay safely with Paystack"], [Truck, "Fast delivery", "Nigeria-wide dispatch"], [CheckCircle2, "Quality guarantee", "Curated tech products"], [MessageCircle, "24/7 Support", "Real help when you need it"]].map(([Icon, title, text]) => <div key={title}><Icon /><span><strong>{title}</strong><small>{text}</small></span></div>)}</section>;
}

export default function Home({ products, ProductCard }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroId, setHeroId] = useState(() => localStorage.getItem("seuncart-hero-product") || DEFAULT_HERO_ID);
  const featured = products.slice(0, 4);
  const heroProduct = products.find(product => product.id === heroId) || products.find(product => product.id === DEFAULT_HERO_ID) || PRODUCTS[0];
  const heroImageSource = heroProduct.images?.[0];
  const heroImage = optimizeImageUrl(heroImageSource, 900);

  useEffect(() => {
    const onHeroChange = event => {
      setHeroId(event.detail || DEFAULT_HERO_ID);
      setHeroLoaded(false);
    };
    window.addEventListener("seuncart-hero-change", onHeroChange);
    return () => window.removeEventListener("seuncart-hero-change", onHeroChange);
  }, []);

  return <>
    <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
    <section className="hero wrap">
      <div className="heroCopy">
        <div className="eyebrow"><Sparkles size={15} /> SEUNCART • PREMIUM TECH</div>
        <h1>Technology<br /><em>that fits your world.</em></h1>
        <p>Shop phones, laptops, accessories and everyday essentials with premium support, transparent pricing and a checkout experience built for modern buyers in Nigeria.</p>
        <div className="heroBtns">
          <Link className="primary" to="/shop">Shop latest tech <ArrowRight /></Link>
          <Link className="ghost" to="/shop">Explore collection</Link>
        </div>
        <div className="miniTrust">
          <span><CheckCircle2 size={16} /> Verified checkout</span>
          <span><Truck size={16} /> Nationwide delivery</span>
        </div>
      </div>
      <div className="heroVisual">
        <div className="heroGlow" />
        <div className="skeleton" style={{ display: heroLoaded ? "none" : "block", width: "76%", height: "76%", position: "absolute" }} aria-hidden="true" />
        <img src={heroImage} srcSet={imageSrcSet(heroImageSource)} sizes="(max-width: 768px) 100vw, 720px" loading="eager" fetchPriority="high" decoding="async" width="900" height="900" alt={heroProduct.name} onLoad={() => setHeroLoaded(true)} />
        <div className="floatingPrice">
          <small>Featured today</small>
          <strong>{heroProduct.name}</strong>
          <span>{money(heroProduct.price)}</span>
        </div>
      </div>
    </section>

    <section className="categories wrap" aria-label="Product categories">
      <div className="sectionHead compact">
        <div>
          <div className="eyebrow">SHOP BY CATEGORY</div>
          <h2>Built for the way you work and play</h2>
        </div>
      </div>
      <div className="categoryRow">
        {CATEGORY_ITEMS.map(item => (
          <Link key={item.label} to={item.href} className="categoryChip">{item.label}</Link>
        ))}
      </div>
    </section>

    <Trust />
    <section className="section wrap">
      <div className="sectionHead">
        <div>
          <div className="eyebrow">CURATED COLLECTION</div>
          <h2>Trending right now</h2>
        </div>
        <Link to="/shop">View all <ChevronRight /></Link>
      </div>
      <div className="grid">{featured.map(product => <ProductCard key={product.id} p={product} />)}</div>
    </section>
    <section className="promo wrap">
      <div>
        <span className="eyebrow">SEUNCART INSIDER</span>
        <h2>Get 10% off your first order.</h2>
        <p>Join for new arrivals, useful buying guides and price alerts.</p>
      </div>
      <form onSubmit={event => { event.preventDefault(); alert("Thanks — you're on the SEUNCART list."); }}>
        <input type="email" required placeholder="Email address" />
        <button className="primary">Join now</button>
      </form>
    </section>
    <section className="section wrap split">
      <div>
        <div className="eyebrow">BUY WITH CONFIDENCE</div>
        <h2>A store that feels personal.</h2>
        <p>Ask questions before you buy, compare products quickly and keep your order history in one place.</p>
        <a className="whatsappInline" href={`https://wa.me/2349154644958?text=${encodeURIComponent("Hello SEUNCART, I need help choosing a product.")}`} target="_blank" rel="noreferrer"><MessageCircle /> Talk to SEUNCART on WhatsApp</a>
      </div>
      <div className="featureList">{[[ShieldCheck, "Secure payments", "Paystack-powered checkout"], [Package, "Order tracking", "Keep your purchases organized"], [Heart, "Save favourites", "Wishlist products for later"]].map(([Icon, title, text]) => <div key={title}><Icon /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div>
    </section>
  </>;
}
