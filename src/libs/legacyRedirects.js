/**
 * Pure match helpers for legacy template URLs.
 * Pages call Next's permanentRedirect / notFound based on these results.
 */

export function findLegacyPortfolioMatch(portfolio, id) {
  if (!Array.isArray(portfolio) || id == null || id === "") return null;
  return (
    portfolio.find(
      ({ slug, id: pid }) => slug === id || String(pid) === String(id)
    ) || null
  );
}

export function legacyPortfolioTarget(match) {
  return match?.slug ? `/work/${match.slug}` : null;
}

export function findLegacyCapabilityMatch(capabilities, id) {
  const items = Array.isArray(capabilities)
    ? capabilities
    : capabilities?.items || [];
  if (!items.length || id == null || id === "") return null;
  return (
    items.find(
      (item) =>
        String(item.id) === String(id) ||
        item.slug === id ||
        String(item.slug) === String(id)
    ) || null
  );
}

export function legacyCapabilityTarget(match) {
  return match?.slug ? `/capabilities/${match.slug}` : null;
}

/**
 * Blog-host / apex redirect decisions used by middleware.
 * Returns null when the request should pass through (NextResponse.next).
 */
export function resolveBlogHostAction({ host, pathname }) {
  const BLOG_HOST = "blog.devmohan.in";
  const h = String(host || "")
    .split(":")[0]
    .toLowerCase();
  const path = pathname || "/";

  if (h === BLOG_HOST) {
    if (path === "/blogs" || path.startsWith("/blogs/")) {
      return {
        type: "redirect",
        pathname: path.replace(/^\/blogs/, "") || "/",
        status: 308,
      };
    }
    return {
      type: "rewrite",
      pathname: path === "/" ? "/blogs" : `/blogs${path}`,
    };
  }

  const isLocal =
    h === "localhost" || h === "127.0.0.1" || h.endsWith(".local");
  if (!isLocal && (path === "/blogs" || path.startsWith("/blogs/"))) {
    return {
      type: "redirect",
      host: BLOG_HOST,
      protocol: "https:",
      pathname: path.replace(/^\/blogs/, "") || "/",
      status: 308,
    };
  }

  return null;
}
