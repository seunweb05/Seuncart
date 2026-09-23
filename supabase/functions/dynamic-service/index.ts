import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const USD_TO_NGN = Number(Deno.env.get("USD_TO_NGN") || "1500");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { action, email, amount, amountUsd, reference, callbackUrl } = await req.json();
    const secret = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!secret) return json({ error: "PAYSTACK_SECRET_KEY is not configured" }, 500);
    const headers = { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" };

    if (action === "initialize") {
      const usd = Number(amountUsd ?? amount);
      if (!email || !Number.isFinite(usd) || usd <= 0 || usd > 10000000) return json({ error: "Valid email and amountUsd are required" }, 400);
      const ngnKobo = Math.round(usd * USD_TO_NGN * 100);
      const r = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST", headers,
        body: JSON.stringify({ email, amount: ngnKobo, reference, currency: "NGN", callback_url: callbackUrl }),
      });
      const result = await r.json();
      const body = result?.data?.authorization_url
        ? { ...result, authorization_url: result.data.authorization_url }
        : result;
      return json(body, r.status);
    }

    if (action === "verify") {
      if (!reference || typeof reference !== "string") return json({ error: "reference is required" }, 400);
      const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers });
      const data = await r.json();
      if (!r.ok || data?.data?.status !== "success") return json({ error: "Payment was not successful", data: data?.data || null }, 400);
      return json(data);
    }
    return json({ error: "unknown action" }, 400);
  } catch (_e) {
    return json({ error: "server error" }, 500);
  }
});
