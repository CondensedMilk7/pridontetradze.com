// Turns the header background opaque once scrolled
export function headerOpaque(header) {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    header.classList.add("opaque");
  } else {
    header.classList.remove("opaque");
  }
}

export function textGlitchAnimation() {
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
