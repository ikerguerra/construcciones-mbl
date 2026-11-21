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

  // 2. Carruseles con animación direccional y autoplay en viewport
  function initCarousel(secSel, itemSel, prevSel, nextSel, ms, perPage = 1) {
    const items = Array.from(document.querySelectorAll(itemSel));
    const pages = Math.ceil(items.length / perPage);
    if (pages <= 1) return;
    let page = 0;

    const go = (next, dir) => {
      page = (next + pages) % pages;
      items.forEach((el, i) => {
        const on = Math.floor(i / perPage) === page;
        el.hidden = !on;
        if (on) anim(el, dir);
      });
    };

    const sec = document.querySelector(secSel);
    let tid;
    let vis = false;
    let paused = false;

    const stop = () => {
      if (tid !== undefined) {
        clearInterval(tid);
        tid = undefined;
      }
    };

    const start = () => {
      stop();
      if (!reduced && vis && !paused) {
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
        { threshold: 0.35 },
      ).observe(sec);

      sec.addEventListener('mouseenter', () => {
        paused = true;
        stop();
      });
      sec.addEventListener('mouseleave', () => {
        paused = false;
        start();
      });
      sec.addEventListener('focusin', () => {
        paused = true;
        stop();
      });
      sec.addEventListener('focusout', () => {
        paused = false;
        start();
      });
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

  initCarousel('.dark', '.method-step', '[data-method-prev]', '[data-method-next]', 7500);
  initCarousel('#choice-projects-grid', '#choice-projects-grid [data-choice-idx]', '[data-proj-prev]', '[data-proj-next]', 6500, 2);
  initCarousel('.gallery-section', '#gallery-main-slides [data-gal-idx]', '[data-gal-prev]', '[data-gal-next]', 5000);
  initCarousel('.testi', '.testi-slide', '[data-testi-prev]', '[data-testi-next]', 8500);
})();
