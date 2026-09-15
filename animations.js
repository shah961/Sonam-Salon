/**
 * SANAM SALON — ANIMATIONS & AMBIENT CANVAS CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Canvas Ambient Effect if canvas exists and motion is allowed
  initHeroCanvas(prefersReducedMotion);

  // Initialize GSAP ScrollTrigger Animations if library is loaded and motion allowed
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  } else {
    // Fallback reveal for browsers without GSAP or when reduced motion is requested
    document.querySelectorAll('.js-reveal, .js-reveal-hero, .js-reveal-hero-img').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});

/* Canvas Ambient Particle Effect */
function initHeroCanvas(reducedMotion) {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || reducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 30), 25);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedY: Math.random() * 0.3 + 0.1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.fill();

      p.y -= p.speedY;
      if (p.y < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

/* GSAP Animations Setup */
function initGSAPAnimations() {
  // Hero Entrance
  gsap.from('.js-reveal-hero', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });

  gsap.from('.js-reveal-hero-img', {
    duration: 1.2,
    x: 40,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });

  // Section Reveal Elements
  const revealElements = document.querySelectorAll('.js-reveal');
  revealElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 25,
      opacity: 0,
      ease: 'power2.out'
    });
  });
}
