/**
 * Header fixo: logo, menu, pesquisa e carrinho.
 */
Ibiza.Header = (() => {
  const { icon } = Ibiza;
  let root;

  const navItems = () => [
    { label: 'Início', href: '#/', match: (p) => p === '/' },
    { label: 'Catálogo', href: '#/catalogo', match: (p, q) => p === '/catalogo' && !q.get('categoria') },
    ...Ibiza.categories.map((c) => ({
      label: c.shortName,
      href: `#/catalogo?categoria=${c.id}`,
      match: (p, q) => p === '/catalogo' && q.get('categoria') === c.id,
    })),
  ];

  function searchForm(id) {
    return `
      <form class="search-form" role="search" data-search-form>
        <label class="sr-only" for="${id}">Buscar camisas</label>
        <input id="${id}" class="search-form__input" type="search" name="q" placeholder="Buscar time, seleção ou camisa…" autocomplete="off" />
        <button class="search-form__submit" type="submit" aria-label="Buscar">${icon('search', { size: 18 })}</button>
      </form>`;
  }

  function render() {
    return `
      <header class="site-header" data-header>
        <div class="container site-header__inner">
          <button class="icon-btn site-header__menu-btn" type="button" aria-label="Abrir menu" data-open-menu>
            ${icon('menu')}
          </button>

          <a class="site-header__logo" href="#/" aria-label="${Ibiza.config.storeName} — página inicial">
            <img src="assets/img/wordmark.png" alt="${Ibiza.config.storeName}" width="590" height="190" />
          </a>

          <nav class="site-header__nav" aria-label="Principal">
            ${navItems()
              .map((item) => `<a class="nav-link" href="${item.href}" data-nav-link>${item.label}</a>`)
              .join('')}
          </nav>

          <div class="site-header__actions">
            <div class="site-header__search">${searchForm('header-search')}</div>
            <button class="icon-btn site-header__search-btn" type="button" aria-label="Abrir busca" aria-expanded="false" data-toggle-search>
              ${icon('search')}
            </button>
            <button class="icon-btn cart-btn" type="button" aria-label="Abrir carrinho" data-open-cart>
              ${icon('cart')}
              <span class="cart-btn__count" data-cart-count hidden>0</span>
            </button>
          </div>
        </div>

        <div class="site-header__mobile-search" data-mobile-search>
          <div class="container">${searchForm('mobile-search')}</div>
        </div>
      </header>
      <div class="header-spacer" aria-hidden="true"></div>`;
  }

  function updateCount(animate = false) {
    const count = Ibiza.cart.count();
    const badge = root.querySelector('[data-cart-count]');
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.hidden = count === 0;
    root.querySelector('[data-open-cart]').setAttribute('aria-label', `Abrir carrinho (${count} ${count === 1 ? 'item' : 'itens'})`);
    if (animate && count > 0) {
      badge.classList.remove('is-bumping');
      void badge.offsetWidth;
      badge.classList.add('is-bumping');
    }
  }

  /** Destaca o link ativo e sincroniza o campo de busca com a rota. */
  function setRoute(path, query) {
    const items = navItems();
    root.querySelectorAll('[data-nav-link]').forEach((link, i) => {
      link.classList.toggle('is-active', items[i].match(path, query));
    });
    const term = path === '/catalogo' ? query.get('busca') || '' : '';
    root.querySelectorAll('.search-form__input').forEach((input) => {
      if (document.activeElement !== input) input.value = term;
    });
    closeMobileSearch();
  }

  function closeMobileSearch() {
    root.querySelector('[data-mobile-search]').classList.remove('is-open');
    root.querySelector('[data-toggle-search]').setAttribute('aria-expanded', 'false');
  }

  function bind() {
    root.querySelector('[data-open-cart]').addEventListener('click', () => Ibiza.CartDrawer.open());
    root.querySelector('[data-open-menu]').addEventListener('click', () => Ibiza.MobileMenu.open());

    root.querySelector('[data-toggle-search]').addEventListener('click', (e) => {
      const panel = root.querySelector('[data-mobile-search]');
      const open = panel.classList.toggle('is-open');
      e.currentTarget.setAttribute('aria-expanded', String(open));
      if (open) setTimeout(() => panel.querySelector('input').focus(), 150);
    });

    root.querySelectorAll('[data-search-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = form.q.value.trim();
        form.q.blur();
        window.location.hash = q ? `#/catalogo?busca=${encodeURIComponent(q)}` : '#/catalogo';
      });
    });

    const header = root.querySelector('[data-header]');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    window.addEventListener('cart:change', () => updateCount(true));
  }

  function mount(el) {
    root = el;
    root.innerHTML = render();
    bind();
    updateCount();
  }

  /** Posição do ícone do carrinho — usada na animação de "voar até o carrinho". */
  function cartTarget() {
    return root.querySelector('[data-open-cart]');
  }

  return { mount, setRoute, cartTarget };
})();
