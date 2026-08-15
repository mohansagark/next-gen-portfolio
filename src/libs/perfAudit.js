/** Build-time flag — set only on the CI Lighthouse job (`NEXT_PUBLIC_SKIP_HEAVY_MEDIA=1`). */
export function isPerfAuditBuild() {
  return process.env.NEXT_PUBLIC_SKIP_HEAVY_MEDIA === "1";
}
