(() => {
  const m2Input = document.getElementById('hero-m2');
  const m2Label = document.querySelector('label[for="hero-m2"]');
  const defaults = {
    'reforma-integral': ['85', 'Superficie (m²)'],
    'reforma-cocina': ['10', 'Cocina (m²)'],
    'reforma-bano': ['5', 'Baño (m²)'],
    'plato-ducha': ['1', 'Baños (ud.)'],
    'construccion-vivienda': ['140', 'Vivienda (m²)'],
    'local-comercial': ['80', 'Local (m²)'],
    'reforma-parcial': ['40', 'Superficie (m²)'],
  };

  document.querySelector('[data-hero-num]')?.addEventListener('click', () => {
    if (!m2Input) return;
    m2Input.focus();
    m2Input.select();
  });

  const dds = Array.from(document.querySelectorAll('[data-hero-dd]'));
  const segBtns = Array.from(document.querySelectorAll('.hero-seg-btn[data-seg-v]'));

  let sheetRefs = null;
  let activeReturnFocus = null;

  const closeSheet = (restoreFocus = false) => {
    if (!sheetRefs) return;
    sheetRefs.backdrop.hidden = true;
    document.documentElement.classList.remove('has-hero-sheet');
    if (restoreFocus && activeReturnFocus) activeReturnFocus.focus();
    activeReturnFocus = null;
  };

  const createSheet = () => {
    if (sheetRefs) return sheetRefs;
    const backdrop = document.createElement('div');
    backdrop.className = 'hero-sheet-backdrop';
    backdrop.hidden = true;

    const sheet = document.createElement('div');
    sheet.className = 'hero-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'hero-sheet-title');

    const handle = document.createElement('div');
    handle.className = 'hero-sheet-handle';
    handle.setAttribute('aria-hidden', 'true');

    const head = document.createElement('div');
    head.className = 'hero-sheet-head';

    const title = document.createElement('span');
    title.id = 'hero-sheet-title';
    title.className = 'hero-sheet-title';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'hero-sheet-close';
    closeBtn.setAttribute('aria-label', 'Cerrar selector');
    closeBtn.textContent = '✕';

    const list = document.createElement('div');
    list.className = 'hero-sheet-list';
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-labelledby', 'hero-sheet-title');

    head.append(title, closeBtn);
    sheet.append(handle, head, list);
    backdrop.appendChild(sheet);
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAll(null, true);
    });
    closeBtn.addEventListener('click', () => closeAll(null, true));

    sheetRefs = { backdrop, sheet, title, closeBtn, list };
    return sheetRefs;
  };

  const closeAll = (except, restoreFocus = false) => {
    dds.forEach((d) => {
      if (d === except) return;
      d.classList.remove('is-open');
      d.querySelector('.hero-select-trigger')?.setAttribute('aria-expanded', 'false');
      const m = d.querySelector('.hero-select-menu');
      if (m) m.hidden = true;
    });
    if (!except) closeSheet(restoreFocus);
  };

  const syncSegmented = (val) => {
    segBtns.forEach((b) => {
      b.setAttribute('aria-checked', String(b.dataset.segV === val));
    });
  };

  dds.forEach((dd) => {
    const inp = dd.querySelector('input');
    const btn = dd.querySelector('.hero-select-trigger');
    const disp = dd.querySelector('[data-hd]');
    const labelEl = dd.querySelector('.field-label');
    const menu = dd.querySelector('.hero-select-menu');
    const opts = Array.from(dd.querySelectorAll('[role="option"]'));

    const pick = (opt) => {
      const val = opt.dataset.v || '';
      if (inp) inp.value = val;
      if (disp) disp.textContent = (opt.textContent || '').trim();
      opts.forEach((o) => {
        if (o === opt) o.setAttribute('aria-selected', 'true');
        else o.removeAttribute('aria-selected');
      });
      if (inp?.id === 'hero-tipo' && defaults[val] && m2Input && m2Label) {
        m2Input.value = defaults[val][0];
        m2Label.textContent = defaults[val][1];
      }
      if (inp?.id === 'hero-calidad') {
        syncSegmented(val);
      }
      toggle(false);
    };

    const openMobileSheet = () => {
      const refs = createSheet();
      const titleText = (labelEl?.textContent || '').trim() || 'Seleccionar opción';
      refs.title.textContent = titleText;
      refs.list.innerHTML = '';

      opts.forEach((opt) => {
        const val = opt.dataset.v || '';
        const selected = opt.getAttribute('aria-selected') === 'true';
        const sheetOpt = document.createElement('button');
        sheetOpt.type = 'button';
        sheetOpt.className = 'hero-sheet-opt';
        sheetOpt.setAttribute('role', 'option');
        sheetOpt.dataset.v = val;
        sheetOpt.setAttribute('aria-selected', String(selected));
        sheetOpt.textContent = (opt.textContent || '').trim();
        sheetOpt.addEventListener('click', (e) => {
          e.stopPropagation();
          pick(opt);
          btn?.focus();
        });
        refs.list.appendChild(sheetOpt);
      });

      activeReturnFocus = btn || null;
      document.documentElement.classList.add('has-hero-sheet');
      refs.backdrop.hidden = false;
      const activeOpt =
        refs.list.querySelector('[aria-selected="true"]') || refs.closeBtn;
      activeOpt?.focus?.();
    };

    const toggle = (open) => {
      if (open) closeAll(dd);

      const isMobile = window.innerWidth <= 900;
      if (open && isMobile) {
        if (menu) menu.hidden = true;
        dd.classList.add('is-open');
        btn?.setAttribute('aria-expanded', 'true');
        openMobileSheet();
        return;
      }

      if (!open) closeSheet(false);

      if (menu) {
        menu.classList.remove('open-down');
        menu.style.maxHeight = '';
        menu.hidden = !open;
      }
      dd.classList.toggle('is-open', open);
      btn?.setAttribute('aria-expanded', String(open));
    };

    dd.addEventListener('click', (e) => {
      if (e.target.closest('.hero-seg-group')) return;
      const opt = e.target.closest('[role="option"]');
      if (opt) {
        e.stopPropagation();
        pick(opt);
        btn?.focus();
      } else {
        const next = !dd.classList.contains('is-open');
        toggle(next);
        if (next && window.innerWidth > 900) btn?.focus();
      }
    });

    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') return toggle(false);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const i = opts.findIndex((o) => o.getAttribute('aria-selected') === 'true');
        const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
        pick(opts[next]);
        if (window.innerWidth > 900) toggle(true);
      }
    });
  });

  const calidadDd = document.querySelector('.field-calidad[data-hero-dd]');
  const calidadInp = document.getElementById('hero-calidad');
  const calidadDisp = calidadDd?.querySelector('[data-hd]');
  const calidadOpts = calidadDd ? Array.from(calidadDd.querySelectorAll('[role="option"]')) : [];

  segBtns.forEach((segBtn) => {
    segBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = segBtn.dataset.segV || '';
      if (calidadInp) calidadInp.value = val;
      syncSegmented(val);
      const match = calidadOpts.find((o) => o.dataset.v === val);
      if (match) {
        if (calidadDisp) calidadDisp.textContent = (match.textContent || '').trim();
        calidadOpts.forEach((o) => {
          if (o === match) o.setAttribute('aria-selected', 'true');
          else o.removeAttribute('aria-selected');
        });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheetRefs && !sheetRefs.backdrop.hidden) {
      closeAll(null, true);
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-hero-dd]') && !e.target.closest('.hero-sheet')) {
      closeAll();
    }
  });
})();
