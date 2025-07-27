// src/libs/contactEmailTemplate.js
// Returns a neat HTML email template for contact form submissions

export function getContactEmailTemplate(formData) {
  // Portfolio branding colors
  const primary = "#4f46e5"; // Example: gradient start
  const secondary = "#eab308"; // Example: gradient end
  const bg = "#f5f3ff"; // Example: cream-light-color
  const dark = "#18181b"; // Example: black-color
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background: ${bg}; padding: 32px; border-radius: 18px; color: ${dark}; max-width: 520px; margin: auto; box-shadow: 0 4px 24px rgba(79,70,229,0.08); border: 1px solid ${primary};">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <img src='https://devmohan.in/favicon.png' alt='Logo' style='width:40px;height:40px;border-radius:8px;border:2px solid ${secondary};background:${primary};' />
        <h2 style="background: linear-gradient(90deg, ${primary}, ${secondary}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.7rem; font-weight: 700; margin: 0;">New Contact Form Submission</h2>
      </div>
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
          <td style="padding: 10px 0;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; color: ${primary};">Reason:</td>
          <td style="padding: 10px 0;">${formData.select}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0; vertical-align: top; color: ${primary};">Message:</td>
          <td style="padding: 10px 0; white-space: pre-line;">${formData.message}</td>
        </tr>
      </table>
      <div style="margin-top: 32px; text-align: center; font-size: 0.95rem; color: ${primary};">
        <span style="background: linear-gradient(90deg, ${primary}, ${secondary}); padding: 6px 18px; border-radius: 8px; color: #fff; font-weight: 600; letter-spacing: 1px;">devmohan.in</span>
      </div>
    </div>
  `;
}
