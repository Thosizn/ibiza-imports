/**
 * Linha de item do carrinho (usada no carrinho lateral e na página do carrinho).
 * Markup: Ibiza.CartItem(item, { variant: 'drawer' | 'page' })
 * Comportamento: Ibiza.CartItem.bind(containerEl)
 */
Ibiza.CartItem = function CartItem(item, { variant = 'drawer' } = {}) {
  const { icon } = Ibiza;
  const { escape, formatPrice, hasPrice, productUrl } = Ibiza.utils;
  const { product, custom } = item;
  const image = product.images && product.images[0];
  const priced = hasPrice(item.unitPrice);
  const lineTotal = priced ? formatPrice(item.unitPrice * item.quantity) : formatPrice(null);

  return `
    <li class="cart-item cart-item--${variant}" data-cart-item="${escape(item.key)}">
      <a class="cart-item__thumb" href="${productUrl(product)}">
        ${image ? `<img src="${escape(image)}" alt="${escape(product.name)}" loading="lazy" />` : icon('shirt', { size: 34, strokeWidth: 1.3 })}
      </a>
      <div class="cart-item__info">
        <p class="cart-item__team">${escape(product.team)}</p>
        <a class="cart-item__name" href="${productUrl(product)}">${escape(product.name)}</a>
        <p class="cart-item__meta">Tamanho: <strong>${escape(item.size)}</strong>${
          variant === 'page' && priced ? ` · ${formatPrice(item.unitPrice)} cada` : ''
        }</p>
        ${
          custom
            ? `<p class="cart-item__custom">${icon('shirt', { size: 14 })} Personalizada: <strong>${escape(custom.name)} ${escape(custom.number)}</strong> <span>(+${formatPrice(Ibiza.config.customizationPrice)})</span></p>`
            : ''
        }
        <div class="cart-item__controls">
          ${Ibiza.QuantitySelector({ value: item.quantity, min: 0, size: 'sm', label: `Quantidade de ${product.name}` })}
          <button class="cart-item__remove" type="button" data-remove-item aria-label="Remover ${escape(product.name)}">
            ${icon('trash', { size: 16 })}<span>Remover</span>
          </button>
        </div>
      </div>
      <p class="cart-item__price ${priced ? '' : 'price--pending'}">${lineTotal}</p>
    </li>`;
};

Ibiza.CartItem.bind = function bind(container) {
  container.querySelectorAll('[data-cart-item]').forEach((row) => {
    const key = row.dataset.cartItem;
    Ibiza.QuantitySelector.bind(row.querySelector('[data-qty]'), (qty) => {
      if (qty === 0) removeWithAnimation(row, key);
      else Ibiza.cart.setQuantity(key, qty);
    });
    row.querySelector('[data-remove-item]').addEventListener('click', () => removeWithAnimation(row, key));
  });

  function removeWithAnimation(row, key) {
    row.classList.add('is-removing');
    setTimeout(() => Ibiza.cart.remove(key), Ibiza.utils.prefersReducedMotion() ? 0 : 260);
  }
};
