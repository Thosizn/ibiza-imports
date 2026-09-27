/**
 * Card "em breve": ocupa o espaço dos produtos enquanto o catálogo está vazio.
 * Não representa nenhum produto real.
 */
Ibiza.PlaceholderCard = function PlaceholderCard({ index = 0 } = {}) {
  const { icon } = Ibiza;
  return `
    <div class="product-card product-card--placeholder reveal" style="--delay:${(index % 4) * 70}ms" aria-hidden="true">
      <div class="product-card__media">
        <div class="product-card__placeholder">${icon('shirt', { size: 72, strokeWidth: 1.1 })}</div>
        <span class="badge">Em breve</span>
      </div>
      <div class="product-card__body">
        <span class="skeleton-line skeleton-line--sm"></span>
        <span class="skeleton-line"></span>
        <span class="skeleton-line skeleton-line--xs"></span>
      </div>
    </div>`;
};

Ibiza.PlaceholderCard.grid = function grid(count = 4) {
  return `<div class="product-grid product-grid--placeholder">${Array.from({ length: count }, (_, i) => Ibiza.PlaceholderCard({ index: i })).join('')}</div>`;
};
