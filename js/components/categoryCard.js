/**
 * Card de categoria (Times brasileiros, europeus, seleções).
 */
Ibiza.CategoryCard = function CategoryCard(category, { index = 0 } = {}) {
  const { icon } = Ibiza;
  const { escape } = Ibiza.utils;
  const count = Ibiza.catalog.countByCategory(category.id);
  const countLabel = count ? `${count} ${count === 1 ? 'camisa' : 'camisas'}` : 'Em breve';
  // Bandeira para brasileiros, emoji para internacional e seleções, ícone para as demais
  const flagCode = { brasileiros: 'br' }[category.id];
  const emoji = { europeus: '🌍', selecoes: '🏆' }[category.id];
  const iconHtml = flagCode
    ? `<span class="category-card__icon category-card__icon--flag">${Ibiza.flag(flagCode)}</span>`
    : emoji
      ? `<span class="category-card__icon category-card__icon--emoji" aria-hidden="true">${emoji}</span>`
      : `<span class="category-card__icon">${icon('ball', { size: 26 })}</span>`;

  return `
    <a class="category-card category-card--${escape(category.id)} reveal" style="--delay:${index * 90}ms" href="#/catalogo?categoria=${escape(category.id)}">
      ${category.image ? `<img class="category-card__img" src="${escape(category.image)}" alt="" loading="lazy" />` : ''}
      <span class="category-card__bg-text" aria-hidden="true">${escape(category.shortName)}</span>
      <span class="category-card__index">0${index + 1}</span>
      ${iconHtml}
      <span class="category-card__content">
        <span class="category-card__count">${countLabel}</span>
        <span class="category-card__title">${escape(category.name)}</span>
        <span class="category-card__desc">${escape(category.description)}</span>
        <span class="category-card__cta">Explorar ${icon('arrowRight', { size: 18 })}</span>
      </span>
    </a>`;
};
