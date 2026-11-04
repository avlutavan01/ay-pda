/**
 * AYPDA - Advanced 3D Motion & GSAP Animation Engine
 * Features: 3D Mouse Parallax, Cinematic Hero Sequence, ScrollTrigger, Stat Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.innerWidth < 768
    });
  }

  // 1. GSAP Hero Section Cinematic Entrance
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (document.querySelector('.hero-section')) {
      heroTl
        .from('.hero-subtitle-tag', { opacity: 0, y: -20, duration: 0.8, delay: 0.3 })
        .from('.hero-oversized-title .name-highlight', { opacity: 0, x: -40, duration: 1, stagger: 0.2 }, '-=0.5')
        .from('.hero-oversized-title .pda-highlight', { opacity: 0, scale: 0.8, duration: 0.8 }, '-=0.6')
        .from('.portrait-wrapper-3d', { opacity: 0, scale: 0.9, y: 30, duration: 1.2 }, '-=0.8')
        .from('.hero-bio-card', { opacity: 0, x: 40, duration: 1 }, '-=0.9')
        .from('.btn-circular-action', { opacity: 0, scale: 0, rotation: -45, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
        .from('.hero-actions-group', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.floating-social-link', { opacity: 0, x: -25, stagger: 0.1, duration: 0.6 }, '-=0.4');
    }

    // ScrollTrigger Parallax on Background Blobs
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.ambient-blob-1', {
        y: 200,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        }
      });

      gsap.to('.ambient-blob-2', {
        y: -180,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2
        }
      });
    }
  }

  // 2. 3D Mouse Parallax Effect on Hero Portrait
  const heroSection = document.querySelector('.hero-section');
  const portrait3D = document.querySelector('.portrait-main-img');
  const glowPlate = document.querySelector('.portrait-glow-backplate');
  const bioCard = document.querySelector('.hero-bio-card');

  if (heroSection && portrait3D && window.innerWidth > 991) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate tilt degrees
      const rotateX = (-y / rect.height) * 15;
      const rotateY = (x / rect.width) * 15;
      const transX = (x / rect.width) * 20;
      const transY = (y / rect.height) * 20;

      portrait3D.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 20px)`;
      
      if (glowPlate) {
        glowPlate.style.transform = `translate3d(${-transX * 0.5}px, ${-transY * 0.5}px, 0)`;
      }

      if (bioCard) {
        bioCard.style.transform = `perspective(1000px) rotateX(${(-rotateX * 0.4).toFixed(2)}deg) rotateY(${(-rotateY * 0.4).toFixed(2)}deg)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      portrait3D.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      if (glowPlate) glowPlate.style.transform = 'translate3d(0, 0, 0)';
      if (bioCard) bioCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. 3D Tilt Initialization for Interactive Cards
  const tiltCards = document.querySelectorAll('.card-3d-tilt');
  if (tiltCards.length > 0 && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(tiltCards, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02
    });
  }

  // 4. Animated Numerical Stat Counters
  const counters = document.querySelectorAll('.counter-value');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const stepIncrement = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepIncrement;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  }

  // Trigger counters on visibility
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }
});
