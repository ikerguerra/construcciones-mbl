(() => {
  const wraps = [];

  function closeAll(exceptWrap) {
    wraps.forEach((w) => {
      if (w === exceptWrap) return;
      w.classList.remove('is-open', 'open-up');
      const t = w.querySelector('.mbl-select-trigger');
      const m = w.querySelector('.mbl-select-menu');
      if (t) t.setAttribute('aria-expanded', 'false');
      if (m) m.hidden = true;
    });
  }

  function syncSelect(select, wrap) {
    const valSpan = wrap.querySelector('.mbl-select-value');
    const items = Array.from(wrap.querySelectorAll('.mbl-select-menu li'));
    const curVal = select.value;
    const selectedOpt = select.options[select.selectedIndex] || select.options[0];
    if (valSpan && selectedOpt) {
      valSpan.textContent = selectedOpt.textContent ? selectedOpt.textContent.trim() : '';
    }
    items.forEach((li) => {
      if (li.dataset.value === curVal) li.setAttribute('aria-selected', 'true');
      else li.removeAttribute('aria-selected');
    });
  }

  function syncAll() {
    document.querySelectorAll('select[data-mbl-enhanced="true"]').forEach((sel) => {
      const wrap = sel.closest('.mbl-select-wrap');
      if (wrap) syncSelect(sel, wrap);
    });
  }

  function enhanceSelect(select) {
    if (select.hasAttribute('data-native-select') || select.dataset.mblEnhanced === 'true') {
      return;
    }
    if (!select.options || select.options.length === 0) return;

    select.dataset.mblEnhanced = 'true';

    const wrap = document.createElement('div');
    wrap.className = 'mbl-select-wrap';
    if (select.className) {
      wrap.dataset.sourceClass = select.className;
    }

    const parent = select.parentNode;
    if (!parent) return;
    parent.insertBefore(wrap, select);
    wrap.appendChild(select);

    select.classList.add('mbl-select-native');
    select.setAttribute('tabindex', '-1');
    select.setAttribute('aria-hidden', 'true');

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'mbl-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const labelEl = select.id
      ? document.querySelector(`label[for="${CSS.escape(select.id)}"]`)
      : null;
    if (labelEl) {
      if (!labelEl.id) {
        labelEl.id = `${select.id}-mbl-lbl`;
      }
      trigger.setAttribute('aria-labelledby', labelEl.id);
    } else if (select.getAttribute('aria-label')) {
      trigger.setAttribute('aria-label', select.getAttribute('aria-label'));
    }

    const valSpan = document.createElement('span');
    valSpan.className = 'mbl-select-value';

    const chev = document.createElement('span');
    chev.className = 'mbl-select-chev';
    chev.setAttribute('aria-hidden', 'true');

    trigger.appendChild(valSpan);
    trigger.appendChild(chev);

    const menu = document.createElement('ul');
    menu.className = 'mbl-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    if (labelEl?.id) {
      menu.setAttribute('aria-labelledby', labelEl.id);
    }

    const optionsList = [];
    Array.from(select.options).forEach((opt) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.dataset.value = opt.value;
      li.textContent = opt.textContent ? opt.textContent.trim() : '';
      if (opt.disabled) {
        li.setAttribute('aria-disabled', 'true');
      }
      menu.appendChild(li);
      optionsList.push(li);
    });

    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    wraps.push(wrap);

    function setOpen(open) {
      if (open) {
        closeAll(wrap);
        syncSelect(select, wrap);
        const rect = wrap.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        wrap.classList.toggle('open-up', spaceBelow < 260 && spaceAbove > spaceBelow);
      } else {
        wrap.classList.remove('open-up');
      }
      wrap.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    }

    function pickOption(li) {
      if (li.getAttribute('aria-disabled') === 'true') return;
      const val = li.dataset.value ?? '';
      if (select.value !== val) {
        select.value = val;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        syncSelect(select, wrap);
      }
      setOpen(false);
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!wrap.classList.contains('is-open'));
    });

    if (labelEl) {
      labelEl.style.cursor = 'pointer';
      labelEl.addEventListener('click', (e) => {
        e.preventDefault();
        trigger.focus();
        setOpen(!wrap.classList.contains('is-open'));
      });
    }

    menu.addEventListener('click', (e) => {
      const li = e.target.closest('li[role="option"]');
      if (!li) return;
      e.stopPropagation();
      pickOption(li);
      trigger.focus();
    });

    trigger.addEventListener('keydown', (e) => {
      const isOpen = wrap.classList.contains('is-open');
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!isOpen);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const enabled = optionsList.filter((li) => li.getAttribute('aria-disabled') !== 'true');
        if (enabled.length === 0) return;
        const curIdx = enabled.findIndex((li) => li.getAttribute('aria-selected') === 'true');
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const nextIdx = curIdx === -1 ? 0 : (curIdx + delta + enabled.length) % enabled.length;
        pickOption(enabled[nextIdx]);
        setOpen(true);
      }
    });

    select.addEventListener('change', () => syncSelect(select, wrap));
    syncSelect(select, wrap);
  }

  function initAll() {
    document.querySelectorAll('select').forEach(enhanceSelect);
    window.setTimeout(syncAll, 0);
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mbl-select-wrap')) {
      closeAll(null);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
