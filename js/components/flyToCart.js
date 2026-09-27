/**
 * Animação: a foto do produto "voa" até o ícone do carrinho.
 * Ibiza.flyToCart(sourceEl)
 */
Ibiza.flyToCart = function flyToCart(sourceEl) {
  const target = Ibiza.Header.cartTarget();
  if (!target) return Promise.resolve();

  const bump = () => {
    target.classList.remove('is-bumping');
    void target.offsetWidth;
    target.classList.add('is-bumping');
  };

  if (!sourceEl || Ibiza.utils.prefersReducedMotion() || !Element.prototype.animate) {
    bump();
    return Promise.resolve();
  }

  const from = sourceEl.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = Math.min(from.width, from.height, 220);

  const flyer = document.createElement('div');
  flyer.className = 'fly-to-cart';
  if (sourceEl.tagName === 'IMG') {
    flyer.style.backgroundImage = `url("${sourceEl.currentSrc || sourceEl.src}")`;
  } else {
    flyer.classList.add('fly-to-cart--dot');
    flyer.innerHTML = Ibiza.icon('shirt', { size: 40, strokeWidth: 1.4 });
  }
  Object.assign(flyer.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size / 2}px`,
  });
  document.body.appendChild(flyer);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const scaleEnd = 28 / size;

  const animation = flyer.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1, borderRadius: '16px' },
      { transform: `translate(${dx * 0.35}px, ${dy * 0.35 - 60}px) scale(0.55)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scaleEnd})`, opacity: 0.4, borderRadius: '50%' },
    ],
    { duration: 780, easing: 'cubic-bezier(.55,.06,.3,1)' }
  );

  return animation.finished.then(() => {
    flyer.remove();
    bump();
  });
};
