(() => {
  const m2Input = document.getElementById('hero-m2');
  const m2Label = document.querySelector('label[for="hero-m2"]');
  const defaults = {
    'reforma-integral': ['85', 'Superficie aprox. (m²)'],
    'reforma-cocina': ['10', 'Superficie cocina (m²)'],
    'reforma-bano': ['5', 'Superficie baño (m²)'],
    'plato-ducha': ['1', 'N.º de baños (ud.)'],
    'construccion-vivienda': ['140', 'Superficie vivienda (m²)'],
    'local-comercial': ['80', 'Superficie local (m²)'],
    'reforma-parcial': ['40', 'Superficie actuación (m²)'],
  };

  document.querySelector('[data-hero-num]')?.addEventListener('click', () => {
    if (!m2Input) return;
    m2Input.focus();
    m2Input.select();
  });

  const dds = Array.from(document.querySelectorAll('[data-hero-dd]'));
  const closeAll = (except) => {
    dds.forEach((d) => {
      if (d === except) return;
      d.classList.remove('is-open');
      d.querySelector('.hero-select-trigger')?.setAttribute('aria-expanded', 'false');
      const m = d.querySelector('.hero-select-menu');
      if (m) m.hidden = true;
    });
  };

  dds.forEach((dd) => {
    const inp = dd.querySelector('input');
    const btn = dd.querySelector('.hero-select-trigger');
    const disp = dd.querySelector('[data-hd]');
    const menu = dd.querySelector('.hero-select-menu');
    const opts = Array.from(dd.querySelectorAll('[role="option"]'));

    const toggle = (open) => {
      if (open) closeAll(dd);
      dd.classList.toggle('is-open', open);
      btn?.setAttribute('aria-expanded', String(open));
      if (menu) menu.hidden = !open;
    };

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
      toggle(false);
    };

    dd.addEventListener('click', (e) => {
      const opt = e.target.closest('[role="option"]');
      if (opt) {
        e.stopPropagation();
        pick(opt);
        btn?.focus();
      } else {
        const next = !dd.classList.contains('is-open');
        toggle(next);
        if (next) btn?.focus();
      }
    });

    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') return toggle(false);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const i = opts.findIndex((o) => o.getAttribute('aria-selected') === 'true');
        const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
        pick(opts[next]);
        toggle(true);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-hero-dd]')) closeAll();
  });
})();
