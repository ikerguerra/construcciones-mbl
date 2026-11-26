(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = (el, dir = 0) => {
    if (reduced) return;
    el.classList.remove('is-animating', 'is-animating-next', 'is-animating-prev');
    void el.offsetWidth;
    el.classList.add(dir > 0 ? 'is-animating-next' : dir < 0 ? 'is-animating-prev' : 'is-animating');
  };

  // 1. Tabs de servicios con reinicio de carril móvil
  const tabBtns = document.querySelectorAll('[data-service-tab]');
  const servicesGrid = document.getElementById('services-cards-grid');
  const serviceCards = document.querySelectorAll('#services-cards-grid [data-service-cat]');
  const syncFirstServiceCard = () => {
    let foundFirst = false;
    serviceCards.forEach((c) => {
      const isFirst = !c.hidden && !foundFirst;
      c.classList.toggle('is-rail-first', isFirst);
      if (isFirst) foundFirst = true;
    });
  };
  syncFirstServiceCard();

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
      syncFirstServiceCard();
      if (servicesGrid) {
        servicesGrid.scrollTo({ left: 0, behavior: 'auto' });
      }
    });
  });

  // 2. Carrusel vertical Método MBL con barra de progreso y pausa al interactuar
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
    let paused = false;
    let touchResumeTimer = 0;

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
        }, 480);
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
      if (!vis || paused || reduced || document.hidden) {
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
      if (!reduced && vis && !paused && !document.hidden && !rafId) {
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

      sec.addEventListener('pointerenter', () => {
        paused = true;
        stopLoop();
      });
      sec.addEventListener('pointerleave', () => {
        paused = false;
        startLoop(false);
      });
      sec.addEventListener('focusin', () => {
        paused = true;
        stopLoop();
      });
      sec.addEventListener('focusout', () => {
        window.requestAnimationFrame(() => {
          if (!sec.contains(document.activeElement)) {
            paused = false;
            startLoop(false);
          }
        });
      });
      sec.addEventListener(
        'touchstart',
        () => {
          paused = true;
          stopLoop();
          if (touchResumeTimer) clearTimeout(touchResumeTimer);
          touchResumeTimer = window.setTimeout(() => {
            paused = false;
            startLoop(false);
          }, 4000);
        },
        { passive: true },
      );

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLoop();
        else if (vis && !paused) startLoop(false);
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

  // 3. Carril horizontal con peek y auto-avance silencioso para Proyectos Destacados
  function initSnapCarousel({ trackSel, itemSel, prevSel, nextSel, ms }) {
    const track = document.querySelector(trackSel);
    if (!track) return;
    const items = Array.from(track.querySelectorAll(itemSel));
    if (items.length <= 1) return;

    const prevBtn = document.querySelector(prevSel);
    const nextBtn = document.querySelector(nextSel);

    let vis = false;
    let paused = false;
    let tid;
    let pauseTimer = 0;

    const scrollByDir = (dir) => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (maxScroll <= 4) return;

      let currentIdx = 0;
      if (track.scrollLeft > 12) {
        const viewCenter = track.scrollLeft + track.clientWidth / 2;
        let bestDist = Infinity;
        items.forEach((el, idx) => {
          const elCenter = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(elCenter - viewCenter);
          if (d < bestDist) {
            bestDist = d;
            currentIdx = idx;
          }
        });
      }

      const targetIdx = (currentIdx + dir + items.length) % items.length;
      const targetEl = items[targetIdx];
      const targetLeft =
        targetIdx === 0
          ? 0
          : Math.max(
              0,
              Math.min(
                maxScroll,
                targetEl.offsetLeft - (track.clientWidth - targetEl.offsetWidth) / 2,
              ),
            );
      const behavior = reduced ? 'auto' : 'smooth';
      track.scrollTo({ left: targetLeft, behavior });
    };

    const stop = () => {
      if (tid !== undefined) {
        clearInterval(tid);
        tid = undefined;
      }
    };

    const start = () => {
      stop();
      if (!reduced && vis && !paused && !document.hidden) {
        tid = window.setInterval(() => scrollByDir(1), ms);
      }
    };

    const pauseTemporarily = (delayMs = 4500) => {
      paused = true;
      stop();
      if (pauseTimer) clearTimeout(pauseTimer);
      pauseTimer = window.setTimeout(() => {
        paused = false;
        start();
      }, delayMs);
    };

    new IntersectionObserver(
      (entries) => {
        vis = entries[0]?.isIntersecting ?? false;
        if (vis) start();
        else stop();
      },
      { threshold: 0.25 },
    ).observe(track);

    track.addEventListener('pointerenter', () => {
      paused = true;
      stop();
    });
    track.addEventListener('pointerleave', () => {
      paused = false;
      start();
    });
    track.addEventListener('focusin', () => {
      paused = true;
      stop();
    });
    track.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        if (!track.contains(document.activeElement)) {
          paused = false;
          start();
        }
      });
    });
    track.addEventListener('touchstart', () => pauseTemporarily(5000), { passive: true });
    track.addEventListener('wheel', () => pauseTemporarily(4500), { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (vis && !paused) start();
    });

    prevBtn?.addEventListener('click', () => {
      scrollByDir(-1);
      pauseTemporarily(5500);
    });
    nextBtn?.addEventListener('click', () => {
      scrollByDir(1);
      pauseTemporarily(5500);
    });
  }

  // 4. Carrusel simple para Testimonios con pausa al interactuar
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
    let paused = false;
    let touchTimer = 0;

    const stop = () => {
      if (tid !== undefined) {
        clearInterval(tid);
        tid = undefined;
      }
    };

    const start = () => {
      stop();
      if (!reduced && vis && !paused && !document.hidden) {
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

      sec.addEventListener('pointerenter', () => {
        paused = true;
        stop();
      });
      sec.addEventListener('pointerleave', () => {
        paused = false;
        start();
      });
      sec.addEventListener('focusin', () => {
        paused = true;
        stop();
      });
      sec.addEventListener('focusout', () => {
        window.requestAnimationFrame(() => {
          if (!sec.contains(document.activeElement)) {
            paused = false;
            start();
          }
        });
      });
      sec.addEventListener(
        'touchstart',
        () => {
          paused = true;
          stop();
          if (touchTimer) clearTimeout(touchTimer);
          touchTimer = window.setTimeout(() => {
            paused = false;
            start();
          }, 4500);
        },
        { passive: true },
      );

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (vis && !paused) start();
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

  initSnapCarousel({
    trackSel: '#choice-projects-grid',
    itemSel: '[data-choice-idx]',
    prevSel: '[data-proj-prev]',
    nextSel: '[data-proj-next]',
    ms: 5500,
  });

  initSimpleCarousel('.testi', '.testi-slide', '[data-testi-prev]', '[data-testi-next]', 8500);
})();
