/**
 * Roteador baseado em hash (#/rota). Funciona abrindo o index.html direto
 * no navegador, sem precisar de servidor.
 *
 * Para criar uma nova página: adicione um objeto em Ibiza.pages com
 * `render(params, query)` e, opcionalmente, `mount(root, params, query)`,
 * `title` ou `getTitle(params, query)`. Depois registre a rota abaixo.
 */
Ibiza.router = (() => {
  const routes = [
    { pattern: '/', page: () => Ibiza.pages.home },
    { pattern: '/catalogo', page: () => Ibiza.pages.catalog },
    { pattern: '/produto/:id', page: () => Ibiza.pages.product },
    { pattern: '/carrinho', page: () => Ibiza.pages.cart },
  ];

  const LEAVE_MS = 180;
  let app;
  let isFirstRender = true;
  let pendingOptions = {};
  let renderToken = 0;

  function parseHash() {
    const raw = window.location.hash.replace(/^#/, '') || '/';
    const [pathPart, queryPart = ''] = raw.split('?');
    const path = '/' + pathPart.replace(/^\/+|\/+$/g, '');
    return { path, query: new URLSearchParams(queryPart) };
  }

  function match(path) {
    for (const route of routes) {
      const names = [];
      const regex = new RegExp(
        '^' + route.pattern.replace(/:[^/]+/g, (m) => (names.push(m.slice(1)), '([^/]+)')) + '/?$'
      );
      const m = path.match(regex);
      if (m) {
        const params = {};
        names.forEach((n, i) => (params[n] = decodeURIComponent(m[i + 1])));
        return { page: route.page(), params };
      }
    }
    return { page: Ibiza.pages.notFound, params: {} };
  }

  function setTitle(page, params, query) {
    const name = Ibiza.config.storeName;
    const title = page.getTitle ? page.getTitle(params, query) : page.title;
    document.title = title ? `${title} | ${name}` : `${name} — ${Ibiza.config.tagline}`;
  }

  function render() {
    const { path, query } = parseHash();
    const { page, params } = match(path);
    const options = pendingOptions;
    pendingOptions = {};
    const token = ++renderToken;
    const animate = !isFirstRender && options.transition !== false && !Ibiza.utils.prefersReducedMotion();

    const swap = () => {
      if (token !== renderToken) return;
      app.innerHTML = page.render(params, query);
      if (page.mount) page.mount(app, params, query);
      setTitle(page, params, query);
      Ibiza.Header.setRoute(path, query);
      Ibiza.utils.observeReveal(app);

      if (!options.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' });
      app.classList.remove('is-leaving');
      if (animate) {
        app.classList.remove('is-entering');
        void app.offsetWidth;
        app.classList.add('is-entering');
      }
      if (!isFirstRender) app.focus({ preventScroll: true });
      isFirstRender = false;
    };

    if (animate) {
      app.classList.add('is-leaving');
      setTimeout(swap, LEAVE_MS);
    } else {
      swap();
    }
  }

  /** Navega para um hash. options: { transition: boolean, keepScroll: boolean } */
  function navigate(hash, options = {}) {
    pendingOptions = options;
    if (window.location.hash === hash) render();
    else window.location.hash = hash;
  }

  function start(el) {
    app = el;
    app.addEventListener('animationend', (e) => {
      if (e.target === app) app.classList.remove('is-entering');
    });
    window.addEventListener('hashchange', render);
    render();
  }

  return { start, navigate };
})();
