import { NextResponse } from "next/server";

// Serve the blog under blog.devmohan.in while the app itself keeps its /blogs
// routes. On the blog host we rewrite short URLs onto /blogs; on the apex domain
// we redirect /blogs traffic to the subdomain so there's one canonical home.
const BLOG_HOST = "blog.devmohan.in";

export function middleware(request) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (host === BLOG_HOST) {
    // The /blogs prefix is internal-only on the subdomain. Bounce any /blogs or
    // /blogs/<slug> request (incl. the app's own links) to the clean short URL,
    // so there's a single canonical form (no /blogs duplicate).
    //   blog.devmohan.in/blogs         -> blog.devmohan.in/
    //   blog.devmohan.in/blogs/<slug>  -> blog.devmohan.in/<slug>
    if (pathname === "/blogs" || pathname.startsWith("/blogs/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/blogs/, "") || "/";
      return NextResponse.redirect(url, 308);
    }
    // Serve the clean short URLs by rewriting onto the real /blogs routes:
    //   blog.devmohan.in/          -> /blogs
    //   blog.devmohan.in/<slug>    -> /blogs/<slug>
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/blogs" : `/blogs${pathname}`;
    return NextResponse.rewrite(url);
  }

  // On the apex/www domain, send blog traffic to the subdomain (SEO consolidation):
  //   devmohan.in/blogs          -> https://blog.devmohan.in/
  //   devmohan.in/blogs/<slug>   -> https://blog.devmohan.in/<slug>
  // Keep /blogs local on localhost so the in-theme templates can be verified.
  const isLocal =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
  if (
    !isLocal &&
    (pathname === "/blogs" || pathname.startsWith("/blogs/"))
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = BLOG_HOST;
    url.port = "";
    url.pathname = pathname.replace(/^\/blogs/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, API routes, and static files
  // (anything with a file extension, e.g. .xml/.txt/.png/.ico).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
