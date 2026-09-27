/**
 * Footer com informações da loja e redes sociais.
 * Os dados vêm de js/config.js — redes/contatos vazios não aparecem.
 */
Ibiza.Footer = (() => {
  const { icon } = Ibiza;
  const { escape } = Ibiza.utils;

  const socialLabels = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', x: 'X' };

  function render() {
    const { config } = Ibiza;
    const socials = Object.entries(config.social).filter(([, url]) => url);
    const socialHtml = socials.length
      ? socials
          .map(
            ([key, url]) =>
              `<a class="social-link" href="${escape(url)}" target="_blank" rel="noopener" aria-label="${socialLabels[key] || key}">${icon(key, { size: 20 })}</a>`
          )
          .join('')
      : Object.keys(socialLabels)
          .slice(0, 3)
          .map((key) => `<span class="social-link is-pending" title="Link em breve" aria-label="${socialLabels[key]} (em breve)">${icon(key, { size: 20 })}</span>`)
          .join('');

    const contact = [];
    if (config.contact.whatsapp)
      contact.push(`<li><a href="https://wa.me/${escape(config.contact.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp', { size: 18 })}WhatsApp ${escape(config.contact.whatsappLabel || '')}</a></li>`);
    if (config.contact.email)
      contact.push(`<li><a href="mailto:${escape(config.contact.email)}">${icon('mail', { size: 18 })}${escape(config.contact.email)}</a></li>`);
    if (config.social.instagram)
      contact.push(`<li><a href="${escape(config.social.instagram)}" target="_blank" rel="noopener">${icon('instagram', { size: 18 })}Instagram</a></li>`);
    if (config.contact.city) contact.push(`<li><span>${icon('pin', { size: 18 })}${escape(config.contact.city)}</span></li>`);
    if (!contact.length) contact.push('<li><span class="muted">Canais de atendimento em breve.</span></li>');

    const year = new Date().getFullYear();

    return `
      <footer class="site-footer">
        <div class="site-footer__glow" aria-hidden="true"></div>
        <div class="container site-footer__grid">
          <div class="site-footer__brand">
            <img class="site-footer__logo" src="assets/img/logo.jpg" alt="${escape(config.storeName)}" loading="lazy" />
            <p>${escape(config.description)}</p>
            <div class="site-footer__social">
              ${socialHtml}
              <div class="quality-tag">
                <span class="quality-tag__title">Camisas tailandesas 1.1</span>
                <span class="quality-tag__sub">Edições premium</span>
              </div>
            </div>
          </div>

          <div class="site-footer__col">
            <h3>Loja</h3>
            <ul>
              <li><a href="#/">Início</a></li>
              <li><a href="#/catalogo">Catálogo</a></li>
              <li><a href="#/carrinho">Carrinho</a></li>
            </ul>
          </div>

          <div class="site-footer__col">
            <h3>Categorias</h3>
            <ul>
              ${Ibiza.categories.map((c) => `<li><a href="#/catalogo?categoria=${c.id}">${escape(c.name)}</a></li>`).join('')}
            </ul>
          </div>

          <div class="site-footer__col">
            <h3>Suporte</h3>
            <ul class="site-footer__contact">${contact.join('')}</ul>
          </div>

          <ul class="site-footer__perks">
            <li>${icon('check', { size: 16, strokeWidth: 2.4 })}Acabamento fiel ao modelo original</li>
            <li>${icon('check', { size: 16, strokeWidth: 2.4 })}Escudos e patrocínios idênticos aos oficiais</li>
            <li>${icon('check', { size: 16, strokeWidth: 2.4 })}Personalização com nome e número</li>
            <li>${icon('check', { size: 16, strokeWidth: 2.4 })}Atendimento direto pelo WhatsApp e Instagram</li>
          </ul>
        </div>

        <div class="container site-footer__bottom">
          <span>© ${year} ${escape(config.storeName)}. Todos os direitos reservados.</span>
          <span class="site-footer__tag">${escape(config.tagline)}</span>
        </div>
      </footer>`;
  }

  function mount(el) {
    el.innerHTML = render();
  }

  return { mount };
})();
