/**
 * Centralized image delivery helpers. Cloudinary URLs get responsive transformations.
 * Other remote URLs can optionally be delivered through Cloudinary Fetch when enabled.
 */
const CLOUD_NAME = "rvccstbp";
const USE_CLOUDINARY_FETCH = import.meta.env.VITE_CLOUDINARY_FETCH === "true";
function cloudinaryTransform(url, width, quality="auto") {
  const marker = "/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const transforms = `f_auto,q_${quality},w_${Math.max(160, Math.round(width))},c_limit,dpr_auto`;
  const rest = url.slice(i + marker.length).replace(/^(?:[^/]+,)+/, "");
  return `${url.slice(0, i + marker.length)}${transforms}/${rest}`;
}

export function optimizeImageUrl(url, width=640, quality="auto") {
  if (!url || typeof url !== "string") return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) return cloudinaryTransform(url, width, quality);
  if (USE_CLOUDINARY_FETCH && /^https?:\/\//.test(url)) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/f_auto,q_${quality},w_${Math.max(160, Math.round(width))},c_limit,dpr_auto/${encodeURIComponent(url)}`;
  }
  return url;
}

export function imageSrcSet(url) {
  if (!url) return undefined;
  return [320, 480, 640, 800, 1200].map(w => `${optimizeImageUrl(url, w)} ${w}w`).join(", ");
}

export function imageSizes(card=true) {
  return card ? "(max-width: 600px) 45vw, (max-width: 900px) 30vw, 280px" : "(max-width: 768px) 100vw, 720px";
}
