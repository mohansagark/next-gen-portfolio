/** Best-effort per-isolate throttle (helps on a warm instance; not a global limiter). */
export const RATE_WINDOW_MS = 60_000;
export const RATE_MAX = 5;

/**
 * Create an isolated rate limiter so tests (and multiple isolates) do not share state.
 * @param {{ windowMs?: number, max?: number }} [opts]
 */
export function createRateLimiter(opts = {}) {
  const windowMs = opts.windowMs ?? RATE_WINDOW_MS;
  const max = opts.max ?? RATE_MAX;
  const recentByIp = new Map();

  return function allowRequest(ip) {
    const now = Date.now();
    const cutoff = now - windowMs;
    const prev = recentByIp.get(ip) || [];
    const recent = prev.filter((t) => t > cutoff);
    if (recent.length >= max) {
      recentByIp.set(ip, recent);
      return false;
    }
    recent.push(now);
    recentByIp.set(ip, recent);
    return true;
  };
}

/** Shared limiter used by the contact API route. */
export const allowRequest = createRateLimiter();

export function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") || "unknown";
}
