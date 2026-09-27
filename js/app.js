/**
 * Inicialização da aplicação.
 */
(() => {
  /**
   * Adiciona ao carrinho com feedback visual (animação, botão e aviso).
   * Ponto central para qualquer botão "Adicionar ao carrinho" do site.
   */
  Ibiza.addToCart = function addToCart(product, size, quantity = 1, { sourceEl = null, button = null, custom = null } = {}) {
    Ibiza.cart.add(product.id, size, quantity, custom);

    if (button) {
      const label = button.querySelector('span');
      const original = label ? label.textContent : '';
      button.classList.add('is-added');
      if (label) label.textContent = 'Adicionado';
      clearTimeout(button._resetTimer);
      button._resetTimer = setTimeout(() => {
        button.classList.remove('is-added');
        if (label) label.textContent = original;
      }, 1600);
    }

    Ibiza.flyToCart(sourceEl);
    Ibiza.toast({
      message: `${product.name} (${size}${custom ? ` · ${custom.name} ${custom.number}` : ''}) adicionada ao carrinho.`,
      type: 'success',
      action: { label: 'Ver carrinho', onClick: () => Ibiza.CartDrawer.open() },
    });
  };

  /**
   * Finaliza o pedido pelo WhatsApp: abre a conversa com o resumo do carrinho
   * (camisas, tamanhos, personalização, quantidades e subtotal).
   */
  Ibiza.checkout = function checkout() {
    const items = Ibiza.cart.getItems();
    if (!items.length) return;
    const { formatPrice, hasPrice } = Ibiza.utils;
    const lines = items.map((item, i) => {
      const parts = [`${i + 1}. ${item.product.name}`, `   Tamanho: ${item.size} | Quantidade: ${item.quantity}`];
      if (item.custom) parts.push(`   Personalização: ${item.custom.name} ${item.custom.number} (+${formatPrice(Ibiza.config.customizationPrice)})`);
      if (hasPrice(item.unitPrice)) parts.push(`   Valor: ${formatPrice(item.unitPrice * item.quantity)}`);
      return parts.join('\n');
    });
    const { total } = Ibiza.cart.subtotal();
    const message = [
      `Olá! Quero finalizar meu pedido na ${Ibiza.config.storeName}:`,
      '',
      ...lines,
      '',
      `Subtotal: ${formatPrice(total)}`,
    ].join('\n');
    const url = `https://wa.me/${Ibiza.config.contact.checkoutWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  };

  // Qualquer botão com [data-checkout] finaliza o pedido
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-checkout]')) Ibiza.checkout();
  });

  /** Botão flutuante de WhatsApp (atendimento), visível em todas as páginas. */
  function mountWhatsAppFab() {
    const number = Ibiza.config.contact.whatsapp;
    if (!number) return;
    const text = encodeURIComponent(`Olá! Vim pelo site da ${Ibiza.config.storeName} e tenho uma dúvida.`);
    const el = Ibiza.utils.html(`
      <a class="wa-fab" href="https://wa.me/${number}?text=${text}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
        ${Ibiza.icon('whatsapp', { size: 28, strokeWidth: 1.9 })}
        <span class="wa-fab__label">Fale conosco</span>
      </a>`);
    document.body.appendChild(el);
  }

  function init() {
    mountWhatsAppFab();
    Ibiza.Header.mount(document.getElementById('header-root'));
    Ibiza.MobileMenu.mount(document.getElementById('mobile-menu-root'));
    Ibiza.CartDrawer.mount(document.getElementById('cart-drawer-root'));
    Ibiza.Footer.mount(document.getElementById('footer-root'));

    const app = document.getElementById('app');
    Ibiza.ProductCard.bind(app); // cliques de "Adicionar" em qualquer card, em qualquer página
    Ibiza.router.start(app);
    Ibiza.utils.observeReveal(document.getElementById('footer-root'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
