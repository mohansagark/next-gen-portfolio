import {
  sanitizeContactPayload,
  sendContactViaResend,
  verifyTurnstileToken,
} from "./contactForm.js";
import { allowRequest, clientIp } from "./contactRateLimit.js";

/**
 * Contact POST handler without Next.js path aliases — unit/integration tests
 * import this module directly with node --test.
 */
export async function handleContactPost(request, deps = {}) {
  const checkRate = deps.allowRequest || allowRequest;
  const verify = deps.verifyTurnstileToken || verifyTurnstileToken;
  const send = deps.sendContactViaResend || sendContactViaResend;
  const getIp = deps.clientIp || clientIp;

  const ip = getIp(request);
  if (!checkRate(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = sanitizeContactPayload(body);
  if (!parsed.ok) {
    return Response.json(
      { ok: false, error: "Invalid form fields", fields: parsed.errors },
      { status: 400 }
    );
  }

  try {
    const verification = await verify(parsed.data.token, ip);
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
    const data = await send(parsed.data);
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
