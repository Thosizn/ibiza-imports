/**
 * Página 404.
 */
Ibiza.pages = Ibiza.pages || {};

Ibiza.pages.notFound = {
  title: 'Página não encontrada',
  render({ message } = {}) {
    return `
      <div class="page page--notfound">
        <section class="section section--light">
          <div class="container not-found">
            <p class="not-found__code">404</p>
            ${Ibiza.EmptyState({
              icon: 'ball',
              title: 'Bola fora!',
              text: message || 'A página que você procura não existe ou foi movida.',
              action: { label: 'Voltar para o início', href: '#/' },
            })}
          </div>
        </section>
      </div>`;
  },
};
