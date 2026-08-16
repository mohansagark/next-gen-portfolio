import { NextResponse } from "next/server";
import { resolveBlogHostAction } from "@/libs/legacyRedirects";

// Serve the blog under blog.devmohan.in while the app itself keeps its /blogs
// routes. On the blog host we rewrite short URLs onto /blogs; on the apex domain
// we redirect /blogs traffic to the subdomain so there's one canonical home.

export function middleware(request) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;
  const action = resolveBlogHostAction({ host, pathname });

  if (!action) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;
  if (action.host) {
    url.protocol = action.protocol || "https:";
    url.host = action.host;
    url.port = "";
  }

  if (action.type === "rewrite") {
    return NextResponse.rewrite(url);
  }
  return NextResponse.redirect(url, action.status || 308);
}

export const config = {
  // Run on everything except Next internals, API routes, and static files
  // (anything with a file extension, e.g. .xml/.txt/.png/.ico).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
