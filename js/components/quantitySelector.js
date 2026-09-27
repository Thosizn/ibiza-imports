/**
 * Seletor de quantidade (− valor +).
 * Markup:  Ibiza.QuantitySelector({ value, size: 'sm' | 'md' })
 * Comportamento: Ibiza.QuantitySelector.bind(el, (novoValor) => {...})
 */
Ibiza.QuantitySelector = function QuantitySelector({ value = 1, min = 1, max = Ibiza.cart.MAX_QTY, size = 'md', label = 'Quantidade' } = {}) {
  const { icon } = Ibiza;
  return `
    <div class="qty qty--${size}" data-qty data-min="${min}" data-max="${max}">
      <button type="button" class="qty__btn" data-qty-dec aria-label="Diminuir quantidade">${icon('minus', { size: 16 })}</button>
      <input class="qty__input" type="number" inputmode="numeric" value="${value}" min="${min}" max="${max}" aria-label="${label}" />
      <button type="button" class="qty__btn" data-qty-inc aria-label="Aumentar quantidade">${icon('plus', { size: 16 })}</button>
    </div>`;
};

Ibiza.QuantitySelector.bind = function bind(el, onChange) {
  if (!el) return;
  const input = el.querySelector('input');
  const min = Number(el.dataset.min);
  const max = Number(el.dataset.max);
  const dec = el.querySelector('[data-qty-dec]');
  const inc = el.querySelector('[data-qty-inc]');

  const set = (value, notify = true) => {
    const v = Math.max(min, Math.min(max, Number.isFinite(value) ? Math.round(value) : min));
    input.value = v;
    dec.disabled = v <= min && min > 0;
    inc.disabled = v >= max;
    if (notify && onChange) onChange(v);
  };

  dec.addEventListener('click', () => set(Number(input.value) - 1));
  inc.addEventListener('click', () => set(Number(input.value) + 1));
  input.addEventListener('change', () => set(parseInt(input.value, 10)));
  set(Number(input.value), false);
};

Ibiza.QuantitySelector.getValue = function getValue(el) {
  return el ? Number(el.querySelector('input').value) || 1 : 1;
};
