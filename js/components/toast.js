/**
 * Notificações rápidas.
 * Ibiza.toast({ message, type: 'success' | 'warning' | 'info', action: { label, onClick } })
 */
Ibiza.toast = function toast({ message, type = 'info', action = null, duration = 3200 }) {
  const { icon } = Ibiza;
  const root = document.getElementById('toast-root');
  const iconName = { success: 'check', warning: 'shirt', info: 'bag' }[type] || 'bag';

  const el = Ibiza.utils.html(`
    <div class="toast toast--${type}" role="status">
      <span class="toast__icon">${icon(iconName, { size: 18, strokeWidth: 2.2 })}</span>
      <span class="toast__msg">${Ibiza.utils.escape(message)}</span>
      ${action ? `<button class="toast__action" type="button">${Ibiza.utils.escape(action.label)}</button>` : ''}
    </div>`);

  if (action) {
    el.querySelector('.toast__action').addEventListener('click', () => {
      action.onClick();
      dismiss();
    });
  }

  // Limita a quantidade de toasts simultâneos
  while (root.children.length >= 3) root.firstElementChild.remove();
  root.appendChild(el);

  let timer = setTimeout(dismiss, duration);
  el.addEventListener('mouseenter', () => clearTimeout(timer));
  el.addEventListener('mouseleave', () => (timer = setTimeout(dismiss, 1500)));

  function dismiss() {
    clearTimeout(timer);
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 250);
  }
};
