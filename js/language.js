/**
 * AYPDA - Bilingual Language Switcher (English <-> Hindi)
 * Preserves corresponding page path across /en/ and /hi/
 */

function switchLanguage(targetLang) {
  const currentPath = window.location.pathname;
  let newPath = '';

  // Store user language preference
  try {
    localStorage.setItem('aypda_pref_lang', targetLang);
  } catch (e) {
    // LocalStorage fallback
  }

  // Determine current page filename (e.g. index.html, about.html, etc.)
  const pathParts = currentPath.split('/').filter(p => p.length > 0);
  let fileName = 'index.html';

  if (pathParts.length > 0) {
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart.endsWith('.html')) {
      fileName = lastPart;
    }
  }

  // Check if we are inside /en/ or /hi/
  if (currentPath.includes('/en/')) {
    if (targetLang === 'hi') {
      newPath = currentPath.replace('/en/', '/hi/');
    } else {
      return; // Already in en
    }
  } else if (currentPath.includes('/hi/')) {
    if (targetLang === 'en') {
      newPath = currentPath.replace('/hi/', '/en/');
    } else {
      return; // Already in hi
    }
  } else {
    // Root or other folder
    newPath = targetLang === 'hi' ? `hi/${fileName}` : `en/${fileName}`;
  }

  window.location.href = newPath;
}

// Bind language toggle buttons
document.addEventListener('DOMContentLoaded', () => {
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-target-lang');
      if (targetLang) {
        switchLanguage(targetLang);
      }
    });
  });
});
