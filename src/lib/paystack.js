import { STORE_CONFIG } from "../config";
import { supabase } from "./supabase";

const USD_TO_NGN = Number(import.meta.env.VITE_USD_TO_NGN || 1500);
const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_PAYSTACK_FUNCTION_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

async function functionHeaders() {
  const { data } = await supabase?.auth.getSession() || {};
  const token = data?.session?.access_token || SUPABASE_ANON_KEY;
  return { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` };
}

export const paystackConfig = {
  secureBackendEnabled: Boolean(SUPABASE_FUNCTION_URL),
  usdToNgn: USD_TO_NGN,
};

let paystackLoad;
function loadPaystack() {
  if (window.PaystackPop) return Promise.resolve();
  if (paystackLoad) return paystackLoad;
  paystackLoad = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Paystack checkout is unavailable. Check your connection and try again."));
    document.head.appendChild(script);
  });
  return paystackLoad;
}

export async function startPaystack({ email, amount, reference, callbackUrl, onSuccess, onError }) {
  try {
    const usdAmount = Number(amount);
    if (!email || !Number.isFinite(usdAmount) || usdAmount <= 0) {
      throw new Error("Invalid payment details.");
    }

    if (SUPABASE_FUNCTION_URL) {
      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: await functionHeaders(),
        body: JSON.stringify({
          action: "initialize",
          email,
          amount: usdAmount,
          amountUsd: usdAmount,
          reference,
          callbackUrl,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const authorizationUrl = data?.authorization_url || data?.data?.authorization_url;

      if (!response.ok || !authorizationUrl) {
        throw new Error(data?.error || data?.message || "Unable to initialize secure payment.");
      }

      window.location.assign(authorizationUrl);
      return;
    }

    await loadPaystack();
    if (!window.PaystackPop) throw new Error("Paystack checkout is unavailable. Please try again.");
    const ngnAmount = Math.round(usdAmount * USD_TO_NGN);
    const popup = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || STORE_CONFIG.paystackPublicKey,
      email,
      amount: ngnAmount * 100,
      ref: reference,
      currency: "NGN",
      callback: response => onSuccess?.(response),
    });
    popup.openIframe();
  } catch (error) {
    onError?.(error);
    if (!onError) alert(error.message || "Payment could not be started.");
  }
}

export async function verifyPaystack(reference) {
  if (!SUPABASE_FUNCTION_URL) return null;

  const response = await fetch(SUPABASE_FUNCTION_URL, {
    method: "POST",
    headers: await functionHeaders(),
    body: JSON.stringify({ action: "verify", reference }),
  });

  const data = await response.json().catch(() => ({}));
  const verified = data?.data || data;

  if (!response.ok || verified?.status !== "success") {
    throw new Error(data?.error || data?.message || "Payment verification failed.");
  }

  return verified;
}
