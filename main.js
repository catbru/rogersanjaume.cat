/* ═══════════════════════════════════════════════════
   Roger Sanjaume i Calvet — main.js
   Scroll-triggered reveal animations
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll reveal ─────────────────────────────────
  // Afegim la classe .reveal a totes les seccions i elements principals
  const selectors = [
    '.hero__title',
    '.servei',
    '.cas',
    '.collaboracions__logos',
    '.contacte__text',
    '.contacte__email',
    '.contacte__xarxes',
    '.section-heading'
  ];

  function addRevealClasses() {
    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, index) {
        el.classList.add('reveal');
        // Stagger delay per donar un efecte seqüencial dins del grup
        el.style.transitionDelay = (index * 0.08) + 's';
      });
    });
  }

  function onIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }

  function initObserver() {
    var options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(onIntersection, options);

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Init ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    addRevealClasses();

    if ('IntersectionObserver' in window) {
      initObserver();
    } else {
      // Fallback: mostra tot directament
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // ── Easter egg: foto mirall ────────────────────────
    var photo = document.querySelector('.hero__photo');
    if (photo) {
      photo.addEventListener('mouseenter', function () {
        photo.classList.toggle('flipped');
      });
    }

    // ── Navbar scroll shadow ──────────────────────────
    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      });
    }

    // ── Hamburger menu ────────────────────────────────
    var navToggle = document.getElementById('navbar-toggle');
    var navLinks = document.getElementById('navbar-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('active');
      });
      
      navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          navToggle.classList.remove('open');
          navLinks.classList.remove('active');
        });
      });
    }

    // ── Servei fold/unfold on mobile ──────────────────
    document.querySelectorAll('.servei__header').forEach(function(header) {
      header.addEventListener('click', function() {
        var icon = header.querySelector('.servei__icon');
        if (icon && window.getComputedStyle(icon).display !== 'none') {
          var servei = header.closest('.servei');
          servei.classList.toggle('open');
        }
      });
    });
  });
})();
