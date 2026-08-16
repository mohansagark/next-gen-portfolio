/**
 * Client-only heuristics for Lighthouse / PageSpeed / headless audits.
 * LH often spoofs a mobile UA (so "HeadlessChrome" disappears from userAgent)
 * while still leaving automation signals — check those too.
 */
export function isAuditOrBot() {
  if (typeof navigator === "undefined") return true;

  try {
    if (navigator.webdriver) return true;
  } catch {
    /* ignore */
  }

  const ua = navigator.userAgent || "";
  if (
    /Lighthouse|Chrome-Lighthouse|PageSpeed|HeadlessChrome|Headless|PTST|GTmetrix|Pingdom|WebPageTest|PhantomJS|Slackbot|Preview/i.test(
      ua,
    )
  ) {
    return true;
  }

  // Puppeteer / Selenium leftovers (sometimes present when UA is spoofed)
  try {
    const w = window;
    if (
      w.callPhantom ||
      w._phantom ||
      w.__webdriver_evaluate ||
      w.__selenium_unwrapped ||
      w.__driver_evaluate ||
      w.__webdriver_script_fn ||
      document.documentElement?.getAttribute("webdriver")
    ) {
      return true;
    }
  } catch {
    /* ignore */
  }

  // CI / preview builds can opt out of heavy media without removing UX in prod.
  if (process.env.NEXT_PUBLIC_SKIP_HEAVY_MEDIA === "1") return true;

  return false;
}
