(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = (el, dir = 0) => {
    el.classList.remove('is-animating', 'is-animating-next', 'is-animating-prev');
    void el.offsetWidth;
    el.classList.add(dir > 0 ? 'is-animating-next' : dir < 0 ? 'is-animating-prev' : 'is-animating');
  };

  // 1. Tabs de servicios
  const tabBtns = document.querySelectorAll('[data-service-tab]');
  const serviceCards = document.querySelectorAll('#services-cards-grid [data-service-cat]');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.serviceTab || 'todos';
      tabBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-selected', String(on));
      });
      serviceCards.forEach((c) => {
        const show = cat === 'todos' || c.dataset.serviceCat === cat;
        c.hidden = !show;
        if (show) anim(c, 0);
      });
    });
  });

  // 2. Carruseles avanzados con transición entrada/salida y barra de progreso en viewport
  function initAnimatedCarousel({
    secSel,
    itemSel,
    prevSel,
    nextSel,
    progressSel,
    dotSel,
    ms,
    perPage = 1,
    axis = 'vertical',
  }) {
    const items = Array.from(document.querySelectorAll(itemSel));
    const pages = Math.ceil(items.length / perPage);
    if (pages <= 1) return;

    const progressBar = progressSel ? document.querySelector(progressSel) : null;
    const dots = dotSel ? Array.from(document.querySelectorAll(dotSel)) : [];
    const animClasses = [
      'anim-v-in-next',
      'anim-v-out-next',
      'anim-v-in-prev',
      'anim-v-out-prev',
      'anim-h-in-next',
      'anim-h-out-next',
      'anim-h-in-prev',
      'anim-h-out-prev',
    ];
    const prefix = axis === 'vertical' ? 'anim-v' : 'anim-h';

    let page = 0;
    let leaveTimer;

    const updateDots = (currentPage) => {
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === currentPage));
    };

    const go = (next, dir) => {
      const nextPage = (next + pages) % pages;
      if (nextPage === page) return;

      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = undefined;
      }

      const prevPage = page;
      page = nextPage;
      updateDots(page);

      const inClass = dir >= 0 ? `${prefix}-in-next` : `${prefix}-in-prev`;
      const outClass = dir >= 0 ? `${prefix}-out-next` : `${prefix}-out-prev`;

      items.forEach((el, i) => {
        el.classList.remove(...animClasses, 'is-leaving');
        const pIdx = Math.floor(i / perPage);
        if (pIdx === page) {
          el.classList.add('is-active');
          el.setAttribute('aria-hidden', 'false');
          if (!reduced) {
            void el.offsetWidth;
            el.classList.add(inClass);
          }
        } else if (pIdx === prevPage && !reduced) {
          el.classList.remove('is-active');
          el.classList.add('is-leaving', outClass);
          el.setAttribute('aria-hidden', 'true');
        } else {
          el.classList.remove('is-active');
          el.setAttribute('aria-hidden', 'true');
        }
      });

      if (!reduced) {
        leaveTimer = window.setTimeout(() => {
          items.forEach((el) => {
            el.classList.remove('is-leaving', ...animClasses);
          });
        }, 540);
      }
    };

    const sec = document.querySelector(secSel);
    let vis = false;
    let elapsed = 0;
    let lastTs = 0;
    let rafId = 0;

    const renderProgress = (ratio) => {
      if (progressBar) {
        progressBar.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTs = 0;
    };

    const tick = (now) => {
      if (!vis || reduced || document.hidden) {
        stopLoop();
        return;
      }
      if (!lastTs) lastTs = now;
      const dt = Math.min(now - lastTs, 150);
      lastTs = now;
      elapsed += dt;

      if (elapsed >= ms) {
        elapsed = 0;
        go(page + 1, 1);
      }
      renderProgress(elapsed / ms);
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = (reset = false) => {
      if (reset) {
        elapsed = 0;
        renderProgress(0);
      }
      if (!reduced && vis && !document.hidden && !rafId) {
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    if (sec && !reduced) {
      new IntersectionObserver(
        (entries) => {
          vis = entries[0]?.isIntersecting ?? false;
          if (vis) startLoop(false);
          else stopLoop();
        },
        { threshold: 0.2 },
      ).observe(sec);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLoop();
        else if (vis) startLoop(false);
      });
    }

    document.querySelector(prevSel)?.addEventListener('click', () => {
      go(page - 1, -1);
      startLoop(true);
    });
    document.querySelector(nextSel)?.addEventListener('click', () => {
      go(page + 1, 1);
      startLoop(true);
    });
  }

  // 3. Carruseles simples para galería y testimonios
  function initSimpleCarousel(secSel, itemSel, prevSel, nextSel, ms) {
    const items = Array.from(document.querySelectorAll(itemSel));
    if (items.length <= 1) return;
    let page = 0;

    const go = (next, dir) => {
      page = (next + items.length) % items.length;
      items.forEach((el, i) => {
        const on = i === page;
        el.hidden = !on;
        if (on) anim(el, dir);
      });
    };

    const sec = document.querySelector(secSel);
    let tid;
    let vis = false;

    const stop = () => {
      if (tid !== undefined) {
        clearInterval(tid);
        tid = undefined;
      }
    };

    const start = () => {
      stop();
      if (!reduced && vis && !document.hidden) {
        tid = window.setInterval(() => go(page + 1, 1), ms);
      }
    };

    if (sec && !reduced) {
      new IntersectionObserver(
        (entries) => {
          vis = entries[0]?.isIntersecting ?? false;
          if (vis) start();
          else stop();
        },
        { threshold: 0.25 },
      ).observe(sec);
    }

    document.querySelector(prevSel)?.addEventListener('click', () => {
      go(page - 1, -1);
      start();
    });
    document.querySelector(nextSel)?.addEventListener('click', () => {
      go(page + 1, 1);
      start();
    });
  }

  initAnimatedCarousel({
    secSel: '.dark',
    itemSel: '.method-step',
    prevSel: '[data-method-prev]',
    nextSel: '[data-method-next]',
    progressSel: '[data-method-progress]',
    dotSel: '[data-method-dot]',
    ms: 6500,
    perPage: 1,
    axis: 'vertical',
  });

  initAnimatedCarousel({
    secSel: '#choice-projects-grid',
    itemSel: '#choice-projects-grid [data-choice-idx]',
    prevSel: '[data-proj-prev]',
    nextSel: '[data-proj-next]',
    progressSel: '[data-proj-progress]',
    ms: 6000,
    perPage: 2,
    axis: 'horizontal',
  });

  initSimpleCarousel('.gallery-section', '#gallery-main-slides [data-gal-idx]', '[data-gal-prev]', '[data-gal-next]', 5500);
  initSimpleCarousel('.testi', '.testi-slide', '[data-testi-prev]', '[data-testi-next]', 8500);
})();
