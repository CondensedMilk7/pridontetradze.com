/*
* Cat Gallery Modal Functionality
*/

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("cat-modal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".modal-close");
  const catCards = document.querySelectorAll(".cat-card");

  catCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector("img");

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside the modal content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  const style = document.createElement("style");
  style.textContent = `
        .cat-card {
            scroll-margin-top: 2rem;
        }
    `;
  document.head.appendChild(style);
});
