(function () {
  var STORAGE_KEY = 'mbl_consent_v1';
  var MAX_CONSENT_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 12 meses (Guía AEPD)

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });

  var cfg = window.__MBL_ANALYTICS_CFG__ || {};
  var gtmId = cfg.gtmId || '';
  var ga4Id = cfg.ga4Id || '';
  var analyticsLoaded = false;

  function loadOwnAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    if (gtmId) {
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId);
      document.head.appendChild(gtmScript);
    }

    if (ga4Id && !gtmId) {
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4Id);
      document.head.appendChild(gaScript);
      gtag('js', new Date());
      gtag('config', ga4Id, { anonymize_ip: true });
    }
  }

  function clearAnalyticsCookies() {
    if (!document.cookie) return;
    var host = window.location.hostname;
    var parts = host.split('.');
    var domains = ['', host];
    if (parts.length >= 2) {
      domains.push('.' + parts.slice(-2).join('.'));
      domains.push('.' + host);
    }
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var name = cookies[i].split('=')[0].trim();
      if (!name) continue;
      if (name === '_ga' || name === '_gid' || name === '_gat' || name.indexOf('_ga_') === 0) {
        for (var j = 0; j < domains.length; j++) {
          var domAttr = domains[j] ? '; domain=' + domains[j] : '';
          document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domAttr + '; SameSite=Lax';
        }
      }
    }
  }

  function applyConsent(analyticsGranted, persist) {
    gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    if (analyticsGranted) {
      loadOwnAnalytics();
    } else {
      clearAnalyticsCookies();
    }

    if (persist) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ analytics: analyticsGranted, updatedAt: new Date().toISOString() })
        );
      } catch (_e) {}
    }
  }

  var banner = document.getElementById('mbl-cookie-banner');
  var prefsPanel = document.getElementById('cookie-prefs-panel');
  var optAnalytics = document.getElementById('cookie-opt-analytics');
  var saveBtn = document.getElementById('cookie-save-prefs');
  var configBtn = document.getElementById('cookie-toggle-prefs');

  function setPrefsOpen(open) {
    if (!prefsPanel || !saveBtn || !configBtn) return;
    prefsPanel.hidden = !open;
    saveBtn.hidden = !open;
    configBtn.setAttribute('aria-expanded', String(open));
  }

  function showBanner(expandPrefs) {
    if (!banner) return;
    banner.hidden = false;
    document.documentElement.classList.add('has-cookie-banner');
    if (expandPrefs) {
      setPrefsOpen(true);
      try {
        banner.focus();
      } catch (_e) {}
    }
  }

  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    setPrefsOpen(false);
    document.documentElement.classList.remove('has-cookie-banner');
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      var updatedMs = parsed && parsed.updatedAt ? Date.parse(parsed.updatedAt) : NaN;
      if (!Number.isFinite(updatedMs) || Date.now() - updatedMs > MAX_CONSENT_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        showBanner(false);
      } else {
        if (optAnalytics) optAnalytics.checked = Boolean(parsed.analytics);
        applyConsent(Boolean(parsed.analytics), false);
      }
    } else {
      showBanner(false);
    }
  } catch (_e) {
    showBanner(false);
  }

  document.getElementById('cookie-accept-all')?.addEventListener('click', function () {
    if (optAnalytics) optAnalytics.checked = true;
    applyConsent(true, true);
    hideBanner();
  });

  document.getElementById('cookie-reject-all')?.addEventListener('click', function () {
    if (optAnalytics) optAnalytics.checked = false;
    applyConsent(false, true);
    hideBanner();
  });

  configBtn?.addEventListener('click', function () {
    if (prefsPanel) {
      setPrefsOpen(prefsPanel.hidden);
    }
  });

  saveBtn?.addEventListener('click', function () {
    var granted = Boolean(optAnalytics && optAnalytics.checked);
    applyConsent(granted, true);
    hideBanner();
  });

  document.querySelectorAll('[data-open-cookies]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showBanner(true);
    });
  });

  // Eventos limpios de conversión para teléfono y WhatsApp
  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest('[data-track]') : null;
    if (!el) return;
    var kind = el.getAttribute('data-track');
    if (kind === 'tel') {
      window.dataLayer.push({ event: 'click_telefono' });
    } else if (kind === 'wa') {
      window.dataLayer.push({ event: 'click_whatsapp' });
    }
  });
})();
