/**
 * Serviço de catálogo: consultas sobre produtos e categorias.
 * No futuro, pode ser trocado por chamadas a uma API sem mudar as páginas.
 */
Ibiza.catalog = (() => {
  const { normalize } = Ibiza.utils;

  /**
   * Monta o nome no padrão da loja:
   *   "Camisa Cruzeiro I 2026/2027 - Adidas Masculina Torcedor - Azul"
   * Com `player`, acrescenta o nome/número no fim: "... - Neymar Jr 11".
   * Partes vazias são omitidas.
   */
  function buildName(p) {
    const head = ['Camisa', p.team, p.kit, p.season].filter(Boolean).join(' ');
    const middle = [p.brand, p.gender, p.version].filter(Boolean).join(' ');
    return [head, middle, p.color, p.player].filter(Boolean).join(' - ');
  }

  // Preenche os valores padrão (js/config.js) nos produtos que não os informam.
  // Para um produto diferente, basta preencher o campo nele.
  Ibiza.products.forEach((p) => {
    if (p.price === undefined) p.price = Ibiza.config.defaultPrice;
    if (!Array.isArray(p.sizes) || !p.sizes.length) p.sizes = [...Ibiza.config.defaultSizes];
    if (p.gender === undefined) p.gender = Ibiza.config.defaultGender;
    if (p.version === undefined) p.version = Ibiza.config.defaultVersion;
    if (!p.name) p.name = buildName(p);
  });

  // Camisas do mesmo time ficam sempre lado a lado (times na ordem de js/data/teams.js,
  // depois os não listados; dentro do time, mantém a ordem do cadastro).
  const teamOrder = [...new Set([...Ibiza.teams.map((t) => t.name), ...Ibiza.products.map((p) => p.team)])];
  Ibiza.products = Ibiza.products
    .map((p, i) => ({ p, i }))
    .sort((a, b) => teamOrder.indexOf(a.p.team) - teamOrder.indexOf(b.p.team) || a.i - b.i)
    .map(({ p }) => p);

  function all() {
    return Ibiza.products;
  }

  function getById(id) {
    return Ibiza.products.find((p) => p.id === id) || null;
  }

  function featured(limit = 8) {
    return Ibiza.products.filter((p) => p.featured).slice(0, limit);
  }

  function byCategory(categoryId) {
    return Ibiza.products.filter((p) => p.category === categoryId);
  }

  function related(product, limit = 4) {
    if (!product) return [];
    const sameTeam = Ibiza.products.filter((p) => p.id !== product.id && p.team === product.team);
    const sameCategory = Ibiza.products.filter(
      (p) => p.id !== product.id && p.team !== product.team && p.category === product.category
    );
    return [...sameTeam, ...sameCategory].slice(0, limit);
  }

  function getCategory(id) {
    return Ibiza.categories.find((c) => c.id === id) || null;
  }

  function countByCategory(id) {
    return byCategory(id).length;
  }

  // ---------- Times ----------
  function getTeam(id) {
    return Ibiza.teams.find((t) => t.id === id) || null;
  }

  function byTeam(teamName) {
    return Ibiza.products.filter((p) => p.team === teamName);
  }

  /** Times da categoria que têm pelo menos uma camisa. */
  function teamsByCategory(categoryId) {
    return Ibiza.teams.filter((t) => t.category === categoryId && byTeam(t.name).length);
  }

  /**
   * Camisa principal de um time: a marcada com `main: true`, senão a titular (I)
   * mais recente, senão a mais recente.
   */
  function mainOf(team) {
    const list = byTeam(team.name);
    return (
      list.find((p) => p.main) ||
      [...list].sort((a, b) => (a.kit === 'I' ? 0 : 1) - (b.kit === 'I' ? 0 : 1) || String(b.season).localeCompare(String(a.season)))[0] ||
      null
    );
  }

  /**
   * Camisas principais da categoria: a titular dos times mais conhecidos
   * (os primeiros da lista em js/data/teams.js), no máximo `limit`.
   */
  function mainProducts(categoryId, limit = 6) {
    return teamsByCategory(categoryId).map(mainOf).filter(Boolean).slice(0, limit);
  }

  /**
   * Filtra e ordena produtos.
   * @param {{category?: string, team?: string, query?: string, sort?: string}} options
   */
  function search({ category = '', team = '', query = '', sort = 'relevance' } = {}) {
    const q = normalize(query);
    const teamName = team ? getTeam(team)?.name : '';
    let list = Ibiza.products.filter((p) => {
      if (category && p.category !== category) return false;
      if (teamName && p.team !== teamName) return false;
      if (!q) return true;
      const haystack = normalize([p.name, p.team, p.season, p.version, p.brand, p.color, p.badge, p.player, getCategory(p.category)?.name].join(' '));
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });

    // Produtos sem preço definido ficam sempre no fim
    const byPrice = (dir) => (a, b) => {
      const pa = Ibiza.utils.hasPrice(a.price);
      const pb = Ibiza.utils.hasPrice(b.price);
      if (!pa || !pb) return Number(pb) - Number(pa);
      return dir * (a.price - b.price);
    };
    if (sort === 'price-asc') list = [...list].sort(byPrice(1));
    if (sort === 'price-desc') list = [...list].sort(byPrice(-1));
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    return list;
  }

  return {
    all, getById, featured, byCategory, related, getCategory, countByCategory, search,
    getTeam, byTeam, teamsByCategory, mainOf, mainProducts,
  };
})();
