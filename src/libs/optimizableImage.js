// next/image only optimizes same-origin paths and hosts listed in
// next.config.mjs's images.remotePatterns (currently admin.devmohan.in).
// Any other absolute URL (e.g. a scraped blog cover from an arbitrary host)
// throws at request time if handed to <Image>. CMS/local content should
// always go through <Image> for auto-sizing; genuinely unpredictable
// external sources fall back to a plain <img>.
const OPTIMIZABLE_HOSTS = ["admin.devmohan.in"];

export function isOptimizableImageSrc(src) {
  if (typeof src !== "string" || !src) return false;
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const { hostname } = new URL(src, "https://placeholder.invalid");
    return OPTIMIZABLE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}
