export function getContactEmailTemplate(formData) {
  const primary = "#6366f1"; // Tailwind indigo-500
  const secondary = "#f43f5e"; // Tailwind rose-500
  const bg = "#f5f3ff"; // cream-light-color
  const dark = "#18181b"; // black-color
  const textGray = "#4b5563";
  const lightGray = "#e5e7eb";

  const currentYear = new Date().getFullYear();

  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background: ${bg}; padding: 32px; border-radius: 18px; color: ${dark}; max-width: 580px; margin: auto; box-shadow: 0 4px 24px rgba(99,102,241,0.08); border: 1px solid ${primary};">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <img src='https://devmohan.in/img/logo/logo-dark.png' alt='Logo' style='width:40px;height:40px;border-radius:8px;border:2px solid ${secondary};background:${primary};object-fit:contain;' />
        <h2 style="background: linear-gradient(90deg, ${primary}, ${secondary}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.7rem; font-weight: 700; margin: 0;">New Contact Form Submission</h2>
      </div>

      <!-- Table Data -->
      <table style="width: 100%; border-collapse: collapse; font-size: 1rem;">
        <tr>
          <td style="font-weight: 600; padding: 10px 0; width: 140px; color: ${primary};">Name:</td>
          <td style="padding: 10px 0;">${formData.name}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Email:</td>
          <td style="padding: 10px 0;">${formData.user_email}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Phone:</td>
          <td style="padding: 10px 0;">${formData.phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Reason:</td>
          <td style="padding: 10px 0;">${formData.select}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; vertical-align: top; color: ${primary};">Message:</td>
          <td style="padding: 10px 0; white-space: pre-line; color: ${textGray}; line-height: 1.5;">${
    formData.message
  }</td>
        </tr>
      </table>

      <!-- CTA -->
      <div style="text-align: center; margin-top: 32px;">
        <a href="mailto:${
          formData.user_email
        }" style="background: linear-gradient(90deg, ${primary}, ${secondary}); padding: 12px 20px; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">📩 Reply to ${
    formData.name
  }</a>
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; font-size: 0.85rem; color: ${textGray}; border-top: 1px solid ${lightGray}; padding-top: 16px;">
        <p>This message was sent via <strong>devmohan.in</strong>'s contact form.</p>
        <p style="margin: 8px 0;">&copy; ${currentYear} Mohan Sagar K. All rights reserved.</p>
        <div style="margin-top: 10px;">
          <a href="https://linkedin.com/in/mohansagark" style="margin: 0 8px; color: ${primary}; text-decoration: none;">LinkedIn</a> |
          <a href="https://github.com/mohansagark" style="margin: 0 8px; color: ${primary}; text-decoration: none;">GitHub</a> |
          <a href="https://devmohan.in" style="margin: 0 8px; color: ${primary}; text-decoration: none;">Website</a>
        </div>
      </div>
    </div>
  `;
}
