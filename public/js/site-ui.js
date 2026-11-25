// Script global unificado: animaciones de entrada, menú móvil, navbar fija y WhatsApp flotante
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveals unificados por intersección (con comprobación inicial inmediata)
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const revealIfVisible = (el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 48 && rect.bottom > -48) {
          el.classList.add('is-revealed');
          return true;
        }
        return false;
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px 0px 40px 0px' },
      );

      revealEls.forEach((el) => {
        if (!revealIfVisible(el)) io.observe(el);
      });
    }
  }

  // 2. Menú móvil tipo cajón app-like con acordeones y bloqueo de scroll
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const drawer = document.getElementById('mobile-nav-drawer');

  const isDrawerOpen = () => Boolean(drawer && drawer.getAttribute('data-open') === 'true');

  if (toggleBtn && drawer) {
    const closeBtn = drawer.querySelector('[data-nav-close]');
    const backdrop = drawer.querySelector('[data-nav-backdrop]');

    const setDrawerOpen = (open, restoreFocus) => {
      toggleBtn.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('data-open', String(open));
      drawer.hidden = !open;
      document.documentElement.classList.toggle('has-mobile-nav', open);

      if (open) {
        if (closeBtn instanceof HTMLElement) {
          closeBtn.focus({ preventScroll: true });
        }
      } else if (restoreFocus && toggleBtn instanceof HTMLElement) {
        toggleBtn.focus({ preventScroll: true });
      }
    };

    toggleBtn.addEventListener('click', () => {
      setDrawerOpen(!isDrawerOpen(), false);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => setDrawerOpen(false, true));
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => setDrawerOpen(false, true));
    }

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false, false));
    });

    // Acordeón ordenado: al abrir un grupo en móvil se pliegan los demás
    const accordions = drawer.querySelectorAll('details.mob-acc');
    accordions.forEach((acc) => {
      acc.addEventListener('toggle', () => {
        if (acc.open) {
          accordions.forEach((other) => {
            if (other !== acc) other.open = false;
          });
        }
      });
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && isDrawerOpen()) {
        setDrawerOpen(false, true);
      }
    });
  }

  // 3. Barra de navegación fija: aparece al subir y se oculta al bajar tras salir del Hero sin saltos
  const navAnchor = document.querySelector('[data-nav-anchor]');
  const navWrap = navAnchor ? navAnchor.querySelector('.nav-wrap') : null;
  const heroEl = document.querySelector('.hero');

  if (navAnchor && navWrap) {
    let cachedHeight = 0;
    let enterThreshold = 140;
    let exitThreshold = 16;
    let isSticky = false;
    let upAccum = 0;
    let downAccum = 0;
    let lastScrollY = Math.max(0, window.scrollY);

    const measureStickyBounds = () => {
      if (!navWrap.classList.contains('is-sticky')) {
        cachedHeight = navWrap.offsetHeight;
      }
      enterThreshold = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 140;
      exitThreshold = heroEl ? Math.max(16, heroEl.offsetTop + 24) : 16;
    };

    const applyStickyState = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY;
      const drawerOpen = isDrawerOpen();

      if (!isSticky && currentY > enterThreshold) {
        if (cachedHeight > 0) navAnchor.style.minHeight = cachedHeight + 'px';
        navWrap.classList.add('is-sticky', 'is-hidden');
        isSticky = true;
        upAccum = 0;
        downAccum = 0;
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (isSticky) navWrap.classList.add('is-ready');
          });
        });
      } else if (isSticky && currentY <= exitThreshold) {
        navWrap.classList.remove('is-ready', 'is-hidden', 'is-sticky');
        navAnchor.style.minHeight = '';
        isSticky = false;
        upAccum = 0;
        downAccum = 0;
      } else if (isSticky) {
        if (drawerOpen) {
          navWrap.classList.remove('is-hidden');
          upAccum = 0;
          downAccum = 0;
        } else {
          const atBottom =
            currentY + window.innerHeight >= document.documentElement.scrollHeight - 4;
          if (delta > 0) {
            downAccum += delta;
            upAccum = 0;
            if (downAccum >= 12) navWrap.classList.add('is-hidden');
          } else if (delta < 0 && !atBottom) {
            upAccum += -delta;
            downAccum = 0;
            if (upAccum >= 24) navWrap.classList.remove('is-hidden');
          }
        }
      }

      lastScrollY = currentY;
    };

    let rafId = 0;
    const scheduleStickyCheck = (remeasure) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        if (remeasure || cachedHeight === 0) measureStickyBounds();
        applyStickyState();
      });
    };

    window.addEventListener('scroll', () => scheduleStickyCheck(false), { passive: true });
    window.addEventListener('resize', () => scheduleStickyCheck(true), { passive: true });
    scheduleStickyCheck(true);
  }

  // 4. WhatsApp flotante con expansión periódica y ocultación sobre el Hero móvil
  const waBtn = document.querySelector('[data-wa-float]');
  if (waBtn && !reduceMotion) {
    const triggerExpand = () => {
      waBtn.classList.add('is-expanded');
      window.setTimeout(() => {
        waBtn.classList.remove('is-expanded');
      }, 3600);
    };
    window.setTimeout(triggerExpand, 2500);
    window.setInterval(triggerExpand, 9500);
  }

  const heroHome = document.querySelector('.hero:not(.hero-sub)');
  if (waBtn && heroHome) {
    const syncHeroWaVisibility = () => {
      const hideInHero =
        window.innerWidth <= 640 && window.scrollY < heroHome.offsetHeight * 0.55;
      waBtn.classList.toggle('is-hero-hidden', hideInHero);
    };
    window.addEventListener('scroll', syncHeroWaVisibility, { passive: true });
    window.addEventListener('resize', syncHeroWaVisibility, { passive: true });
    syncHeroWaVisibility();
  }
})();
