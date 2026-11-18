import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE = Deno.env.get("SUPABASE_URL") || "";
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const RESEND = Deno.env.get("RESEND_API_KEY") || "";
const FROM = Deno.env.get("GFT_APPLICATION_FROM") ||
  Deno.env.get("AMBASSADOR_FROM_EMAIL") ||
  Deno.env.get("SAMPLE_FROM_EMAIL") ||
  "no-reply@send.iconx.io";
const TO = ["rcramer@iconx.io", "support@gftrewards.com"];
const TABLE = "gft_store_ambassador_applications";
const validOrigin = (origin: string | null) =>
  !origin || /^https:\/\/gft-rewards-store-ambassadors(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin) ||
  origin === "http://localhost:8000" || origin === "http://127.0.0.1:8000";

function cors(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin && validOrigin(origin) ? origin : "https://gft-rewards-store-ambassadors.vercel.app",
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
}
const json = (data: Record<string, unknown>, status: number, origin: string | null) =>
  new Response(JSON.stringify(data), { status, headers: cors(origin) });
const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max + 1);
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c] || c);
const svcHeaders = () => ({
  apikey: SERVICE, Authorization: "Bearer " + SERVICE,
  "Content-Type": "application/json",
});
async function getRows(query: string): Promise<Record<string, unknown>[]> {
  const r = await fetch(SUPABASE + "/rest/v1/" + TABLE + "?" + query, {
    headers: svcHeaders(), signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error("database-read-" + r.status);
  return await r.json();
}
async function saveRow(record: Record<string, unknown>) {
  const r = await fetch(SUPABASE + "/rest/v1/" + TABLE, {
    method: "POST", headers: { ...svcHeaders(), "Prefer": "return=representation" },
    body: JSON.stringify(record), signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new Error("database-write-" + r.status);
  const rows = await r.json();
  return rows[0];
}
async function mark(rowId: string, status: "sent" | "failed", providerId?: string) {
  const update: Record<string, unknown> = {
    notification_status: status,
    notification_attempts: 1,
  };
  if (status === "sent") { update.notification_provider_id = providerId; update.notified_at = new Date().toISOString(); }
  await fetch(SUPABASE + "/rest/v1/" + TABLE + "?id=eq." + rowId, {
    method: "PATCH", headers: svcHeaders(), body: JSON.stringify(update),
    signal: AbortSignal.timeout(8000),
  }).catch(() => {});
}
function valid(body: Record<string, unknown>) {
  const d = {
    full_name: str(body.full_name, 150),
    email: str(body.email, 254).toLowerCase(),
    mobile: str(body.mobile, 40),
    state: str(body.state, 2),
    territory: str(body.territory, 12),
    base_city: str(body.base_city, 120),
    retail_experience: str(body.retail_experience, 1600),
    website: str(body.website, 200),
    language: body.language === "es" ? "es" : "en",
    submission_id: str(body.submission_id, 36),
    bilingual: body.bilingual === true,
    consent: body.consent === true,
  };
  const digits = d.mobile.replace(/\D/g, "");
  const eligible = d.full_name.length >= 2 && d.full_name.length <= 150 &&
    /^\S+@\S+\.\S+$/.test(d.email) && d.email.length <= 254 &&
    digits.length >= 7 && digits.length <= 15 && d.mobile.length <= 40 &&
    d.base_city.length >= 2 && d.base_city.length <= 120 &&
    ["FL", "NY"].includes(d.state) &&
    new RegExp("^" + d.state + "-\\d{2}$").test(d.territory) &&
    Number(d.territory.slice(-2)) >= (d.state === "FL" ? 1 : 19) &&
    Number(d.territory.slice(-2)) <= (d.state === "FL" ? 18 : 38) &&
    d.retail_experience.length <= 1600 && d.bilingual && d.consent &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(d.submission_id);
  return { d, eligible };
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (!validOrigin(origin)) return json({ ok: false, error: "Origin not allowed" }, 403, origin);
  if (req.method === "GET" && new URL(req.url).searchParams.has("health")) {
    let relayReady = false;
    try {
      const rr = await fetch("https://iconx.io/api/gft-ambassador-mail?health=1", {signal: AbortSignal.timeout(5000)});
      relayReady = rr.ok && (await rr.json()).ready === true;
    } catch { /* Backend health check fails closed. */ }
    return json({
      ok: true, ready: Boolean(SUPABASE && SERVICE && ((RESEND && FROM) || relayReady)),
      databaseConfigured: Boolean(SUPABASE && SERVICE),
      resendKeyConfigured: Boolean(RESEND),
      iconxRelayReady: relayReady,
      transport: RESEND ? "Resend (Supabase)" : "Resend (Iconx.io Vercel)",
      project: "GFT Rewards Store Ambassadors"
    }, 200, origin);
  }
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, origin);
  if (!SUPABASE || !SERVICE) return json({ ok: false, error: "Application storage is unavailable. Please try again later." }, 503, origin);
  let raw = "";
  try { raw = await req.text(); } catch { return json({ ok: false, error: "Unable to read submission" }, 400, origin); }
  if (raw.length > 6000) return json({ ok: false, error: "Submission too large" }, 413, origin);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid payload");
  } catch { return json({ ok: false, error: "Invalid application" }, 400, origin); }
  if (str(body.website, 200)) return json({ ok: true, received: true, emailed: true }, 200, origin); // honeypot
  const { d, eligible } = valid(body);
  if (!eligible) return json({ ok: false, error: "Please complete all required application fields." }, 400, origin);
  try {
    let row: Record<string, unknown> | undefined;
    const found = await getRows("select=id,submission_id,notification_status&submission_id=eq." + d.submission_id + "&limit=1");
    row = found[0];
    if (!row) {
      const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const recent = await getRows("select=id,submission_id,notification_status&email=eq." +
        encodeURIComponent(d.email) + "&territory=eq." + d.territory + "&created_at=gte." +
        encodeURIComponent(cutoff) + "&order=created_at.desc&limit=1");
      row = recent[0];
    }
    if (!row) {
      row = await saveRow({
        submission_id: d.submission_id,
        full_name: d.full_name, email: d.email, mobile: d.mobile,
        state: d.state, territory: d.territory, base_city: d.base_city,
        retail_experience: d.retail_experience || null,
        bilingual_confirmed: d.bilingual, contact_consent: d.consent,
        language: d.language, source: "gft-store-ambassadors",
      });
    }
    if (row.notification_status === "sent") return json({ ok: true, received: true, emailed: true }, 200, origin);
    const directMail = Boolean(RESEND && FROM);
    let emailResponse: Response;
    if (directMail) {
      const pairs = [
        ["Applicant", d.full_name], ["Email", d.email], ["Phone", d.mobile],
        ["State", d.state], ["Preferred territory", d.territory],
        ["Applicant city/ZIP", d.base_city], ["Languages", "English and Spanish confirmed"],
        ["GFT platform training", "Acknowledged"],
        ["Retail experience", d.retail_experience || "Not provided"],
      ];
      const message = '<h2>GFT Rewards — Store Ambassador Application</h2><p>Submitted from GFT Rewards Store Ambassadors, not Sampling For Good.</p><table cellpadding="8">' +
        pairs.map(([a, b]) => "<tr><th align='left'>" + esc(a) + "</th><td>" + esc(b) + "</td></tr>").join("") +
        "</table>";
      emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + RESEND,
          "Content-Type": "application/json",
          "Idempotency-Key": "gft-store-ambassador/" + String(row.id),
        },
        body: JSON.stringify({
          from: FROM, to: TO, reply_to: d.email,
          subject: "GFT Rewards Store Ambassador Application — " + d.territory + " — " + d.full_name,
          html: message,
        }),
        signal: AbortSignal.timeout(10000),
      });
    } else {
      // Resend is connected in Iconx.io's Vercel project, not in this Supabase project.
      // The Iconx relay only accepts fixed recruiting recipients and validated GFT data.
      emailResponse = await fetch("https://iconx.io/api/gft-ambassador-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: String(row.id), full_name: d.full_name, email: d.email, mobile: d.mobile,
          state: d.state, territory: d.territory, base_city: d.base_city,
          retail_experience: d.retail_experience,
        }),
        signal: AbortSignal.timeout(10000),
      });
    }
    const data = await emailResponse.json().catch(() => ({}));
    const accepted = emailResponse.ok && (directMail ? Boolean(data.id) : Boolean(data.ok && data.emailed));
    if (!accepted) {
      console.error("GFT recruiting email rejected", emailResponse.status, directMail ? "supabase" : "iconx-relay");
      await mark(String(row.id), "failed");
      return json({ ok: false, received: true, emailed: false, error: "Application saved, but recruiting email was not accepted. Please try again later." }, 502, origin);
    }
    await mark(String(row.id), "sent", directMail ? data.id : undefined);
    return json({ ok: true, received: true, emailed: true }, 200, origin);
  } catch (err) {
    console.error("GFT application handler error", err instanceof Error ? err.message.replace(/[^\w-]/g, "") : "unknown");
    return json({ ok: false, error: "Unable to process your application right now. Please try again later." }, 503, origin);
  }
});
