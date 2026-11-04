/**
 * AYPDA - Main Application Core Script
 * Handles preloader, navigation, custom cursor, back-to-top, and forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Handling
  const preloader = document.getElementById('site-preloader');
  const progressBar = document.querySelector('.preloader-progress-bar');
  
  if (preloader) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 15;
      if (progress > 100) progress = 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 300);
      }
    }, 60);
  }

  // 2. Sticky Header & Scroll Progress
  const header = document.querySelector('.site-header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Header Blur on Scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Progress Indicator
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 4. Custom Interactive Desktop Cursor
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 991) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth trailing ring loop
    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card-3d-tilt, .btn-circular-action, .gallery-item-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
      });
    });
  }

  // 5. Contact Form Submission & Validation
  const contactForm = document.getElementById('aypda-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      
      let isValid = true;

      // Validate inputs
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (!input || !input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#FF5A5F';
        } else {
          input.style.borderColor = 'rgba(22, 199, 162, 0.25)';
        }
      });

      // Simple email validation regex
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.style.borderColor = '#FF5A5F';
        }
      }

      if (isValid) {
        // Trigger celebratory confetti if library is available
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#1769FF', '#16C7A2', '#00F0FF', '#ffffff']
          });
        }

        // Show Toast Notification
        showToast(contactForm.dataset.successMsg || 'Thank you! Your message has been sent successfully.');
        contactForm.reset();
      } else {
        showToast(contactForm.dataset.errorMsg || 'Please fill in all required fields properly.');
      }
    });
  }
});

// Toast notification helper
function showToast(message) {
  let toast = document.querySelector('.toast-feedback');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-feedback';
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
