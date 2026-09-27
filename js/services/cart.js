/**
 * Estado do carrinho.
 * Guarda apenas { productId, size, quantity, custom } no navegador; nome, foto e
 * preço são sempre lidos do catálogo, então alterações no produto refletem
 * automaticamente no carrinho.
 *
 * `custom` é a personalização opcional { name, number } (ou null) e soma
 * `Ibiza.config.customizationPrice` ao preço unitário.
 *
 * Eventos: dispara `cart:change` em `window` sempre que o carrinho muda.
 */
Ibiza.cart = (() => {
  const KEY = Ibiza.config.cartStorageKey;
  const MAX_QTY = 20;
  let items = load();

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(raw)
        ? raw.filter((i) => i && i.productId && i.size && i.quantity > 0).map((i) => ({ ...i, custom: i.custom || null }))
        : [];
    } catch {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível: o carrinho continua funcionando nesta aba */
    }
    window.dispatchEvent(new CustomEvent('cart:change', { detail: { items: getItems() } }));
  }

  // A mesma camisa com tamanho ou personalização diferente vira outra linha no carrinho
  const keyOf = (i) => `${i.productId}__${i.size}__${i.custom ? `${i.custom.name}#${i.custom.number}` : ''}`;

  function unitPriceOf(product, custom) {
    if (!Ibiza.utils.hasPrice(product.price)) return null;
    return product.price + (custom ? Ibiza.config.customizationPrice : 0);
  }

  /** Itens com os dados do produto resolvidos (ignora produtos removidos do catálogo). */
  function getItems() {
    return items
      .map((item) => {
        const product = Ibiza.catalog.getById(item.productId);
        return { ...item, key: keyOf(item), product, unitPrice: product ? unitPriceOf(product, item.custom) : null };
      })
      .filter((item) => item.product);
  }

  function add(productId, size, quantity = 1, custom = null) {
    const entry = { productId, size, quantity: Math.min(MAX_QTY, quantity), custom };
    const existing = items.find((i) => keyOf(i) === keyOf(entry));
    if (existing) existing.quantity = Math.min(MAX_QTY, existing.quantity + quantity);
    else items.push(entry);
    save();
  }

  function setQuantity(key, quantity) {
    const item = items.find((i) => keyOf(i) === key);
    if (!item) return;
    if (quantity <= 0) return remove(key);
    item.quantity = Math.min(MAX_QTY, quantity);
    save();
  }

  function remove(key) {
    items = items.filter((i) => keyOf(i) !== key);
    save();
  }

  function clear() {
    items = [];
    save();
  }

  function count() {
    return getItems().reduce((sum, i) => sum + i.quantity, 0);
  }

  /** Soma dos itens com preço definido. `hasUnpriced` indica itens ainda sem preço. */
  function subtotal() {
    let total = 0;
    let hasUnpriced = false;
    getItems().forEach((i) => {
      if (i.unitPrice !== null) total += i.unitPrice * i.quantity;
      else hasUnpriced = true;
    });
    return { total, hasUnpriced };
  }

  // Mantém várias abas sincronizadas
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      items = load();
      window.dispatchEvent(new CustomEvent('cart:change', { detail: { items: getItems() } }));
    }
  });

  return { getItems, add, setQuantity, remove, clear, count, subtotal, MAX_QTY };
})();
