import {
  sanitizeContactPayload,
  sendContactViaResend,
  verifyTurnstileToken,
} from "@/libs/contactForm";

export const runtime = "nodejs";

/** Best-effort per-isolate throttle (helps on a warm instance; not a global limiter). */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const recentByIp = new Map();

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") || "unknown";
}

function allowRequest(ip) {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const prev = recentByIp.get(ip) || [];
  const recent = prev.filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX) {
    recentByIp.set(ip, recent);
    return false;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  return true;
}

export async function POST(request) {
  const ip = clientIp(request);
  if (!allowRequest(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = sanitizeContactPayload(body);
  if (!parsed.ok) {
    return Response.json(
      { ok: false, error: "Invalid form fields", fields: parsed.errors },
      { status: 400 }
    );
  }

  try {
    const verification = await verifyTurnstileToken(parsed.data.token, ip);
    if (!verification?.success) {
      return Response.json(
        { ok: false, error: "Captcha verification failed" },
        { status: 403 }
      );
    }
  } catch (error) {
    if (error?.code === "MISSING_TURNSTILE") {
      return Response.json(
        {
          ok: false,
          error:
            "Captcha is not configured. Set TURNSTILE_SECRET on the server.",
        },
        { status: 503 }
      );
    }
    return Response.json(
      { ok: false, error: "Captcha verification unavailable" },
      { status: 503 }
    );
  }

  try {
    const data = await sendContactViaResend(parsed.data);
    return Response.json({ ok: true, id: data?.id || null });
  } catch (error) {
    if (error?.code === "MISSING_RESEND") {
      return Response.json(
        {
          ok: false,
          error:
            "Email delivery is not configured. Set RESEND_API_KEY on the server.",
        },
        { status: 503 }
      );
    }
    console.error("[contact]", error?.details || error);
    const detail =
      error?.details?.message ||
      error?.message ||
      "Failed to send message. Please try again.";
    const isDomainGate =
      typeof detail === "string" &&
      /verify a domain|own email address/i.test(detail);
    return Response.json(
      {
        ok: false,
        error: isDomainGate
          ? "Email provider is in test mode. Verify a Resend domain and set RESEND_FROM_EMAIL, or set CONTACT_TO_EMAIL to your Resend account email."
          : "Failed to send message. Please try again.",
      },
      { status: 502 }
    );
  }
}
