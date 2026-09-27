/**
 * Carrinho lateral (drawer).
 */
Ibiza.CartDrawer = (() => {
  const { icon } = Ibiza;
  let root;
  let lastFocus;

  function renderSummary() {
    const { total, hasUnpriced } = Ibiza.cart.subtotal();
    return `
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <strong>${total > 0 ? Ibiza.utils.formatPrice(total) : '—'}</strong>
        </div>
        ${hasUnpriced ? '<p class="cart-summary__note">Alguns itens ainda estão sem preço definido.</p>' : ''}
        <p class="cart-summary__note">O valor final será confirmado na finalização do pedido.</p>
      </div>`;
  }

  function renderBody() {
    const items = Ibiza.cart.getItems();
    const count = Ibiza.cart.count();

    root.querySelector('[data-drawer-count]').textContent = count ? `(${count})` : '';

    const body = root.querySelector('[data-drawer-body]');
    const foot = root.querySelector('[data-drawer-foot]');

    if (!items.length) {
      body.innerHTML = Ibiza.EmptyState({
        icon: 'bag',
        title: 'Seu carrinho está vazio',
        text: 'Explore o catálogo e escolha a camisa do seu time.',
        action: { label: 'Ver catálogo', href: '#/catalogo' },
        compact: true,
      });
      foot.hidden = true;
      body.querySelector('a')?.addEventListener('click', close);
      return;
    }

    body.innerHTML = `<ul class="cart-list">${items.map((i) => Ibiza.CartItem(i, { variant: 'drawer' })).join('')}</ul>`;
    Ibiza.CartItem.bind(body);
    body.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    foot.hidden = false;
    foot.innerHTML = `
      ${renderSummary()}
      <div class="cart-drawer__actions">
        ${Ibiza.Button({ label: 'Finalizar compra', variant: 'primary', size: 'lg', className: 'btn--block', icon: 'whatsapp', attrs: 'data-checkout' })}
        <p class="cart-drawer__soon">Você será direcionado ao WhatsApp para confirmar o pedido.</p>
        ${Ibiza.Button({ label: 'Ver carrinho completo', href: '#/carrinho', variant: 'outline', className: 'btn--block', attrs: 'data-close-cart-link' })}
      </div>`;
    foot.querySelector('[data-close-cart-link]').addEventListener('click', close);
  }

  function render() {
    return `
      <div class="overlay" data-drawer-overlay></div>
      <aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title" aria-hidden="true" data-drawer>
        <header class="cart-drawer__head">
          <h2 id="cart-drawer-title">Seu carrinho <span data-drawer-count></span></h2>
          <button class="icon-btn" type="button" aria-label="Fechar carrinho" data-close-cart>${icon('close')}</button>
        </header>
        <div class="cart-drawer__body" data-drawer-body></div>
        <footer class="cart-drawer__foot" data-drawer-foot></footer>
      </aside>`;
  }

  function open() {
    lastFocus = document.activeElement;
    Ibiza.MobileMenu.close();
    root.classList.add('is-open');
    root.querySelector('[data-drawer]').setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => root.querySelector('[data-close-cart]').focus(), 60);
  }

  function close() {
    if (!root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    root.querySelector('[data-drawer]').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function mount(el) {
    root = el;
    root.className = 'cart-drawer-root';
    root.innerHTML = render();
    renderBody();
    root.querySelector('[data-drawer-overlay]').addEventListener('click', close);
    root.querySelector('[data-close-cart]').addEventListener('click', close);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    window.addEventListener('cart:change', renderBody);
  }

  return { mount, open, close };
})();
