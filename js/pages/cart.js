/**
 * Página do carrinho.
 * Pagamento, frete e cupons serão adicionados futuramente na área de resumo.
 */
Ibiza.pages = Ibiza.pages || {};

Ibiza.pages.cart = (() => {
  const { icon } = Ibiza;
  let root;

  function content() {
    const items = Ibiza.cart.getItems();
    if (!items.length) {
      return Ibiza.EmptyState({
        icon: 'bag',
        title: 'Seu carrinho está vazio',
        text: 'Que tal começar pelo catálogo? Tem camisa do seu time esperando por você.',
        action: { label: 'Ver catálogo', href: '#/catalogo' },
      });
    }

    const { total, hasUnpriced } = Ibiza.cart.subtotal();
    const count = Ibiza.cart.count();

    return `
      <div class="cart-layout">
        <div class="cart-layout__items">
          <div class="cart-layout__head">
            <span>${count} ${count === 1 ? 'item' : 'itens'}</span>
            <button class="link-muted" type="button" data-clear-cart>${icon('trash', { size: 15 })} Esvaziar carrinho</button>
          </div>
          <ul class="cart-list cart-list--page">${items.map((i) => Ibiza.CartItem(i, { variant: 'page' })).join('')}</ul>
        </div>

        <aside class="cart-layout__summary">
          <div class="summary-card">
            <h2 class="summary-card__title">Resumo do pedido</h2>
            <div class="cart-summary__row"><span>Itens</span><span>${count}</span></div>
            <div class="cart-summary__row cart-summary__row--total">
              <span>Subtotal</span>
              <strong>${total > 0 ? Ibiza.utils.formatPrice(total) : '—'}</strong>
            </div>
            ${hasUnpriced ? '<p class="cart-summary__note">Alguns itens ainda estão sem preço definido.</p>' : ''}
            <p class="cart-summary__note">O valor final será confirmado na finalização do pedido.</p>
            <!-- Espaço reservado para frete, cupons e pagamento -->
            ${Ibiza.Button({ label: 'Finalizar compra', variant: 'primary', size: 'lg', className: 'btn--block', icon: 'whatsapp', attrs: 'data-checkout' })}
            <p class="cart-drawer__soon">Você será direcionado ao WhatsApp para confirmar o pedido.</p>
            ${Ibiza.Button({ label: 'Continuar comprando', href: '#/catalogo', variant: 'outline', className: 'btn--block', icon: 'arrowLeft', iconPosition: 'left' })}
          </div>
        </aside>
      </div>`;
  }

  function refresh() {
    // O contêiner das páginas é reaproveitado: se já saímos do carrinho, para de ouvir
    const container = root && root.querySelector('[data-cart-page]');
    if (!container) {
      window.removeEventListener('cart:change', refresh);
      return;
    }
    container.innerHTML = content();
    bind(container);
  }

  function bind(container) {
    Ibiza.CartItem.bind(container);
    container.querySelector('[data-clear-cart]')?.addEventListener('click', () => {
      if (window.confirm('Remover todos os itens do carrinho?')) Ibiza.cart.clear();
    });
  }

  return {
    title: 'Carrinho',
    render() {
      return `
        <div class="page page--cart">
          <section class="page-hero page-hero--compact">
            <div class="page-hero__stripes" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="container">
              <nav class="breadcrumb" aria-label="Você está em">
                <a href="#/">Início</a>${icon('chevronRight', { size: 14 })}<span>Carrinho</span>
              </nav>
              <h1 class="page-hero__title">Seu carrinho</h1>
            </div>
          </section>
          <section class="section section--light">
            <div class="container" data-cart-page>${content()}</div>
          </section>
        </div>`;
    },
    mount(el) {
      root = el;
      bind(root.querySelector('[data-cart-page]'));
      window.removeEventListener('cart:change', refresh);
      window.addEventListener('cart:change', refresh);
    },
  };
})();
