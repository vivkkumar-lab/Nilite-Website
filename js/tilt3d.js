/**
 * NILITE EXPORTS - INTERACTIVE 3D TILT & PARALLAX ENGINE
 * Zero-dependency, 60fps hardware-accelerated 3D depth and glare
 */

class Interactive3DEngine {
  constructor() {
    this.maxTilt = 8; // degrees
    this.perspective = 1000;
    this.init();
  }

  init() {
    this.bindTiltCards();
    this.bindHeroParallax();

    // Re-bind when catalog filters or dynamic items change
    const observer = new MutationObserver(() => {
      this.bindTiltCards();
    });

    const productsContainer = document.getElementById("products-container");
    if (productsContainer) {
      observer.observe(productsContainer, { childList: true });
    }
  }

  bindTiltCards() {
    const cards = document.querySelectorAll(
      ".tilt-card-3d, .cert-card-featured, .product-card, .port-card, .rfq-form-card"
    );

    cards.forEach(card => {
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = "true";
      card.classList.add("tilt-card-3d");

      let isHovered = false;
      let animationFrameId = null;
      let targetRotateX = 0;
      let targetRotateY = 0;
      let currentRotateX = 0;
      let currentRotateY = 0;

      const updateTransform = () => {
        if (!isHovered) {
          card.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          return;
        }

        // Smooth interpolation
        currentRotateX += (targetRotateX - currentRotateX) * 0.15;
        currentRotateY += (targetRotateY - currentRotateY) * 0.15;

        card.style.transform = `perspective(${this.perspective}px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        animationFrameId = requestAnimationFrame(updateTransform);
      };

      card.addEventListener("mouseenter", () => {
        isHovered = true;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(updateTransform);
      });

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetRotateX = ((y - centerY) / centerY) * -this.maxTilt;
        targetRotateY = ((x - centerX) / centerX) * this.maxTilt;

        // Update glare coordinates
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      card.addEventListener("mouseleave", () => {
        isHovered = false;
        targetRotateX = 0;
        targetRotateY = 0;
        card.style.transition = "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)";
        card.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        setTimeout(() => {
          card.style.transition = "";
        }, 400);
      });
    });
  }

  bindHeroParallax() {
    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");
    const floatingCard = document.querySelector(".hero-floating-card");
    const floatingStat = document.querySelector(".hero-floating-stat-pill");

    if (!hero || !heroVisual) return;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltFrameX = yPercent * -10;
      const tiltFrameY = xPercent * 10;

      if (heroVisual) {
        heroVisual.style.transform = `perspective(1200px) rotateX(${tiltFrameX}deg) rotateY(${tiltFrameY}deg)`;
      }

      if (floatingCard) {
        floatingCard.style.transform = `translate3d(${xPercent * 25}px, ${yPercent * 25}px, 60px)`;
      }

      if (floatingStat) {
        floatingStat.style.transform = `translate3d(${xPercent * -30}px, ${yPercent * -30}px, 75px)`;
      }
    });

    hero.addEventListener("mouseleave", () => {
      if (heroVisual) {
        heroVisual.style.transition = "transform 0.6s ease";
        heroVisual.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
        setTimeout(() => { heroVisual.style.transition = ""; }, 600);
      }
      if (floatingCard) {
        floatingCard.style.transition = "transform 0.6s ease";
        floatingCard.style.transform = "translate3d(0, 0, 55px)";
        setTimeout(() => { floatingCard.style.transition = ""; }, 600);
      }
      if (floatingStat) {
        floatingStat.style.transition = "transform 0.6s ease";
        floatingStat.style.transform = "translate3d(0, 0, 70px)";
        setTimeout(() => { floatingStat.style.transition = ""; }, 600);
      }
    });
  }
}

// Auto-instantiate on load
document.addEventListener("DOMContentLoaded", () => {
  window.interactive3DEngine = new Interactive3DEngine();
});
