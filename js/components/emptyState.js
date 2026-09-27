/**
 * Estado vazio genérico (catálogo sem produtos, carrinho vazio, busca sem resultados…).
 */
Ibiza.EmptyState = function EmptyState({ icon = 'shirt', title, text = '', action = null, compact = false }) {
  const { escape } = Ibiza.utils;
  return `
    <div class="empty-state ${compact ? 'empty-state--compact' : ''}">
      <span class="empty-state__icon">${Ibiza.icon(icon, { size: compact ? 34 : 42, strokeWidth: 1.4 })}</span>
      <h3 class="empty-state__title">${escape(title)}</h3>
      ${text ? `<p class="empty-state__text">${escape(text)}</p>` : ''}
      ${action ? Ibiza.Button({ label: action.label, href: action.href, variant: 'dark', icon: 'arrowRight' }) : ''}
    </div>`;
};
