// Initializes color theme switch handler
export async function themeSwitch() {
  const btn = document.querySelector("#theme-switch");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme") || prefersDarkScheme;

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
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

  function setTheme(theme) {
    theme === "light"
      ? document.body.classList.add("light")
      : document.body.classList.remove("light");
    // themeIcon.setAttribute("src", `/assets/icons/${theme}.svg`);
    // themeIcon.setAttribute("alt", `${theme} mode`);
    btn.innerHTML = document.querySelector(`#icon-${theme}`).innerHTML;
    localStorage.setItem("theme", theme);
  }
}
