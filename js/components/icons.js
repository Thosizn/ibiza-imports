/**
 * Ícones SVG inline. Uso: Ibiza.icon('cart')
 */
(() => {
  const paths = {
    cart: '<path d="M6 7h12l-1 12.2a1.9 1.9 0 0 1-1.9 1.8H8.9A1.9 1.9 0 0 1 7 19.2L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    chevronLeft: '<path d="m15 6-6 6 6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    shirt: '<path d="M8.5 3.5 4 5.5 2.5 10l3 1.3V20.5h13v-9.2l3-1.3L20 5.5l-4.5-2c-.6 1.6-2 2.5-3.5 2.5S9.1 5.1 8.5 3.5Z"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.3 2.9 8 7 9.5 4.1-1.5 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="m12 7.5 4 2.9-1.5 4.7h-5L8 10.4l4-2.9ZM12 7.5V3.3M16 10.4l4-1.3M14.5 15.1l2.4 3.4M9.5 15.1l-2.4 3.4M8 10.4 4 9.1"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5Z"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6"/>',
    facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.6c0-1 .4-1.7 1.8-1.7H18V2.8c-.4 0-1.6-.2-3-.2-3 0-4.6 1.8-4.6 4.8v2.1H7.5V13h2.9v8"/>',
    x: '<path d="M4 4l16 16M20 4 4 20" />',
    whatsapp: '<path d="M4 20l1.2-4A8 8 0 1 1 8 18.8L4 20Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.9-.4-1.5-1-1.9-1.9l.8-1-1-2L9 9.5Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  };

  // Bandeiras em SVG (emojis de bandeira não aparecem no Windows)
  const euStars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const x = (12 + 6.2 * Math.sin(a)).toFixed(2);
    const y = (12 - 6.2 * Math.cos(a)).toFixed(2);
    return `<path transform="translate(${x} ${y}) scale(.12)" d="M0-10 2.35-3.24 9.51-3.09 3.8 1.24 5.88 8.09 0 4 -5.88 8.09 -3.8 1.24 -9.51-3.09 -2.35-3.24Z" fill="#ffcc00"/>`;
  }).join('');

  const flags = {
    br: `<rect width="24" height="24" fill="#009c3b"/><path d="M12 4.2 21.6 12 12 19.8 2.4 12Z" fill="#ffdf00"/><circle cx="12" cy="12" r="4.3" fill="#002776"/><path d="M7.9 11.1c2.8-.5 5.7.1 8.1 1.7" stroke="#fff" stroke-width=".9" fill="none"/>`,
    eu: `<rect width="24" height="24" fill="#003399"/>${euStars}`,
  };

  Ibiza.flag = function flag(code, { size = 52 } = {}) {
    return `<svg class="flag" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${flags[code] || ''}</svg>`;
  };

  Ibiza.icon = function icon(name, { size = 22, className = '', strokeWidth = 1.8 } = {}) {
    const body = paths[name] || '';
    return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  };
})();
