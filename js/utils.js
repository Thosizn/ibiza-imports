/**
 * Funções utilitárias compartilhadas.
 */
Ibiza.utils = (() => {
  const currencyFormatter = new Intl.NumberFormat(Ibiza.config.locale, {
    style: 'currency',
    currency: Ibiza.config.currency,
  });

  /** Formata um preço. Retorna "Preço em breve" quando não definido. */
  function formatPrice(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) return 'Preço em breve';
    return currencyFormatter.format(value);
  }

  function hasPrice(value) {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  /** Escapa texto para inserção segura em HTML. */
  function escape(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Remove acentos e deixa minúsculo — usado na busca. */
  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim();
  }

  /** Converte uma string HTML em elemento DOM. */
  function html(markup) {
    const template = document.createElement('template');
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  }

  function sortSizes(sizes) {
    const order = Ibiza.config.sizeOrder;
    return [...(sizes || [])].sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }

  function productUrl(product) {
    return `#/produto/${encodeURIComponent(product.id)}`;
  }

  function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Revela elementos `.reveal` suavemente conforme entram na tela. */
  let revealObserver;
  function observeReveal(root = document) {
    const items = root.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
    }
    items.forEach((el) => revealObserver.observe(el));
  }

  return {
    formatPrice,
    hasPrice,
    escape,
    normalize,
    html,
    sortSizes,
    productUrl,
    debounce,
    prefersReducedMotion,
    observeReveal,
  };
})();
