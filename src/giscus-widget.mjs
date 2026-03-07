/**
 * AnyWidget ESM module that injects the official giscus client.js script.
 *
 * We use anywidget as a hook to run JavaScript at render time, but giscus's
 * script tag won't execute inside anywidget's shadow DOM. So we escape the
 * shadow root, place a container in the main DOM, and let giscus take over.
 * This gives us full giscus functionality (OAuth, live updates, resizing)
 * without reimplementing any of it.
 *
 * Because we inject outside React's DOM tree, we guard against duplicates
 * (from re-renders) and use a MutationObserver to clean up if React removes
 * the host element without triggering our cleanup (e.g. client-side navigation).
 */
function render({ model, el }) {
  const isDark = document.documentElement.dataset.theme === 'dark';

  // Escape the shadow DOM: place a .giscus container in the main document
  // right after the anywidget host element, then hide the empty host.
  const host = el.getRootNode().host;

  // Guard against duplicate containers from React re-renders
  if (host.nextElementSibling?.classList.contains('giscus')) {
    return;
  }

  const container = document.createElement('div');
  container.className = 'giscus'; // giscus client.js looks for this class
  container.style.marginTop = '2rem';
  container.style.paddingTop = '1.5rem';
  container.style.borderTop = '1px solid rgba(128, 128, 128, 0.3)';
  host.parentNode.insertBefore(container, host.nextSibling);
  host.style.display = 'none';

  // Inject the official giscus script with data-* attributes.
  // See https://giscus.app for configuration options.
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.async = true;
  script.setAttribute('crossorigin', 'anonymous');
  for (const [key, value] of Object.entries({
    repo: model.get('repo'),
    'repo-id': model.get('repoId'),
    category: model.get('category'),
    'category-id': model.get('categoryId'),
    mapping: 'pathname',
    strict: '0',
    'reactions-enabled': '1',
    'emit-metadata': '0',
    'input-position': 'top',
    theme: isDark ? 'transparent_dark' : 'light',
    lang: model.get('lang') || 'en',
  })) {
    script.setAttribute(`data-${key}`, value);
  }
  container.appendChild(script);

  // Watch for React removing the host element (e.g. client-side navigation).
  // If the host disappears from the DOM, clean up our container too.
  const observer = new MutationObserver(() => {
    if (!host.isConnected) {
      container.remove();
      observer.disconnect();
    }
  });
  observer.observe(host.parentNode, { childList: true });

  return () => {
    container.remove();
    observer.disconnect();
  };
}

export default { render };
