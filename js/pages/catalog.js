/**
 * Catálogo: filtros por categoria, time, busca e ordenação.
 * URL: #/catalogo?categoria=<id>&time=<id>&busca=<termo>&ordem=<sort>&todas=1
 *
 * Modos:
 *  - Categoria com times (ex.: brasileiros): faixa de escudos + camisas principais.
 *  - Time (&time=): todas as camisas daquele time.
 *  - Demais (todas, busca, &todas=1): lista completa.
 */
Ibiza.pages = Ibiza.pages || {};

Ibiza.pages.catalog = (() => {
  const { icon } = Ibiza;
  const { escape } = Ibiza.utils;

  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'name', label: 'Nome (A–Z)' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' },
  ];

  function buildHash(state) {
    const params = new URLSearchParams();
    if (state.category) params.set('categoria', state.category);
    if (state.team) params.set('time', state.team);
    if (state.query) params.set('busca', state.query);
    if (state.all) params.set('todas', '1');
    if (state.sort && state.sort !== 'relevance') params.set('ordem', state.sort);
    const qs = params.toString();
    return `#/catalogo${qs ? `?${qs}` : ''}`;
  }

  function readState(query) {
    const category = query.get('categoria') || '';
    const team = Ibiza.catalog.getTeam(query.get('time') || '');
    return {
      category: Ibiza.catalog.getCategory(category) ? category : team ? team.category : '',
      team: team ? team.id : '',
      query: query.get('busca') || '',
      all: query.get('todas') === '1',
      sort: query.get('ordem') || 'relevance',
    };
  }

  function modeOf(state) {
    if (state.team) return 'team';
    if (state.category && !state.query && !state.all && Ibiza.catalog.teamsByCategory(state.category).length) return 'overview';
    return 'list';
  }

  /** Produtos exibidos no modo atual. */
  function productsFor(state, mode) {
    if (mode !== 'overview') return Ibiza.catalog.search(state);
    const main = Ibiza.catalog.mainProducts(state.category);
    return Ibiza.catalog.search(state).filter((p) => main.includes(p)); // mantém a ordenação escolhida
  }

  function results(state, products) {
    if (!Ibiza.catalog.all().length) {
      return Ibiza.EmptyState({
        icon: 'shirt',
        title: 'Catálogo em preparação',
        text: 'As camisas estão sendo cadastradas e aparecerão aqui em breve.',
      });
    }
    if (!products.length) {
      return Ibiza.EmptyState({
        icon: 'search',
        title: 'Nenhuma camisa encontrada',
        text: state.query ? `Não encontramos resultados para “${state.query}”. Tente outro termo.` : 'Ainda não há camisas nesta categoria.',
        action: { label: 'Ver todo o catálogo', href: '#/catalogo' },
      });
    }
    return Ibiza.ProductCard.grid(products);
  }

  /** do Flamengo / da Seleção Brasil */
  const ofTeam = (team) => `${team.category === 'selecoes' ? 'da' : 'do'} ${escape(team.name)}`;

  function heroText(state, mode) {
    const category = Ibiza.catalog.getCategory(state.category);
    const team = Ibiza.catalog.getTeam(state.team);
    if (mode === 'team') return { title: escape(team.name), subtitle: `Todas as camisas ${ofTeam(team)}.` };
    if (state.query) return { title: `Resultados para “${escape(state.query)}”`, subtitle: 'Todas as camisas da Ibiza Imports.' };
    if (category) return { title: escape(category.name), subtitle: escape(category.description) };
    return { title: 'Catálogo', subtitle: 'Todas as camisas da Ibiza Imports.' };
  }

  function breadcrumb(state, mode) {
    const sep = icon('chevronRight', { size: 14 });
    const category = Ibiza.catalog.getCategory(state.category);
    const parts = ['<a href="#/">Início</a>'];
    if (!category && !state.query) parts.push('<span>Catálogo</span>');
    else parts.push('<a href="#/catalogo">Catálogo</a>');
    if (mode === 'team') {
      parts.push(`<a href="${buildHash({ category: state.category })}">${escape(category.shortName)}</a>`);
      parts.push(`<span>${escape(Ibiza.catalog.getTeam(state.team).name)}</span>`);
    } else if (category) parts.push(`<span>${escape(category.shortName)}</span>`);
    else if (state.query) parts.push('<span>Busca</span>');
    return parts.join(sep);
  }

  function render(params, query) {
    const state = readState(query);
    const mode = modeOf(state);
    const products = productsFor(state, mode);
    const team = Ibiza.catalog.getTeam(state.team);
    const { title, subtitle } = heroText(state, mode);
    const count = products.length;

    const chips = [{ id: '', shortName: 'Todas' }, ...Ibiza.categories]
      .map((c) => `<a class="chip ${state.category === c.id ? 'is-active' : ''}" href="${buildHash({ category: c.id, sort: state.sort })}">${escape(c.shortName)}</a>`)
      .join('');

    const countLabel = mode === 'overview' ? `${count} ${count === 1 ? 'camisa principal' : 'camisas principais'}` : `${count} ${count === 1 ? 'camisa' : 'camisas'}`;
    const totalInCategory = state.category ? Ibiza.catalog.byCategory(state.category).length : 0;

    return `
      <div class="page page--catalog">
        <section class="page-hero">
          <div class="page-hero__stripes" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="container">
            <nav class="breadcrumb" aria-label="Você está em">${breadcrumb(state, mode)}</nav>
            <div class="page-hero__heading">
              ${mode === 'team' ? `<span class="page-hero__crest">${Ibiza.TeamRail.crest(team)}</span>` : ''}
              <div>
                <h1 class="page-hero__title">${title}</h1>
                <p class="page-hero__subtitle">${subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section section--light section--catalog">
          <div class="container">
            <div class="catalog-toolbar">
              <div class="chip-group" role="navigation" aria-label="Filtrar por categoria">${chips}</div>
              <div class="catalog-toolbar__right">
                ${
                  state.query
                    ? `<a class="chip chip--removable" href="${buildHash({ ...state, query: '' })}" aria-label="Limpar busca">“${escape(state.query)}” ${icon('close', { size: 14 })}</a>`
                    : ''
                }
                <span class="catalog-toolbar__count">${countLabel}</span>
                <label class="select">
                  <span class="sr-only">Ordenar por</span>
                  <select data-sort>
                    ${sortOptions.map((o) => `<option value="${o.value}" ${state.sort === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                  </select>
                  ${icon('chevronDown', { size: 16 })}
                </label>
              </div>
            </div>

            ${
              state.category && !state.query && Ibiza.catalog.teamsByCategory(state.category).length
                ? Ibiza.TeamRail(Ibiza.catalog.teamsByCategory(state.category), { active: state.team, title: state.category === 'selecoes' ? 'Seleções' : 'Times' })
                : ''
            }

            ${
              mode === 'overview'
                ? Ibiza.SectionHeader({ eyebrow: 'Destaques da categoria', title: 'Camisas principais', subtitle: 'As titulares dos times mais conhecidos. Clique no escudo para ver todas as camisas do time.' })
                : ''
            }
            ${mode === 'team' ? `<h2 class="catalog-subtitle">Camisas ${ofTeam(team)}</h2>` : ''}

            <div class="catalog-results">${results(state, products)}</div>

            ${
              mode === 'overview' && totalInCategory > count
                ? `<div class="catalog-more">${Ibiza.Button({ label: `Ver todas as camisas (${totalInCategory})`, href: buildHash({ category: state.category, all: true }), variant: 'dark', size: 'lg', icon: 'arrowRight' })}</div>`
                : ''
            }

            ${Ibiza.RequestBanner({ query: state.query })}
          </div>
        </section>
      </div>`;
  }

  return {
    title: 'Catálogo',
    render,
    mount(root, params, query) {
      const state = readState(query);
      root.querySelector('[data-sort]').addEventListener('change', (e) => {
        Ibiza.router.navigate(buildHash({ ...state, sort: e.target.value }), { transition: false, keepScroll: true });
      });
      Ibiza.TeamRail.bind(root);
    },
    getTitle(params, query) {
      const state = readState(query);
      const team = Ibiza.catalog.getTeam(state.team);
      if (team) return `Camisas ${team.category === 'selecoes' ? 'da' : 'do'} ${team.name}`;
      const cat = Ibiza.catalog.getCategory(state.category);
      return cat ? cat.name : 'Catálogo';
    },
  };
})();
