/**
 * Faixa de escudos dos times, com rolagem lateral.
 * Markup: Ibiza.TeamRail(teams, { title, active })
 * Comportamento: Ibiza.TeamRail.bind(containerEl)
 */
Ibiza.TeamRail = function TeamRail(teams, { title = 'Times', active = '' } = {}) {
  const { escape } = Ibiza.utils;
  return `
    <section class="team-rail" data-team-rail aria-label="${escape(title)}">
      <h2 class="team-rail__title">${escape(title)}</h2>
      <div class="team-rail__viewport">
        <div class="team-rail__track" data-rail-track>
          ${teams
            .map(
              (t, i) => `
              <a class="team-chip ${t.id === active ? 'is-active' : ''}" style="--i:${i}" href="#/catalogo?categoria=${escape(t.category)}&time=${escape(t.id)}" ${t.id === active ? 'aria-current="page"' : ''}>
                <span class="team-chip__circle">${Ibiza.TeamRail.crest(t)}</span>
                <span class="team-chip__name">${escape(t.label || t.name)}</span>
              </a>`
            )
            .join('')}
        </div>
      </div>
      <div class="team-rail__bar" data-rail-bar aria-hidden="true"><span class="team-rail__thumb" data-rail-thumb></span></div>
    </section>`;
};

/** Escudo do time, ou as iniciais enquanto não houver imagem. */
Ibiza.TeamRail.crest = function crest(team) {
  const { escape } = Ibiza.utils;
  const initials = escape(team.short || team.name.slice(0, 3).toUpperCase());
  if (!team.crest) return `<span class="team-crest team-crest--initials">${initials}</span>`;
  return `<img class="team-crest ${team.plate ? 'team-crest--plate' : ''}" src="${escape(team.crest)}" alt="" loading="lazy"
    onerror="this.outerHTML='<span class=&quot;team-crest team-crest--initials&quot;>${initials}</span>'" />`;
};

Ibiza.TeamRail.bind = function bind(container) {
  container.querySelectorAll('[data-team-rail]').forEach((rail) => {
    const track = rail.querySelector('[data-rail-track]');
    const bar = rail.querySelector('[data-rail-bar]');
    const thumb = rail.querySelector('[data-rail-thumb]');

    // Barra de rolagem: mostra a posição e permite arrastar/clicar
    const syncBar = () => {
      const ratio = track.clientWidth / track.scrollWidth;
      bar.hidden = ratio >= 0.99;
      const maxScroll = track.scrollWidth - track.clientWidth || 1;
      thumb.style.width = `${ratio * 100}%`;
      thumb.style.transform = `translateX(${(track.scrollLeft / maxScroll) * (1 / ratio - 1) * 100}%)`;
    };
    const scrollToPointer = (clientX, grabOffset) => {
      const r = bar.getBoundingClientRect();
      const thumbW = thumb.getBoundingClientRect().width;
      const pos = Math.min(Math.max(clientX - r.left - grabOffset, 0), r.width - thumbW);
      track.scrollLeft = (pos / (r.width - thumbW || 1)) * (track.scrollWidth - track.clientWidth);
    };
    bar.addEventListener('pointerdown', (e) => {
      const t = thumb.getBoundingClientRect();
      const onThumb = e.clientX >= t.left && e.clientX <= t.right;
      const grab = onThumb ? e.clientX - t.left : t.width / 2;
      track.style.scrollSnapType = 'none'; // arrasto livre
      track.style.scrollBehavior = 'auto';
      scrollToPointer(e.clientX, grab);
      bar.setPointerCapture(e.pointerId);
      bar.classList.add('is-dragging');
      const move = (ev) => scrollToPointer(ev.clientX, grab);
      const up = () => {
        bar.classList.remove('is-dragging');
        track.style.scrollSnapType = '';
        track.style.scrollBehavior = '';
        bar.removeEventListener('pointermove', move);
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up, { once: true });
      bar.addEventListener('pointercancel', up, { once: true });
    });

    const update = () => {
      syncBar();
      const max = track.scrollWidth - track.clientWidth - 8;
      rail.querySelector('.team-rail__viewport').classList.toggle('is-end', track.scrollLeft >= max);
    };

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // Mantém o time ativo visível
    const current = track.querySelector('.team-chip.is-active');
    if (current) track.scrollLeft = current.offsetLeft - track.clientWidth / 2 + current.clientWidth / 2;
    update();
  });
};
