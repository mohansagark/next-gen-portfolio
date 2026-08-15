import { getContactEmailTemplate } from "./contactEmailTemplate.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeContactPayload(body = {}) {
  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || body.user_email || "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const company = String(body.company || "").trim().slice(0, 120);
  const phone = String(body.phone || "").trim().slice(0, 40);
  const reason = String(body.reason || body.select || "General Inquiry")
    .trim()
    .slice(0, 80);
  const message = String(body.message || "").trim().slice(0, 5000);
  const token = String(
    body.token || body["cf-turnstile-response"] || ""
  ).trim();

  const errors = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (message.length < 10) errors.push("message");
  if (!token || token.length > 2048) errors.push("token");

  return {
    ok: errors.length === 0,
    errors,
    data: {
      name,
      email,
      company,
      phone,
      reason,
      message,
      token,
    },
  };
}

const TURNSTILE_DEV_SECRET = "1x0000000000000000000000000000000AA";

export async function verifyTurnstileToken(token, remoteip) {
  const configured =
    process.env.TURNSTILE_SECRET || process.env.TURNSTILE_SECRET_KEY || "";
  const isProd = process.env.NODE_ENV === "production";

  if (!configured) {
    if (isProd) {
      const err = new Error("TURNSTILE_SECRET is not configured");
      err.code = "MISSING_TURNSTILE";
      throw err;
    }
  }

  const secret = configured || TURNSTILE_DEV_SECRET;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteip) body.set("remoteip", remoteip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    }
  );

  if (!response.ok) {
    throw new Error(`Turnstile siteverify failed (${response.status})`);
  }

  return response.json();
}

export async function sendContactViaResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const err = new Error("RESEND_API_KEY is not configured");
    err.code = "MISSING_RESEND";
    throw err;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const to = process.env.CONTACT_TO_EMAIL || "contact@devmohan.in";
  const from =
    process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const subject = `[devmohan.in] ${payload.reason} — ${payload.name}`;

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject,
    // Template escapes all fields; pass raw sanitized strings.
    html: getContactEmailTemplate({
      name: payload.name,
      user_email: payload.email,
      company: payload.company || "N/A",
      phone: payload.phone || "N/A",
      select: payload.reason,
      message: payload.message,
    }),
    text: [
      `New contact enquiry from ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "N/A"}`,
      `Phone: ${payload.phone || "N/A"}`,
      `Reason: ${payload.reason}`,
      "",
      payload.message,
    ].join("\n"),
  });

  if (result.error) {
    const err = new Error(result.error.message || "Resend send failed");
    err.code = "RESEND_ERROR";
    err.details = result.error;
    throw err;
  }

  return result.data;
}
