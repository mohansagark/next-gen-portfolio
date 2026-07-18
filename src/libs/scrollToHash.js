// Scroll to the element named by a URL hash once it actually exists.
//
// The home page renders its sections client-side (content loads async), so when
// the page is opened directly at a hash — e.g. arriving at devmohan.in/#contact
// from the blog's Contact link — the browser's native hash-scroll fires before
// the target section has mounted and does nothing. smoothScroll() only handles
// clicks on same-page `#` links, not a hash present on load. This polls for the
// target and scrolls to it as soon as it appears, then re-scrolls once after a
// short settle to correct for layout shift from late-loading images above it.
//
// Returns a cancel function (clears any pending timers), or undefined when there
// is nothing to do. Bounded by `attempts` so it never polls forever.
const scrollToHash = (hash, { attempts = 40, interval = 100, settle = 450 } = {}) => {
  if (typeof document === "undefined") return;
  const raw = String(hash || "").replace(/^#/, "");
  if (!raw) return;

  let id;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }

  let pollTimer = null;
  let settleTimer = null;
  const cancel = () => {
    if (pollTimer !== null) clearInterval(pollTimer);
    if (settleTimer !== null) clearTimeout(settleTimer);
  };

  const scroll = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth" });
    // Re-align after content/images above settle the layout.
    settleTimer = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), settle);
    return true;
  };

  if (scroll()) return cancel;

  let tries = 0;
  pollTimer = setInterval(() => {
    tries += 1;
    if (scroll() || tries >= attempts) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }, interval);

  return cancel;
};

export default scrollToHash;
