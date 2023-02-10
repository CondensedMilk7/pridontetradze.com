function init() {
  const header = document.querySelector(".main-header");

  window.onscroll = function () {
    headerOpaque(header);
  };

  themeSwitch();

  textGlitchAnimation();

  // Particle animations on home page
  if (location.pathname === "/") {
    particlesJS.load("particles-js", "assets/particles.json", function () {});
  }
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
    themeIcon.setAttribute("src", `/assets/icons/${theme}.svg`);
    themeIcon.setAttribute("alt", `${theme} mode`);
    localStorage.setItem("theme", theme);
  }
}

function textGlitchAnimation() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const elements = document.querySelectorAll(".text-glitch");
  const intervals = [];

  elements.forEach(() => {
    intervals.push(null);
  });

  elements.forEach((e, i) => {
    e.onmouseover = (event) => {
      let iteration = 0;

      clearInterval(intervals[i]);

      intervals[i] = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(intervals[i]);
        }

        iteration += 1 / 3;
      }, 30);
    };
  });
}

init();
