import { themeSwitch } from "./theme/index.js";
import { headerOpaque, textGlitchAnimation } from "./animations/index.js";

function init() {
  const header = document.querySelector(".main-header");

  window.onscroll = function () {
    headerOpaque(header);
  };

  themeSwitch();

  // Particle and text animations on home page
  if (location.pathname === "/") {
    textGlitchAnimation();
    particlesJS.load("particles-js", "assets/particles.json", function () {});
  }
}

document.addEventListener("DOMContentLoaded", init);
