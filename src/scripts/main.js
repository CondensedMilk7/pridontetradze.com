import { themeSwitch } from "./theme/index.js";

document.addEventListener("DOMContentLoaded", () => {
  themeSwitch();
  initMobileMenu();
  initMailLinks();
});

function initMailLinks() {
  document.querySelectorAll(".mail-link").forEach((link) => {
    const { mailUser, mailHost } = link.dataset;
    if (!mailUser || !mailHost) return;
    link.href = `mailto:${mailUser}@${mailHost}`;
  });
}

// Full-screen hamburger menu (native <dialog> — focus trap + Escape for free).
function initMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const openBtn = document.querySelector("#menu-open");
  if (!menu || !openBtn || typeof menu.showModal !== "function") return;

  const setExpanded = (v) => openBtn.setAttribute("aria-expanded", String(v));
  const open = () => {
    menu.showModal();
    setExpanded(true);
  };
  const close = () => {
    if (menu.open) menu.close();
    setExpanded(false);
  };

  openBtn.addEventListener("click", open);
  document.querySelector("#menu-close")?.addEventListener("click", close);

  // Escape / native close also reset the button state.
  menu.addEventListener("cancel", () => setExpanded(false));
  menu.addEventListener("close", () => setExpanded(false));

  // Close on backdrop click and after choosing a destination.
  menu.addEventListener("click", (e) => {
    if (e.target === menu) close();
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  // Close if the viewport grows past the mobile breakpoint while open.
  window
    .matchMedia("(min-width: 901px)")
    .addEventListener("change", (e) => {
      if (e.matches && menu.open) close();
    });
}
