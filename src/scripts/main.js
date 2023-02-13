import { themeSwitch } from "./theme/index.js";
import { headerOpaque, textGlitchAnimation } from "./animations/index.js";

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

init();
