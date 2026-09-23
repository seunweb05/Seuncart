import { supabase } from "./supabase";

const toProduct = row => ({ ...row, oldPrice: row.old_price, createdAt: row.created_at ? { seconds: Math.floor(new Date(row.created_at).getTime() / 1000) } : null });
const toOrder = row => ({ ...row, userId: row.user_id, paymentCurrency: row.payment_currency, paymentAmountKobo: row.payment_amount_kobo, createdAt: row.created_at ? { seconds: Math.floor(new Date(row.created_at).getTime() / 1000) } : null });

export function watchProducts(setItems, setError) {
  if (!supabase) { setItems([]); return () => {}; }
  let active = true;
  const load = async () => { const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false }); if (!active) return; if (error) setError?.(error); else setItems((data || []).map(toProduct)); };
  load();
  const channel = supabase.channel(`products-live-${crypto.randomUUID()}`);
  channel.on("postgres_changes", { event: "*", schema: "public", table: "products" }, load);
  channel.subscribe((status, error) => { if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setError?.(error || new Error(`Product realtime subscription ${status.toLowerCase()}.`)); });
  return () => { active = false; void supabase.removeChannel(channel); };
}

export async function createProduct(data) {
  if (!supabase) throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart Vite.");
  const { id, oldPrice, createdAt, imageCredit, imageSource, ...rest } = data;
  const productId = id || crypto.randomUUID();
  const { data: row, error } = await supabase.from("products").insert({ ...rest, id: productId, old_price: oldPrice, image_credit: imageCredit, image_source: imageSource }).select().single();
  if (error?.code === "23505") return null;
  if (error) throw error;
  return row;
}

export async function seedProducts(products) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const candidates = products;
  const ids = candidates.map(product => product.id);
  const { data: existing, error: readError } = await supabase.from("products").select("id").in("id", ids);
  if (readError) throw readError;
  const existingIds = new Set((existing || []).map(product => product.id));
  const missing = candidates.filter(product => !existingIds.has(product.id));
  if (!missing.length) return 0;
  const rows = missing.map(({ oldPrice, createdAt, imageCredit, imageSource, ...product }) => ({ ...product, old_price: oldPrice, image_credit: imageCredit, image_source: imageSource }));
  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  if (error) throw error;
  return missing.length;
}

export async function saveProduct(id, data) {
  const { id: ignored, oldPrice, createdAt, imageCredit, imageSource, ...rest } = data;
  const { error } = await supabase.from("products").upsert({ ...rest, id, old_price: oldPrice, image_credit: imageCredit, image_source: imageSource, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) throw error;
}

export async function removeProduct(id) { const { error } = await supabase.from("products").delete().eq("id", id); if (error) throw error; }

export async function removeDuplicateProducts() {
  const { data, error } = await supabase.from("products").select("id,name,created_at").order("created_at", { ascending: true });
  if (error) throw error;
  const seen = new Set();
  const duplicateIds = (data || []).filter(product => { const key = product.name?.trim().toLowerCase(); if (!key || seen.has(key)) return Boolean(key); seen.add(key); return false; }).map(product => product.id);
  if (!duplicateIds.length) return 0;
  const { error: deleteError } = await supabase.from("products").delete().in("id", duplicateIds);
  if (deleteError) throw deleteError;
  return duplicateIds.length;
}

export async function createOrder(data) {
  const { data: sessionData } = await supabase.auth.getSession();
  const sessionUserId = sessionData?.session?.user?.id;
  if (!sessionUserId) throw new Error("Your session expired. Sign in again before completing checkout.");
  const order = { user_id: sessionUserId, reference: data.reference, email: data.email, name: data.name, phone: data.phone, address: data.address, items: data.items, amount: data.amount, payment_currency: data.paymentCurrency, payment_amount_kobo: Number.isFinite(Number(data.paymentAmountKobo)) ? Number(data.paymentAmountKobo) : null, payment_status: data.paymentStatus, status: data.status || "paid" };
  const { data: row, error } = await supabase.from("orders").upsert(order, { onConflict: "reference" }).select().single();
  if (error) throw error;
  return row;
}

export function watchOrders(setItems, setError, userId = null) {
  if (!supabase) { setItems([]); return () => {}; }
  let active = true;
  const load = async () => { let query = supabase.from("orders").select("*").order("created_at", { ascending: false }); if (userId) query = query.eq("user_id", userId); const { data, error } = await query; if (!active) return; if (error) setError?.(error); else setItems((data || []).map(toOrder)); };
  load();
  const channel = supabase.channel(`orders-live-${userId || "admin"}-${crypto.randomUUID()}`);
  channel.on("postgres_changes", { event: "*", schema: "public", table: "orders" }, load);
  channel.subscribe((status, error) => { if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setError?.(error || new Error(`Order realtime subscription ${status.toLowerCase()}.`)); });
  return () => { active = false; void supabase.removeChannel(channel); };
}

export function watchAllOrders(setItems, setError) {
  if (!supabase) { setItems([]); return () => {}; }
  let active = true;
  const load = async () => { const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }); if (!active) return; if (error) setError?.(error); else setItems((data || []).map(toOrder)); };
  load();
  const channel = supabase.channel(`all-orders-live-${crypto.randomUUID()}`);
  channel.on("postgres_changes", { event: "*", schema: "public", table: "orders" }, load);
  channel.subscribe((status, error) => { if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setError?.(error || new Error(`Order realtime subscription ${status.toLowerCase()}.`)); });
  return () => { active = false; void supabase.removeChannel(channel); };
}

export async function updateOrder(id, status) { const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id); if (error) throw error; }
