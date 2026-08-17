document.querySelectorAll('[data-menu-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const drawer = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    drawer.hidden = isExpanded;
  });
});

const header = document.querySelector('[data-sticky]');
const heroElement = document.querySelector('[data-hero]'); // added in Phase 2
if (header && heroElement) {
  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('header--sticky', !entry.isIntersecting);
  }, { threshold: 0 });
  observer.observe(heroElement);
}