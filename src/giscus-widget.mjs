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
    origin: window.location.origin,
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

  // Style the container
  el.style.marginTop = '2rem';
  el.style.paddingTop = '1.5rem';
  el.style.borderTop = '1px solid rgba(128, 128, 128, 0.3)';

  const iframe = document.createElement('iframe');
  iframe.src = `https://giscus.app/widget?${params}`;
  iframe.className = 'giscus-frame';
  iframe.title = 'Comments';
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('allow', 'clipboard-write');
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.minHeight = '150px';
  iframe.style.colorScheme = 'normal';

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
