export function getContactEmailTemplate(formData) {
  const primary = "#0f766e";
  const accent = "#14b8a6";
  const bg = "#f3f4f6";
  const dark = "#0b0d10";
  const textGray = "#374151";
  const lightGray = "#e5e7eb";
  const currentYear = new Date().getFullYear();

  return `
    <div style="font-family: 'Sora', Inter, Arial, sans-serif; background: ${bg}; padding: 32px; border-radius: 18px; color: ${dark}; max-width: 580px; margin: auto; border: 1px solid ${lightGray};">
      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: ${primary}; font-weight: 700;">devmohan.in</p>
        <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: ${dark};">New contact enquiry</h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 1rem;">
        <tr>
          <td style="font-weight: 600; padding: 10px 0; width: 140px; color: ${primary};">Name</td>
          <td style="padding: 10px 0;">${formData.name}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Email</td>
          <td style="padding: 10px 0;">${formData.user_email}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Company</td>
          <td style="padding: 10px 0;">${formData.company || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Phone</td>
          <td style="padding: 10px 0;">${formData.phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Reason</td>
          <td style="padding: 10px 0;">${formData.select}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; vertical-align: top; color: ${primary};">Message</td>
          <td style="padding: 10px 0; white-space: pre-line; color: ${textGray}; line-height: 1.5;">${formData.message}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 32px;">
        <a href="mailto:${formData.user_email}" style="background: linear-gradient(90deg, ${primary}, ${accent}); padding: 12px 20px; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;">
          Reply to ${formData.name}
        </a>
      </div>

      <div style="margin-top: 40px; text-align: center; font-size: 0.85rem; color: ${textGray}; border-top: 1px solid ${lightGray}; padding-top: 16px;">
        <p style="margin: 0;">Sent via the contact form on <strong>devmohan.in</strong>.</p>
        <p style="margin: 8px 0 0;">&copy; ${currentYear} Mohan Sagar</p>
      </div>
    </div>
  `;
}
