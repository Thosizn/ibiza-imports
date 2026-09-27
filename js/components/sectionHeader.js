/**
 * Cabeçalho de seção: selo, título, subtítulo e link opcional.
 */
Ibiza.SectionHeader = function SectionHeader({ eyebrow = '', title, subtitle = '', action = null, align = 'left', tone = 'light' }) {
  const { escape } = Ibiza.utils;
  return `
    <div class="section-header section-header--${align} section-header--${tone} reveal">
      <div class="section-header__text">
        ${eyebrow ? `<p class="eyebrow">${escape(eyebrow)}</p>` : ''}
        <h2 class="section-header__title">${escape(title)}</h2>
        ${subtitle ? `<p class="section-header__subtitle">${escape(subtitle)}</p>` : ''}
      </div>
      ${action ? `<a class="link-arrow" href="${escape(action.href)}">${escape(action.label)} ${Ibiza.icon('arrowRight', { size: 18 })}</a>` : ''}
    </div>`;
};
