/**
 * Menu lateral para celular.
 */
Ibiza.MobileMenu = (() => {
  const { icon } = Ibiza;
  let root;
  let lastFocus;

  function render() {
    const categories = Ibiza.categories
      .map(
        (c) => `
          <a class="mobile-menu__link mobile-menu__link--sub" href="#/catalogo?categoria=${c.id}">
            <span>${c.name}</span>${icon('chevronRight', { size: 18 })}
          </a>`
      )
      .join('');

    return `
      <div class="overlay" data-menu-overlay></div>
      <aside class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" data-menu aria-hidden="true">
        <div class="mobile-menu__head">
          <img class="mobile-menu__logo" src="assets/img/wordmark.png" alt="${Ibiza.config.storeName}" />
          <button class="icon-btn icon-btn--light" type="button" aria-label="Fechar menu" data-close-menu>${icon('close')}</button>
        </div>
        <nav class="mobile-menu__nav" aria-label="Menu mobile">
          <a class="mobile-menu__link" href="#/"><span>Início</span>${icon('chevronRight', { size: 18 })}</a>
          <a class="mobile-menu__link" href="#/catalogo"><span>Catálogo completo</span>${icon('chevronRight', { size: 18 })}</a>
          <p class="mobile-menu__label">Categorias</p>
          ${categories}
          <p class="mobile-menu__label">Minha compra</p>
          <a class="mobile-menu__link" href="#/carrinho"><span>Carrinho</span>${icon('cart', { size: 18 })}</a>
        </nav>
        <p class="mobile-menu__foot">${Ibiza.config.tagline}</p>
      </aside>`;
  }

  function open() {
    lastFocus = document.activeElement;
    root.querySelector('[data-menu]').setAttribute('aria-hidden', 'false');
    root.classList.add('is-open');
    document.body.classList.add('no-scroll');
    setTimeout(() => root.querySelector('[data-close-menu]').focus(), 50);
  }

  function close() {
    if (!root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    root.querySelector('[data-menu]').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function mount(el) {
    root = el;
    root.className = 'mobile-menu-root';
    root.innerHTML = render();
    root.querySelector('[data-menu-overlay]').addEventListener('click', close);
    root.querySelector('[data-close-menu]').addEventListener('click', close);
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }

  return { mount, open, close };
})();
