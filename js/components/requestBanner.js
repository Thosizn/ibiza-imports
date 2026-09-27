/**
 * Aviso "Não encontrou sua camisa?": convida o cliente a pedir ao atendimento
 * um modelo que não está no site, para consultarmos o fornecedor.
 * Ibiza.RequestBanner({ query })  — `query` (opcional) entra na mensagem do WhatsApp.
 */
Ibiza.RequestBanner = function RequestBanner({ query = '', compact = false } = {}) {
  const { icon, config } = Ibiza;
  const { escape } = Ibiza.utils;
  const text = query
    ? `Olá! Não encontrei no site a camisa "${query}". Vocês conseguem verificar com o fornecedor?`
    : 'Olá! Não encontrei no site a camisa que procuro. Vocês conseguem verificar com o fornecedor?';
  const whatsapp = config.contact.whatsapp ? `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(text)}` : '';

  return `
    <aside class="request-banner ${compact ? 'request-banner--compact' : ''} reveal">
      <span class="request-banner__icon">${icon('search', { size: 26 })}</span>
      <div class="request-banner__content">
        <h3 class="request-banner__title">Não encontrou a camisa que procura?</h3>
        <p class="request-banner__text">
          Nosso catálogo vai além do site. Fale com o nosso atendimento e diga qual modelo você quer:
          consultamos nossos fornecedores e te respondemos se conseguimos a sua camisa.
        </p>
      </div>
      <div class="request-banner__actions">
        ${whatsapp ? Ibiza.Button({ label: 'Pedir pelo WhatsApp', href: whatsapp, variant: 'primary', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"' }) : ''}
        ${config.social.instagram ? Ibiza.Button({ label: 'Instagram', href: config.social.instagram, variant: 'ghost-light', icon: 'instagram', iconPosition: 'left', attrs: 'target="_blank" rel="noopener"' }) : ''}
      </div>
    </aside>`;
};
