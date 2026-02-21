document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Auto-Detection and Toggling
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // If a theme was specifically saved, respect it. Otherwise, use system preference.
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const theme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });
  }

  // 2. SPA-like Transitions (View Transitions API / Fetch)
  async function navigateTo(url) {
    try {
      const response = await fetch(url.pathname);
      const htmlString = await response.text();

      const parser = new DOMParser();
      const newDoc = parser.parseFromString(htmlString, 'text/html');

      const updateDOM = () => {
        const currentMain = document.querySelector('main');
        const newMain = newDoc.querySelector('main');
        if (currentMain && newMain) currentMain.innerHTML = newMain.innerHTML;

        document.title = newDoc.title;

        const currentNav = document.querySelector('nav');
        const newNav = newDoc.querySelector('nav');
        if (currentNav && newNav) currentNav.innerHTML = newNav.innerHTML;

        const currentHeader = document.querySelector('header h1');
        const newHeader = newDoc.querySelector('header h1');
        if (currentHeader && newHeader) currentHeader.innerHTML = newHeader.innerHTML;

        const currentHeaderP = document.querySelector('header p');
        const newHeaderP = newDoc.querySelector('header p');
        if (currentHeaderP && newHeaderP) currentHeaderP.innerHTML = newHeaderP.innerHTML;

        window.history.pushState({}, '', url.pathname);

        // Notify other scripts that the page content has changed
        window.dispatchEvent(new Event("spa-navigate"));
      };

      if (document.startViewTransition) {
        document.startViewTransition(() => updateDOM());
      } else {
        updateDOM();
      }
    } catch (error) {
      console.error("Navigation failed:", error);
      window.location.href = url.pathname;
    }
  }

  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a.nav-link, a.nav-link-underlined');
    if (link) {
      const href = link.getAttribute('href');
      if (href.startsWith('http') || href.startsWith('#')) return;
      e.preventDefault();
      navigateTo(new URL(link.href));
    }
  });

  window.addEventListener('popstate', async () => {
    navigateTo(new URL(window.location.href));
  });
});
