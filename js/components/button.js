/**
 * Botão reutilizável.
 * Ibiza.Button({ label, href, variant: 'primary' | 'dark' | 'outline' | 'ghost', icon, size: 'sm' | 'md' | 'lg' })
 */
Ibiza.Button = function Button({
  label,
  href = '',
  variant = 'primary',
  size = 'md',
  icon = '',
  iconPosition = 'right',
  type = 'button',
  className = '',
  attrs = '',
  disabled = false,
}) {
  const { escape } = Ibiza.utils;
  const iconHtml = icon ? Ibiza.icon(icon, { size: size === 'sm' ? 16 : 18 }) : '';
  const content =
    iconPosition === 'left'
      ? `${iconHtml}<span>${escape(label)}</span>`
      : `<span>${escape(label)}</span>${iconHtml}`;
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href && !disabled) {
    return `<a class="${classes}" href="${escape(href)}" ${attrs}>${content}</a>`;
  }
  return `<button class="${classes}" type="${type}" ${disabled ? 'disabled' : ''} ${attrs}>${content}</button>`;
};
