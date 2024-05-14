// Initializes color theme switch handler
export async function themeSwitch() {
  const btn = document.querySelector("#theme-switch");
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const preferredTheme = prefersDarkScheme ? "dark" : "light";
  const currentTheme = localStorage.getItem("theme") || preferredTheme;

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const style = getComputedStyle(document.body);
  const lightThemeColor = style.getPropertyValue("--bg-light");
  const darkThemeColor = style.getPropertyValue("--bg-dark");

  // TODO: Make utterances switch theme
  // const comments = document.querySelector("#comments-section");

  if (currentTheme === "light") {
    setTheme("light");
  } else {
    setTheme("dark");
  }

  btn.addEventListener("click", function () {
    document.body.classList.add("bg-transition");
    if (document.body.classList.contains("light")) {
      setTheme("dark", true);
    } else {
      setTheme("light", true);
    }
  });

  function setTheme(theme, save = false) {
    if (theme === "light") {
      document.body.classList.add("light");
      themeMeta.setAttribute("content", lightThemeColor);
    } else {
      document.body.classList.remove("light");
      themeMeta.setAttribute("content", darkThemeColor);
    }
    btn.innerHTML = document.querySelector(`#icon-${theme}`).innerHTML;
    if (save) {
      localStorage.setItem("theme", theme);
    }
  }
}
