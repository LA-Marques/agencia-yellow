/* ============================================
   YELLOW MARKETING DIGITAL — Haute Couture System JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile Menu Drawer ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header__nav');

  function closeMobileMenu() {
    if (toggle && nav && nav.classList.contains('open')) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function openMobileMenu() {
    if (toggle && nav) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (nav.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ---------- Scroll Reveal Animations ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.1}s`;
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---------- Bento Box Spotlight Mouse Tracking ---------- */
  const interactiveCards = document.querySelectorAll('.post-card, .benefit-card, .method-step, .cta-final__card, .hero__photo-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ---------- Header Backdrop on Scroll ---------- */
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      header.style.background = 'rgba(9, 9, 11, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
    } else {
      header.style.background = 'rgba(9, 9, 11, 0.85)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ---------- Smooth Scroll with Header Offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = window.innerWidth <= 768 ? 72 : 80;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ---------- Current Year in Footer ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
