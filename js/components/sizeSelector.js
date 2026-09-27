/**
 * Seletor de tamanhos (radio buttons estilizados).
 * Ibiza.SizeSelector({ sizes, name, variant: 'compact' | 'large' })
 * Ler seleção: Ibiza.SizeSelector.getValue(containerEl)
 */
Ibiza.SizeSelector = function SizeSelector({ sizes = [], name, variant = 'large', label = 'Tamanho' }) {
  const { escape, sortSizes } = Ibiza.utils;
  const list = sortSizes(sizes);
  if (!list.length) {
    return `<p class="size-selector__empty">Tamanhos em breve</p>`;
  }
  // Com um único tamanho, ele já vem selecionado
  const single = list.length === 1;
  return `
    <div class="size-selector size-selector--${variant}" role="radiogroup" aria-label="${escape(label)}" data-size-selector>
      ${list
        .map(
          (size) => `
          <label class="size-option">
            <input type="radio" name="${escape(name)}" value="${escape(size)}" ${single ? 'checked' : ''} />
            <span>${escape(size)}</span>
          </label>`
        )
        .join('')}
    </div>`;
};

Ibiza.SizeSelector.getValue = function getValue(container) {
  const checked = container && container.querySelector('[data-size-selector] input:checked');
  return checked ? checked.value : null;
};

/** Destaca o seletor com uma leve animação quando o usuário esquece de escolher o tamanho. */
Ibiza.SizeSelector.flagMissing = function flagMissing(container) {
  const el = container && container.querySelector('[data-size-selector]');
  if (!el) return;
  el.classList.remove('is-missing');
  void el.offsetWidth;
  el.classList.add('is-missing');
  el.addEventListener('change', () => el.classList.remove('is-missing'), { once: true });
};
