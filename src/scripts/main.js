const header = document.querySelector(".main-header");

window.onscroll = function () {
  headerOpaque(header);
};

themeSwitch();

// Particle animations on home page
if (location.pathname === "/") {
  particlesJS.load("particles-js", "assets/particles.json", function () {});
}

// Turns the header background opaque once scrolled
function headerOpaque(header) {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    header.classList.add("opaque");
  } else {
    header.classList.remove("opaque");
  }
}

// Initializes color theme switch handler
function themeSwitch() {
  const btn = document.querySelector("#theme-switch");
  const themeIcon = document.querySelector("#theme-icon");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

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
    themeIcon.setAttribute("src", `/assets/icons/${theme}.svg`);
    themeIcon.setAttribute("alt", `${theme} mode`);
    localStorage.setItem("theme", theme);
  }
}
