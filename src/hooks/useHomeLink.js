"use client";
import { useEffect, useState } from "react";

// On blog.devmohan.in, "/" is served as the blog list, so any link meant for the
// portfolio home ("/", "/#services", the logo, the footer brand) would keep the
// visitor trapped on the blog. This hook rewrites those links to the main site
// when we're on the blog host.
//
// Returns a resolver: pass the intended home-relative path ("/", "/#contact",
// "#contact") and get back either the same path (main site) or an absolute
// https://devmohan.in URL (blog host). The base is set in an effect so the first
// client render matches the server (no hydration mismatch).
const MAIN_SITE = "https://devmohan.in";
const BLOG_HOST = "blog.devmohan.in";

export default function useHomeLink() {
  const [base, setBase] = useState("");
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hostname === BLOG_HOST
    ) {
      // window.location isn't available at SSR time — this two-pass read is
      // the deliberate fix for the hydration mismatch noted above.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBase(MAIN_SITE);
    }
  }, []);

  return (path = "/") => {
    if (!base) return path;
    // Absolute URLs (e.g. the Blog item -> https://blog.devmohan.in) are already
    // where they should point — never prefix them with the main-site host.
    if (/^https?:\/\//i.test(path)) return path;
    if (path === "/" || path === "#" || path === "") return base;
    return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  };
}
