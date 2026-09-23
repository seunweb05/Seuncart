import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const readStorage = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("seuncart-cart", []));
  useEffect(() => { try { localStorage.setItem("seuncart-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  const add = product => setCart(current => { const old = current.find(item => item.id === product.id); return old ? current.map(item => item.id === product.id ? { ...item, qty: Math.min((item.qty || 1) + 1, product.stock || 99) } : item) : [...current, { ...product, qty: 1 }]; });
  const remove = id => setCart(current => current.filter(item => item.id !== id));
  const qty = (id, quantity) => setCart(current => current.map(item => item.id === id ? { ...item, qty: Math.max(1, Math.min(quantity, item.stock || 99)) } : item));
  const clear = () => setCart([]);
  return <CartContext.Provider value={{ cart, add, remove, qty, clear, count: cart.reduce((sum, item) => sum + item.qty, 0), total: cart.reduce((sum, item) => sum + item.price * item.qty, 0) }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
