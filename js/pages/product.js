/**
 * Página individual do produto.
 * URL: #/produto/<id>
 */
Ibiza.pages = Ibiza.pages || {};

Ibiza.pages.product = (() => {
  const { icon } = Ibiza;
  const { escape, formatPrice, hasPrice } = Ibiza.utils;

  function gallery(product) {
    const images = product.images || [];
    if (!images.length) {
      return `
        <div class="gallery">
          <div class="gallery__main gallery__main--empty">
            ${icon('shirt', { size: 120, strokeWidth: 1 })}
            <span>Fotos em breve</span>
          </div>
        </div>`;
    }
    const multiple = images.length > 1;
    return `
      <div class="gallery" data-gallery>
        <div class="gallery__main" data-gallery-main>
          <div class="gallery__track" data-gallery-track>
            ${images
              .map(
                (src, i) => `
                <div class="gallery__slide" data-zoom>
                  <img src="${escape(src)}" alt="${escape(product.name)} — foto ${i + 1}" ${i ? 'loading="lazy"' : ''} />
                </div>`
              )
              .join('')}
          </div>
          ${
            multiple
              ? `<button class="gallery__nav gallery__nav--prev" type="button" aria-label="Foto anterior" data-gallery-prev>${icon('arrowLeft', { size: 20 })}</button>
                 <button class="gallery__nav gallery__nav--next" type="button" aria-label="Próxima foto" data-gallery-next>${icon('arrowRight', { size: 20 })}</button>
                 <span class="gallery__counter" data-gallery-counter>1 / ${images.length}</span>`
              : ''
          }
        </div>
        ${
          multiple
            ? `<div class="gallery__thumbs" role="tablist" aria-label="Fotos do produto">
                ${images
                  .map(
                    (src, i) => `
                    <button class="gallery__thumb ${i === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${i === 0}" aria-label="Ver foto ${i + 1}" data-gallery-thumb="${i}">
                      <img src="${escape(src)}" alt="" loading="lazy" />
                    </button>`
                  )
                  .join('')}
              </div>`
            : ''
        }
      </div>`;
  }

  function info(product) {
    const category = Ibiza.catalog.getCategory(product.category);
    const tags = [product.season, product.brand, product.version, product.color].filter(Boolean);
    const details = Array.isArray(product.details) ? product.details.filter(Boolean) : [];

    return `
      <div class="product-info">
        <div class="product-info__top">
          ${category ? `<a class="badge badge--outline" href="#/catalogo?categoria=${category.id}">${escape(category.shortName)}</a>` : ''}
          ${product.badge ? `<span class="badge badge--accent">${escape(product.badge)}</span>` : ''}
        </div>
        <p class="product-info__team">${escape(product.team)}</p>
        <h1 class="product-info__name">${escape(product.name)}</h1>
        ${tags.length ? `<ul class="product-info__tags">${tags.map((t) => `<li>${escape(t)}</li>`).join('')}</ul>` : ''}

        <p class="product-info__price price ${hasPrice(product.price) ? '' : 'price--pending'}" data-price>${formatPrice(product.price)}</p>

        ${product.notice ? `<p class="product-notice">${icon('star', { size: 18 })}<span>${escape(product.notice)}</span></p>` : ''}

        ${product.description ? `<p class="product-info__desc">${escape(product.description)}</p>` : ''}

        <form class="product-form" data-product-form novalidate>
          <div class="product-form__group">
            <div class="product-form__label">
              <span>Tamanho</span>
              <span class="product-form__hint" data-size-hint>Selecione um tamanho</span>
            </div>
            ${Ibiza.SizeSelector({ sizes: product.sizes, name: 'product-size', variant: 'large' })}
          </div>

          ${customizationFields()}

          <div class="product-form__group">
            <div class="product-form__label"><span>Quantidade</span></div>
            <div class="product-form__row">
              ${Ibiza.QuantitySelector({ value: 1 })}
              <button class="btn btn--primary btn--lg product-form__submit" type="submit" data-add-btn>
                ${icon('cart', { size: 20 })}<span>Adicionar ao carrinho</span>
              </button>
            </div>
          </div>
        </form>

        <div class="accordion">
          <details class="accordion__item" open>
            <summary>Informações da camisa ${icon('chevronDown', { size: 18 })}</summary>
            <div class="accordion__content">
              ${
                details.length
                  ? `<ul class="spec-list">${details.map((d) => `<li>${icon('check', { size: 16, strokeWidth: 2.2 })}<span>${escape(d)}</span></li>`).join('')}</ul>`
                  : '<p class="muted">As informações detalhadas desta camisa serão adicionadas em breve.</p>'
              }
            </div>
          </details>
        </div>

        <ul class="product-trust">
          <li>${icon('shield', { size: 20 })}<span><strong>Tailandesa 1.1 premium</strong>Acabamento fiel ao original</span></li>
          <li>${icon('whatsapp', { size: 20 })}<span><strong>Pedido pelo WhatsApp</strong>Confirmação direta com a loja</span></li>
          <li>${icon('shirt', { size: 20 })}<span><strong>Personalização</strong>Nome e número por ${formatPrice(Ibiza.config.customizationPrice)}</span></li>
        </ul>
      </div>`;
  }

  /** Opção extra de personalização com nome e número. */
  function customizationFields() {
    const { customizationPrice, customization } = Ibiza.config;
    return `
      <div class="product-form__group custom-option" data-custom>
        <label class="toggle">
          <input type="checkbox" data-custom-toggle />
          <span class="toggle__box">${icon('check', { size: 14, strokeWidth: 3 })}</span>
          <span class="toggle__label">Personalizar com nome e número</span>
          <span class="toggle__price">+ ${formatPrice(customizationPrice)}</span>
        </label>
        <div class="custom-fields" data-custom-fields>
          <div class="custom-fields__inner">
            <label class="field">
              <span>Nome</span>
              <input type="text" maxlength="${customization.nameMaxLength}" placeholder="Ex.: SEU NOME" autocomplete="off" data-custom-name />
            </label>
            <label class="field field--number">
              <span>Número</span>
              <input type="text" inputmode="numeric" maxlength="${String(customization.numberMax).length}" placeholder="10" autocomplete="off" data-custom-number />
            </label>
            <p class="custom-fields__hint" data-custom-hint>Até ${customization.nameMaxLength} letras e número de 0 a ${customization.numberMax}.</p>
          </div>
        </div>
      </div>`;
  }

  function relatedSection(product) {
    const related = Ibiza.catalog.related(product, 4);
    if (!related.length) return '';
    return `
      <section class="section section--light section--related">
        <div class="container">
          ${Ibiza.SectionHeader({ eyebrow: 'Você também pode gostar', title: 'Produtos relacionados' })}
          ${Ibiza.ProductCard.grid(related)}
        </div>
      </section>`;
  }

  function render(params) {
    const product = Ibiza.catalog.getById(params.id);
    if (!product) return Ibiza.pages.notFound.render({ message: 'Não encontramos esta camisa. Ela pode ter sido removida do catálogo.' });
    const category = Ibiza.catalog.getCategory(product.category);

    return `
      <div class="page page--product">
        <section class="section section--light section--product">
          <div class="container">
            <nav class="breadcrumb breadcrumb--dark" aria-label="Você está em">
              <a href="#/">Início</a>${icon('chevronRight', { size: 14 })}
              <a href="#/catalogo">Catálogo</a>${icon('chevronRight', { size: 14 })}
              ${category ? `<a href="#/catalogo?categoria=${category.id}">${escape(category.shortName)}</a>${icon('chevronRight', { size: 14 })}` : ''}
              <span aria-current="page">${escape(product.name)}</span>
            </nav>
            <div class="product-layout">
              ${gallery(product)}
              ${info(product)}
            </div>
          </div>
        </section>
        ${relatedSection(product)}
      </div>`;
  }

  function bindGallery(root) {
    const el = root.querySelector('[data-gallery]');
    if (!el) return;
    const track = el.querySelector('[data-gallery-track]');
    const slides = [...el.querySelectorAll('.gallery__slide')];
    const thumbs = [...el.querySelectorAll('[data-gallery-thumb]')];
    const counter = el.querySelector('[data-gallery-counter]');
    let index = 0;

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      el.dataset.index = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      thumbs.forEach((t, ti) => {
        t.classList.toggle('is-active', ti === index);
        t.setAttribute('aria-selected', String(ti === index));
      });
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    };

    el.querySelector('[data-gallery-prev]')?.addEventListener('click', () => go(index - 1));
    el.querySelector('[data-gallery-next]')?.addEventListener('click', () => go(index + 1));
    thumbs.forEach((t) => t.addEventListener('click', () => go(Number(t.dataset.galleryThumb))));

    // Deslizar no celular
    let startX = null;
    track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', (e) => {
      if (startX === null || slides.length < 2) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    // Zoom ao passar o mouse (apenas dispositivos com mouse)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      slides.forEach((slide) => {
        const img = slide.querySelector('img');
        slide.addEventListener('mousemove', (e) => {
          const r = slide.getBoundingClientRect();
          img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
          slide.classList.add('is-zoomed');
        });
        slide.addEventListener('mouseleave', () => slide.classList.remove('is-zoomed'));
      });
    }
  }

  function bindForm(root, product) {
    const form = root.querySelector('[data-product-form]');
    if (!form) return;
    const qtyEl = form.querySelector('[data-qty]');
    const hint = form.querySelector('[data-size-hint]');
    Ibiza.QuantitySelector.bind(qtyEl);

    const syncHint = () => {
      const size = Ibiza.SizeSelector.getValue(form);
      hint.textContent = size ? `Selecionado: ${size}` : 'Selecione um tamanho';
      hint.classList.toggle('is-selected', !!size);
      if (size) hint.classList.remove('is-error');
    };
    form.addEventListener('change', syncHint);
    syncHint();

    // Personalização: mostra os campos e atualiza o preço exibido
    const { customizationPrice, customization } = Ibiza.config;
    const customToggle = form.querySelector('[data-custom-toggle]');
    const customBox = form.querySelector('[data-custom]');
    const nameInput = form.querySelector('[data-custom-name]');
    const numberInput = form.querySelector('[data-custom-number]');
    const customHint = form.querySelector('[data-custom-hint]');
    const priceEl = root.querySelector('[data-price]');

    const syncCustom = () => {
      const on = customToggle.checked;
      customBox.classList.toggle('is-open', on);
      if (hasPrice(product.price)) priceEl.textContent = formatPrice(product.price + (on ? customizationPrice : 0));
      if (on) setTimeout(() => nameInput.focus(), 200);
    };
    customToggle.addEventListener('change', syncCustom);
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.toUpperCase().replace(/[^A-ZÀ-Ý .'-]/g, '');
      customBox.classList.remove('is-error');
    });
    numberInput.addEventListener('input', () => {
      numberInput.value = numberInput.value.replace(/\D/g, '');
      customBox.classList.remove('is-error');
    });

    /** Retorna a personalização, null se desativada, ou false se inválida. */
    const readCustom = () => {
      if (!customToggle.checked) return null;
      const name = nameInput.value.trim();
      const number = numberInput.value.trim();
      if (!name || number === '' || Number(number) > customization.numberMax) {
        customBox.classList.remove('is-error');
        void customBox.offsetWidth;
        customBox.classList.add('is-error');
        customHint.textContent = 'Preencha o nome e o número para personalizar.';
        (!name ? nameInput : numberInput).focus();
        return false;
      }
      return { name, number: String(Number(number)) };
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!(product.sizes || []).length) {
        Ibiza.toast({ message: 'Os tamanhos desta camisa serão disponibilizados em breve.', type: 'warning' });
        return;
      }
      const size = Ibiza.SizeSelector.getValue(form);
      if (!size) {
        Ibiza.SizeSelector.flagMissing(form);
        hint.classList.add('is-error');
        setTimeout(() => hint.classList.remove('is-error'), 1200);
        return;
      }
      const custom = readCustom();
      if (custom === false) return;
      // A animação parte da foto que está visível na galeria
      const galleryEl = root.querySelector('[data-gallery]');
      const currentIndex = galleryEl ? Number(galleryEl.dataset.index || 0) : 0;
      const sourceEl = root.querySelectorAll('.gallery__slide img')[currentIndex] || root.querySelector('.gallery__main');
      Ibiza.addToCart(product, size, Ibiza.QuantitySelector.getValue(qtyEl), {
        sourceEl,
        button: form.querySelector('[data-add-btn]'),
        custom,
      });
    });
  }

  return {
    render,
    mount(root, params) {
      const product = Ibiza.catalog.getById(params.id);
      if (!product) return;
      bindGallery(root);
      bindForm(root, product);
    },
    getTitle(params) {
      const product = Ibiza.catalog.getById(params.id);
      return product ? product.name : 'Produto não encontrado';
    },
  };
})();
