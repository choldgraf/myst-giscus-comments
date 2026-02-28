/**
 * AnyWidget ESM module that renders a giscus comments iframe.
 *
 * Config is passed via the anywidget model (set by the giscus.mjs transform).
 * The iframe URL is built from model parameters + the current page pathname.
 */
function render({ model, el }) {
  const repo = model.get('repo');
  const repoId = model.get('repoId');
  const category = model.get('category');
  const categoryId = model.get('categoryId');
  const theme = model.get('theme') || 'preferred_color_scheme';
  const lang = model.get('lang') || 'en';

  // Build the giscus iframe URL
  const term = window.location.pathname;
  const params = new URLSearchParams({
    repo,
    repoId,
    category,
    categoryId,
    mapping: 'specific',
    term,
    strict: '1',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme,
    lang,
  });

  const iframe = document.createElement('iframe');
  iframe.src = `https://giscus.app/widget?${params}`;
  iframe.setAttribute('scrolling', 'no');
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.minHeight = '150px';

  el.appendChild(iframe);

  // Listen for giscus postMessage events to resize the iframe
  function handleMessage(event) {
    if (event.origin !== 'https://giscus.app') return;
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data.giscus && data.giscus.resizeHeight) {
        iframe.style.height = `${data.giscus.resizeHeight}px`;
      }
    } catch {
      // Ignore non-JSON messages
    }
  }

  window.addEventListener('message', handleMessage);

  // Cleanup when widget is removed
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}

export default { render };
