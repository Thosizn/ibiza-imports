/**
 * Página inicial: hero, destaques, categorias e chamada para o catálogo.
 */
Ibiza.pages = Ibiza.pages || {};

Ibiza.pages.home = (() => {
  const { icon, config } = Ibiza;

  function hero() {
    return `
      <section class="hero">
        <div class="hero__stripes" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="hero__sun" aria-hidden="true"></div>
        <div class="container hero__inner">
          <div class="hero__content">
            <p class="eyebrow eyebrow--light hero__eyebrow">${icon('ball', { size: 16 })} Camisas de time importadas</p>
            <h1 class="hero__title">
              Vista o manto.<br />
              <span class="text-accent">Viva o jogo.</span>
            </h1>
            <p class="hero__text">
              Camisas dos clubes brasileiros, gigantes internacionais e seleções do mundo inteiro — selecionadas para quem leva o futebol a sério.
            </p>
            <div class="hero__actions">
              ${Ibiza.Button({ label: 'Ver catálogo', href: '#/catalogo', variant: 'primary', size: 'lg', icon: 'arrowRight' })}
              ${Ibiza.Button({ label: 'Categorias', variant: 'ghost-light', size: 'lg', attrs: 'data-scroll-to="categorias"' })}
            </div>
            <ul class="hero__chips">
              ${Ibiza.categories
                .map((c) => `<li><a href="#/catalogo?categoria=${c.id}">${c.shortName}</a></li>`)
                .join('')}
            </ul>
          </div>

          <div class="hero__visual">
            <div class="hero__ring" aria-hidden="true"></div>
            <img class="hero__logo" src="assets/img/logo.jpg" alt="${config.storeName} — ${config.tagline}" width="758" height="751" />
          </div>
        </div>
        <div class="hero__scroll" aria-hidden="true"><span></span></div>
      </section>`;
  }

  function highlights() {
    const items = [
      { icon: 'globe', title: 'Modelos importados', text: 'Camisas de clubes e seleções de todo o mundo.' },
      { icon: 'shirt', title: 'Do torcedor ao colecionador', text: 'Modelos atuais e clássicos para vestir a paixão.' },
      { icon: 'chat', title: 'Atendimento próximo', text: 'Tire suas dúvidas antes e depois da compra.' },
    ];
    return `
      <section class="highlights">
        <div class="container highlights__grid">
          ${items
            .map(
              (it, i) => `
              <div class="highlight reveal" style="--delay:${i * 80}ms">
                <span class="highlight__icon">${icon(it.icon, { size: 22 })}</span>
                <div>
                  <h3 class="highlight__title">${it.title}</h3>
                  <p class="highlight__text">${it.text}</p>
                </div>
              </div>`
            )
            .join('')}
        </div>
      </section>`;
  }

  /** Card "Ver catálogo completo", usado para completar a grade de destaques. */
  function catalogTile(index) {
    const total = Ibiza.catalog.all().length;
    return `
      <a class="catalog-tile reveal" style="--delay:${(index % 4) * 70}ms" href="#/catalogo">
        <span class="catalog-tile__stripes" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="catalog-tile__count">${total}</span>
        <span class="catalog-tile__label">camisas no catálogo</span>
        <span class="catalog-tile__cta">Ver todas ${icon('arrowRight', { size: 18 })}</span>
      </a>`;
  }

  /**
   * Destaques em 3 ou 4 colunas. Com quantidade ímpar, completa com o card
   * "Ver catálogo" para não sobrar espaço vazio no celular (2 por linha).
   */
  function featuredGrid(products) {
    const cards = products.map((p, i) => Ibiza.ProductCard(p, { index: i }));
    for (let i = products.length; i < 3; i++) cards.push(Ibiza.PlaceholderCard({ index: i }));
    if (cards.length % 2) cards.push(catalogTile(cards.length));
    const cols = Math.min(cards.length, 4);
    return `<div class="product-grid product-grid--cols-${cols}">${cards.join('')}</div>`;
  }

  function featured() {
    const products = Ibiza.catalog.featured(8);
    const hasProducts = products.length > 0;
    return `
      <section class="section section--light">
        <div class="container">
          ${Ibiza.SectionHeader({
            eyebrow: 'Destaques',
            title: 'Camisas em destaque',
            subtitle: hasProducts
              ? 'Os modelos mais procurados da temporada.'
              : 'Estamos preparando a vitrine. As primeiras camisas chegam em breve.',
            action: hasProducts ? { label: 'Ver todas', href: '#/catalogo' } : null,
          })}
          ${hasProducts ? featuredGrid(products) : Ibiza.PlaceholderCard.grid(4)}
        </div>
      </section>`;
  }

  function categories() {
    return `
      <section class="section section--dark" id="categorias">
        <div class="container">
          ${Ibiza.SectionHeader({
            eyebrow: 'Categorias',
            title: 'Escolha o seu time',
            subtitle: 'Navegue pelas camisas de acordo com a sua paixão.',
            tone: 'dark',
          })}
          <div class="category-grid">
            ${Ibiza.categories.map((c, i) => Ibiza.CategoryCard(c, { index: i })).join('')}
          </div>
        </div>
      </section>`;
  }

  function catalogCta() {
    return `
      <section class="section section--light section--tight">
        <div class="container">
          <div class="cta-banner reveal">
            <div class="cta-banner__stripes" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="cta-banner__content">
              <p class="eyebrow">Catálogo completo</p>
              <h2 class="cta-banner__title">Todas as camisas em um só lugar</h2>
              <p class="cta-banner__text">Filtre por categoria, pesquise pelo seu time e encontre o manto ideal.</p>
            </div>
            ${Ibiza.Button({ label: 'Explorar catálogo', href: '#/catalogo', variant: 'dark', size: 'lg', icon: 'arrowRight' })}
          </div>
          ${Ibiza.RequestBanner()}
        </div>
      </section>`;
  }

  return {
    title: '',
    render() {
      return `<div class="page page--home">${hero()}${highlights()}${featured()}${categories()}${catalogCta()}</div>`;
    },
    mount(root) {
      root.querySelectorAll('[data-scroll-to]').forEach((btn) =>
        btn.addEventListener('click', () => {
          const target = document.getElementById(btn.dataset.scrollTo);
          if (target) target.scrollIntoView({ behavior: Ibiza.utils.prefersReducedMotion() ? 'auto' : 'smooth' });
        })
      );
    },
  };
})();
