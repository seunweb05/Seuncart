import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";

const linkClass = "footerLink";

export default function Footer() {
  return <>
    <a className="whatsapp" href="https://wa.me/2349154644958?text=Hello%20SEUNCART%2C%20I%20need%20help%20with%20a%20product." target="_blank" rel="noreferrer"><MessageCircle /> Chat</a>
    <footer className="siteFooter">
      <div>
        <strong className="logo">SEUN<span>CART</span></strong>
        <p>Premium tech, thoughtfully delivered.</p>
        <div className="socials">
          <a href="https://wa.me/2349154644958" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
          <a href="mailto:seunjoel05@gmail.com" aria-label="Email"><Mail /></a>
        </div>
      </div>
      <div>
        <b>Shop</b>
        <Link className={linkClass} to="/shop">All products</Link>
        <Link className={linkClass} to="/shop?category=Phones">Phones</Link>
        <Link className={linkClass} to="/shop?category=Laptops">Laptops</Link>
        <Link className={linkClass} to="/shop?category=Accessories">Accessories</Link>
      </div>
      <div>
        <b>Help</b>
        <Link className={linkClass} to="/faq">FAQ</Link>
        <Link className={linkClass} to="/shipping">Shipping</Link>
        <Link className={linkClass} to="/returns">Returns</Link>
        <Link className={linkClass} to="/payments">Payments</Link>
        <Link className={linkClass} to="/privacy">Privacy Policy</Link>
        <Link className={linkClass} to="/terms">Terms & Conditions</Link>
        <Link className={linkClass} to="/warranty">Warranty</Link>
        <Link className={linkClass} to="/contact">Contact</Link>
      </div>
      <div>
        <b>Company</b>
        <Link className={linkClass} to="/blog">Buying Guides</Link>
        <Link className={linkClass} to="/portfolio">Engineering Case Study</Link>
        <a className={linkClass} href="https://wa.me/2349154644958" target="_blank" rel="noreferrer">+234 915 464 4958</a>
        <a className={linkClass} href="mailto:seunjoel05@gmail.com">Email support</a>
      </div>
    </footer>
    <div className="copyright">© {new Date().getFullYear()} SEUNCART. All rights reserved.</div>
  </>;
}
