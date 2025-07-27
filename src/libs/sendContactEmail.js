// src/libs/sendContactEmail.js
// Handles sending contact form data to the Python email service

export async function sendContactEmail(formData) {
  const payload = {
    to: "contact@devmohan.in",
    subject: "New Contact Form Submission",
    content: getContactEmailTemplate(formData),
  };
  const response = await fetch(
    "https://python-email-service.onrender.com/send-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  return response;
}

import { getContactEmailTemplate } from "./contactEmailTemplate";
