import { useState } from "react";
import { useLocation } from "react-router-dom";

const HERO_STORAGE_KEY = "seuncart-hero-product";

export default function HeroProductSettings({ products }) {
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem(HERO_STORAGE_KEY) || "iphone-18-pro");
  const [saved, setSaved] = useState(false);

  const save = event => {
    event.preventDefault();
    localStorage.setItem(HERO_STORAGE_KEY, selectedId);
    window.dispatchEvent(new CustomEvent("seuncart-hero-change", { detail: selectedId }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  if (location.pathname !== "/admin" || !products?.length) return null;

  return <form className="heroSettings" onSubmit={save}>
    <div className="panelHead">
      <div>
        <h2>Homepage hero</h2>
        <p>Choose the product shown in the homepage hero.</p>
      </div>
    </div>
    <label>Featured product
      <select value={selectedId} onChange={event => setSelectedId(event.target.value)}>
        {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
      </select>
    </label>
    <button className="primary" type="submit">{saved ? "Hero updated" : "Save homepage hero"}</button>
  </form>;
}
