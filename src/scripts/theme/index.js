/**
 * Color theme toggle.
 * Dark ("ink") is the default; `html.light` switches to "paper". The class
 * lives on <html> (not <body>) so an inline <head> script can set it before
 * the first paint — see head.njk — which avoids a flash of the wrong theme.
 * The sun/moon icons are swapped purely with CSS (see main.css), so this
 * only toggles the class, persists the choice, and syncs the theme-color meta.
 */
export function themeSwitch() {
  const buttons = document.querySelectorAll(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");
  apply(saved || (prefersDark ? "dark" : "light"));

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const next = document.documentElement.classList.contains("light")
        ? "dark"
        : "light";
      apply(next);
      localStorage.setItem("theme", next);
    }),
  );

  function apply(theme) {
    const isLight = theme === "light";
    document.documentElement.classList.toggle("light", isLight);

    if (themeMeta) {
      const style = getComputedStyle(document.body);
      const color = style
        .getPropertyValue(isLight ? "--paper-bg" : "--ink-bg")
        .trim();
      themeMeta.setAttribute("content", color || (isLight ? "#f1ecf1" : "#17131c"));
    }
  }
}
