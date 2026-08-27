/* ============================================
   AGÊNCIA YELLOW — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile Menu Toggle ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header__nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll Reveal ---------- */
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
      el.style.transitionDelay = `${i % 4 * 0.1}s`;
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion, make everything visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---------- Header scroll effect ---------- */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.style.background = 'rgba(7, 7, 9, 0.96)';
      header.style.borderBottomColor = 'rgba(123, 45, 232, 0.3)';
    } else {
      header.style.background = 'rgba(7, 7, 9, 0.85)';
      header.style.borderBottomColor = 'rgba(123, 45, 232, 0.18)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

