import {
  sanitizeContactPayload,
  sendContactViaResend,
  verifyTurnstileToken,
} from "@/libs/contactForm";

export const runtime = "nodejs";

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") || undefined;
}

export async function POST(request) {
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
    const verification = await verifyTurnstileToken(
      parsed.data.token,
      clientIp(request)
    );
    if (!verification?.success) {
      return Response.json(
        { ok: false, error: "Captcha verification failed" },
        { status: 403 }
      );
    }
  } catch {
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
