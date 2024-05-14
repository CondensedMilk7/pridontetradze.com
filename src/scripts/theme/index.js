// Initializes color theme switch handler
export async function themeSwitch() {
  const btn = document.querySelector("#theme-switch");
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const preferredTheme = prefersDarkScheme ? "dark" : "light";
  const currentTheme = localStorage.getItem("theme") || preferredTheme;

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
    theme === "light"
      ? document.body.classList.add("light")
      : document.body.classList.remove("light");
    btn.innerHTML = document.querySelector(`#icon-${theme}`).innerHTML;
    if (save) {
      localStorage.setItem("theme", theme);
    }
  }
}
