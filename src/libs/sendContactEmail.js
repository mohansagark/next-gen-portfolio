/**
 * Client helper — posts contact form data (incl. Turnstile token) to /api/contact.
 * Server verifies captcha and sends email via Resend.
 */
export async function sendContactEmail(formData) {
  const response = await fetch("/api/contact/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email || formData.user_email,
      company: formData.company || "",
      phone: formData.phone || "",
      reason: formData.reason || formData.select || "General Inquiry",
      message: formData.message,
      token: formData.token || formData["cf-turnstile-response"] || "",
    }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { ok: response.ok && Boolean(data?.ok), status: response.status, data };
}
