/**
 * Card de produto usado no catálogo, destaques e relacionados.
 * Markup: Ibiza.ProductCard(product)
 * Comportamento (delegado): Ibiza.ProductCard.bind(containerEl)
 */
Ibiza.ProductCard = function ProductCard(product, { index = 0 } = {}) {
  const { icon } = Ibiza;
  const { escape, formatPrice, hasPrice, productUrl } = Ibiza.utils;
  const url = productUrl(product);
  const [primary, secondary] = product.images || [];

  const media = primary
    ? `<img class="product-card__img" src="${escape(primary)}" alt="${escape(product.name)}" loading="lazy" decoding="async" />
       ${secondary ? `<img class="product-card__img product-card__img--alt" data-src="${escape(secondary)}" alt="" decoding="async" aria-hidden="true" />` : ''}`
    : `<div class="product-card__placeholder">${icon('shirt', { size: 64, strokeWidth: 1.2 })}<span>Foto em breve</span></div>`;

  return `
    <article class="product-card reveal" style="--delay:${(index % 4) * 70}ms" data-product-card data-product-id="${escape(product.id)}">
      <a class="product-card__media" href="${url}" tabindex="-1" aria-hidden="true">
        ${media}
        ${product.badge ? `<span class="badge badge--accent product-card__badge">${escape(product.badge)}</span>` : ''}
        <span class="product-card__view">Ver detalhes ${icon('arrowRight', { size: 16 })}</span>
      </a>
      <div class="product-card__body">
        <p class="product-card__team">${escape(product.team)}</p>
        <h3 class="product-card__name"><a href="${url}">${escape(product.name)}</a></h3>
        ${product.notice ? `<p class="product-card__notice">${icon('star', { size: 13 })}${escape(product.notice)}</p>` : ''}
        <div class="product-card__sizes">
          ${Ibiza.SizeSelector({ sizes: product.sizes, name: `card-size-${product.id}`, variant: 'compact', label: `Tamanho — ${product.name}` })}
        </div>
        <div class="product-card__foot">
          <span class="price ${hasPrice(product.price) ? '' : 'price--pending'}">${formatPrice(product.price)}</span>
          <button class="btn btn--dark btn--sm product-card__add" type="button" data-card-add aria-label="Adicionar ${escape(product.name)} ao carrinho">
            ${icon('cart', { size: 16 })}<span>Adicionar</span>
          </button>
        </div>
      </div>
    </article>`;
};

/** Grade de cards pronta. */
Ibiza.ProductCard.grid = function grid(products, { className = '' } = {}) {
  return `<div class="product-grid ${className}">${products.map((p, i) => Ibiza.ProductCard(p, { index: i })).join('')}</div>`;
};

Ibiza.ProductCard.bind = function bind(container) {
  // A 2ª foto (troca ao passar o mouse) só é baixada quando o cursor chega perto do card
  const loadAlt = (e) => {
    const card = e.target.closest && e.target.closest('[data-product-card]');
    const alt = card && card.querySelector('.product-card__img--alt[data-src]');
    if (alt) {
      alt.src = alt.dataset.src;
      alt.removeAttribute('data-src');
    }
  };
  container.addEventListener('pointerover', loadAlt);
  container.addEventListener('focusin', loadAlt);

  container.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-card-add]');
    if (!addBtn) return;
    const card = addBtn.closest('[data-product-card]');
    const product = Ibiza.catalog.getById(card.dataset.productId);
    if (!product) return;

    const size = Ibiza.SizeSelector.getValue(card);
    if (!size) {
      Ibiza.SizeSelector.flagMissing(card);
      Ibiza.toast({ message: 'Escolha um tamanho antes de adicionar.', type: 'warning' });
      return;
    }
    Ibiza.addToCart(product, size, 1, {
      sourceEl: card.querySelector('.product-card__img') || card.querySelector('.product-card__media'),
      button: addBtn,
    });
  });
};
