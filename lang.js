// =============================================
// LANGUAGE SWITCHER
// =============================================
(function () {
  const STORAGE_KEY = 'rs_lang';
  const DEFAULT_LANG = 'en';

  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
    catch (e) { return DEFAULT_LANG; }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';

    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      // Handle innerHTML vs innerText — use innerHTML to support <b>, <span>, etc.
      el.innerHTML = el.getAttribute('data-' + lang);
    });

    // Update toggle button label
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'pt' ? 'EN' : 'PT';
      btn.setAttribute('data-current', lang);
    }
  }

  function toggleLang() {
    const btn = document.getElementById('lang-toggle');
    const current = btn ? btn.getAttribute('data-current') : getStoredLang();
    const next = current === 'pt' ? 'en' : 'pt';
    setLang(next);
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', toggleLang);
    }
    setLang(getStoredLang());
  });
})();
