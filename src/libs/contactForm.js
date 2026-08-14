import { getContactEmailTemplate } from "./contactEmailTemplate.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

export async function verifyTurnstileToken(token, remoteip) {
  const secret =
    process.env.TURNSTILE_SECRET ||
    process.env.TURNSTILE_SECRET_KEY ||
    "1x0000000000000000000000000000000AA";

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

  const safe = {
    name: escapeHtml(payload.name),
    user_email: escapeHtml(payload.email),
    company: escapeHtml(payload.company || "N/A"),
    phone: escapeHtml(payload.phone || "N/A"),
    select: escapeHtml(payload.reason),
    message: escapeHtml(payload.message),
  };

  const subject = `[devmohan.in] ${payload.reason} — ${payload.name}`;

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject,
    html: getContactEmailTemplate(safe),
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
