/**
 * Palette lab (dev-only) — swap the raw palette tokens at runtime.
 *
 * Loaded only when PALETTE_LAB=1 (env-gated in head.njk / .eleventy.js), so it
 * never reaches production and is NOT part of the main.js bundle. Mirrors the
 * theme toggle: the active palette is a `data-palette` attribute on <html>,
 * applied pre-paint here (this script is inlined in <head>) to avoid a flash,
 * then persisted to localStorage. "" / "ink" means the default palette.
 */
(function () {
  const KEY = "palette";
  const root = document.documentElement;

  // Pre-paint: apply the saved palette before the body renders (no body access
  // here — the element may not exist yet).
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && saved !== "ink") root.setAttribute("data-palette", saved);
  } catch (e) {}

  // Keep the browser-chrome color matching the previewed palette's background.
  function syncThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta || !document.body) return;
    const bg = getComputedStyle(document.body).getPropertyValue("--bg").trim();
    if (bg) meta.setAttribute("content", bg);
  }

  function apply(value) {
    if (value && value !== "ink") root.setAttribute("data-palette", value);
    else root.removeAttribute("data-palette");

    const active = root.getAttribute("data-palette") || "";
    document.querySelectorAll(".palette-lab__btn").forEach((btn) => {
      const own = btn.dataset.palette || "";
      btn.setAttribute("aria-pressed", String(own === active));
    });
    syncThemeColor();
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply(root.getAttribute("data-palette") || "");

    document.querySelectorAll(".palette-lab__btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const value = btn.dataset.palette || "";
        apply(value);
        try {
          if (value && value !== "ink") localStorage.setItem(KEY, value);
          else localStorage.removeItem(KEY);
        } catch (e) {}
      }),
    );
  });
})();
