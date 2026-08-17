const SCROLL_ANIMATION_TRIGGER = 'scroll-trigger';
const SCROLL_ANIMATION_OFFSCREEN = 'scroll-trigger--offscreen';

function initializeScrollAnimations(rootEl = document) {
  const elements = Array.from(rootEl.querySelectorAll(`.${SCROLL_ANIMATION_TRIGGER}`));
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(SCROLL_ANIMATION_OFFSCREEN);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -100px 0px' });

  elements.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initializeScrollAnimations());
} else {
  initializeScrollAnimations();
}

if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (e) => initializeScrollAnimations(e.target));
}