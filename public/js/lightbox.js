(() => {
  const groups = document.querySelectorAll('[data-lightbox-group]');
  if (!groups.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'mbl-lightbox';
  dialog.setAttribute('aria-label', 'Visor de fotografía ampliada');
  dialog.innerHTML = `
    <div class="mbl-lightbox-box">
      <button type="button" class="mbl-lightbox-close" aria-label="Cerrar imagen ampliada">×</button>
      <button type="button" class="mbl-lightbox-nav mbl-lightbox-prev" aria-label="Imagen anterior">‹</button>
      <figure class="mbl-lightbox-figure">
        <figcaption class="mbl-lightbox-cap">
          <span class="mbl-lightbox-alt"></span>
          <span class="mbl-lightbox-count"></span>
        </figcaption>
      </figure>
      <button type="button" class="mbl-lightbox-nav mbl-lightbox-next" aria-label="Imagen siguiente">›</button>
    </div>
  `;
  document.body.appendChild(dialog);

  const figureEl = dialog.querySelector('.mbl-lightbox-figure');
  const capEl = dialog.querySelector('.mbl-lightbox-cap');
  const altEl = dialog.querySelector('.mbl-lightbox-alt');
  const countEl = dialog.querySelector('.mbl-lightbox-count');
  const closeBtn = dialog.querySelector('.mbl-lightbox-close');
  const prevBtn = dialog.querySelector('.mbl-lightbox-prev');
  const nextBtn = dialog.querySelector('.mbl-lightbox-next');
  let imgEl = null;

  let activeList = [];
  let activeIdx = 0;

  const getBestSrc = (img) => {
    const srcset = img.getAttribute('srcset');
    if (srcset) {
      let bestUrl = '';
      let bestW = -1;
      srcset.split(',').forEach((entry) => {
        const parts = entry.trim().split(/\s+/);
        if (parts.length >= 2) {
          const w = parseInt(parts[1], 10);
          if (!Number.isNaN(w) && w > bestW) {
            bestW = w;
            bestUrl = parts[0];
          }
        }
      });
      if (bestUrl) return bestUrl;
    }
    return img.currentSrc || img.getAttribute('src') || '';
  };

  const renderSlide = (idx) => {
    if (!activeList.length) return;
    activeIdx = (idx + activeList.length) % activeList.length;
    const item = activeList[activeIdx];
    const sourceImg = item.tagName === 'IMG' ? item : item.querySelector('img');
    if (!sourceImg) return;

    if (!imgEl) {
      imgEl = document.createElement('img');
      imgEl.className = 'mbl-lightbox-img';
      figureEl.insertBefore(imgEl, capEl);
    }

    imgEl.src = getBestSrc(sourceImg);
    imgEl.alt = sourceImg.alt || 'Fotografía de proyecto Construcciones MBL';
    altEl.textContent = sourceImg.alt || '';
    countEl.textContent = `${activeIdx + 1} / ${activeList.length}`;
    const multiple = activeList.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  };

  const openLightbox = (groupEl, targetItem) => {
    const items = Array.from(groupEl.querySelectorAll('[data-lightbox-item]'));
    if (!items.length) return;
    activeList = items;
    const idx = Math.max(0, items.indexOf(targetItem));
    renderSlide(idx);
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    closeBtn.focus();
  };

  const closeLightbox = () => {
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    if (imgEl) {
      imgEl.remove();
      imgEl = null;
    }
  };

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => renderSlide(activeIdx - 1));
  nextBtn.addEventListener('click', () => renderSlide(activeIdx + 1));

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) closeLightbox();
  });

  dialog.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      renderSlide(activeIdx - 1);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      renderSlide(activeIdx + 1);
    }
  });

  groups.forEach((groupEl) => {
    groupEl.querySelectorAll('[data-lightbox-item]').forEach((item) => {
      if (item.tagName === 'IMG') return;
      item.addEventListener('click', () => openLightbox(groupEl, item));
      item.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          openLightbox(groupEl, item);
        }
      });
    });

    const triggerEl = groupEl.querySelector('[data-lightbox-trigger]');
    if (triggerEl) {
      const openActiveSlide = () => {
        const activeSlide =
          triggerEl.querySelector('img[data-lightbox-item]:not([hidden])') ||
          triggerEl.querySelector('img[data-lightbox-item]');
        if (activeSlide) openLightbox(groupEl, activeSlide);
      };
      triggerEl.addEventListener('click', openActiveSlide);
      triggerEl.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          openActiveSlide();
        }
      });
    }
  });
})();
