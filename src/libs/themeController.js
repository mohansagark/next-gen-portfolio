/** Soft theme change — prefers View Transitions, falls back to a brief CSS fade. */
export function setColorTheme(mode) {
  const html = document.documentElement;
  if (!html) return;

  const nextDark = mode === "dark";
  const isDark = html.classList.contains("dark");
  if (nextDark === isDark) {
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    return;
  }

  const apply = () => {
    html.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const reduce = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  if (!reduce && typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
    return;
  }

  if (!reduce) {
    html.classList.add("theme-animating");
    window.setTimeout(() => html.classList.remove("theme-animating"), 700);
  }
  apply();
}

const themeController = () => {
  const html = document.querySelector("html");
  if (!html) return;

  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    html.classList.remove("dark");
  } else if (saved === "dark") {
    html.classList.add("dark");
  }

  // Delegate so toggles inside the mobile sidebar (mounted later) still work
  if (document.documentElement.dataset.themeControllerBound === "1") return;
  document.documentElement.dataset.themeControllerBound = "1";

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(".theme-controller");
    if (!toggle) return;

    const next = html.classList.contains("dark") ? "light" : "dark";
    setColorTheme(next);
  });
};

export default themeController;
