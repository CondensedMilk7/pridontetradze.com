import { themeSwitch } from "./theme/index.js";
import { headerOpaque, textGlitchAnimation, initSineWaves } from "./animations/index.js";

function init() {
  const header = document.querySelector(".main-header");

  window.onscroll = function () {
    headerOpaque(header);
  };

  themeSwitch();

  // Sine waves and text animations on home page
  if (location.pathname === "/") {
    textGlitchAnimation();
    initSineWaves(); // Animated waves on home page
  } else {
    // Frozen footer waves on all other pages
    initSineWaves({ canvasId: "footer-sine-waves-canvas", frozen: true });
  }
}

document.addEventListener("DOMContentLoaded", init);
