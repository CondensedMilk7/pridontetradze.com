/**
 * Sine Wave Animation
 * Creates topographic map-like sine waves in the bottom 20% of the screen
 */

export function initSineWaves(options = {}) {
  const { canvasId = "sine-waves-canvas", frozen = false } = options;
  
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let isVisible = true;

  const config = {
    waveCount: 12,
    baseAmplitude: 30,
    frequency: 0.01,
    speed: 0.0005,
    lineWidth: 1.5,
    opacity: 0.6,
    amplitudeVariation: 30,
    step: 5, // Calculate every 5th pixel
  };

  let offset = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getWaveColor() {
    const isLight = document.body.classList.contains("light");
    return isLight ? "rgba(32, 32, 30, 0.3)" : "rgba(223, 233, 243, 0.15)";
  }

  function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bottomAreaStart = canvas.height * 0.8;
    const bottomAreaHeight = canvas.height * 0.2;

    ctx.strokeStyle = getWaveColor();
    ctx.lineWidth = config.lineWidth;
    ctx.globalAlpha = config.opacity;

    for (let i = 0; i < config.waveCount; i++) {
      ctx.beginPath();

      const yPosition =
        bottomAreaStart + (bottomAreaHeight / (config.waveCount + 1)) * (i + 1);

      const amplitude =
        config.baseAmplitude + Math.sin(i * 0.5) * config.amplitudeVariation;

      const phaseOffset = i * 0.5;

      for (let x = 0; x <= canvas.width; x += config.step) {
        const y =
          yPosition +
          Math.sin(x * config.frequency + offset + phaseOffset) * amplitude +
          Math.sin(x * config.frequency * 2 + offset * 1.5 + phaseOffset) *
            (amplitude * 0.3);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }
  }

  function animate() {
    // Stop if frozen or off-screen
    if (!isVisible && !frozen) return; 

    offset += config.speed;
    drawWaves();
    animationId = requestAnimationFrame(animate);
  }

  // Intersection Observer to pause when off-screen
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      
      if (isVisible && !frozen && !animationId) {
        // Resume animation if visible and not currently running
        animate();
      } else if (!isVisible && animationId) {
        // Stop animation loop to save resources
        cancelAnimationFrame(animationId);
        animationId = null; 
      }
    });
  });

  resizeCanvas();
  
  visibilityObserver.observe(canvas);

  if (frozen) {
    drawWaves();
  } else {
    animate();
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    if (frozen || !animationId) {
      drawWaves();
    }
  });

  const observer = new MutationObserver(() => {
    drawWaves();
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener("resize", resizeCanvas);
    visibilityObserver.disconnect();
    observer.disconnect();
  };
}