import { getContent } from "./contentStore";

// Fallback mirrors the canonical profile so a failed fetch renders the
// same content the CMS would provide.
const fallback = {
  firstName: "Mohan Sagar",
  lastName: "Killamsetty",
  headline: "AI & Frontend Software Engineer",
  bio: "I'm a Senior Software Engineer with 9+ years building AI-powered products and high-performance frontend systems at scale—specializing in LLM integrations, agentic workflows, and real-time interfaces. At Invesco I led IVYGPT, an internal AI platform used by 8,000+ users that cut report analysis from 30 days to 30 minutes. At Reliance Jio I led 10 engineers on platforms serving 5M+ users, improving performance ~90%. Now at ServiceNow I build agentic AI platforms with React, Next.js, Python and Node.",
  avatar: "",
  email: "contact@devmohan.in",
  phone: "+91 9790427138",
  location: "Hyderabad, Telangana, India",
  resumeUrl: "resume.pdf",
};

const getProfile = () => {
  return getContent("profile") || fallback;
};

export default getProfile;
