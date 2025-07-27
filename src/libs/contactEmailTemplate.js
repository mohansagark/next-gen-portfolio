// src/libs/contactEmailTemplate.js
// Returns a neat HTML email template for contact form submissions

export function getContactEmailTemplate(formData) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px; border-radius: 8px; color: #222; max-width: 480px; margin: auto;">
      <h2 style="color: #4f46e5; margin-bottom: 16px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; padding: 8px 0; width: 120px;">First Name:</td>
          <td style="padding: 8px 0;">${formData.first_name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Last Name:</td>
          <td style="padding: 8px 0;">${formData.last_name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Email:</td>
          <td style="padding: 8px 0;">${formData.user_email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
          <td style="padding: 8px 0;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0;">Reason:</td>
          <td style="padding: 8px 0;">${formData.select}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; white-space: pre-line;">${formData.message}</td>
        </tr>
      </table>
    </div>
  `;
}
