/**
 * MyST plugin that adds Giscus comments to every page.
 *
 * Appends an anywidget node to each page's AST. At render time, the widget
 * (giscus-widget.mjs) injects the official giscus client.js script, which
 * handles all comment functionality including OAuth and live updates.
 *
 * Configure giscus by editing GISCUS_CONFIG below.
 * Use https://giscus.app to find your repoId and categoryId.
 */

const GISCUS_CONFIG = {
  repo: 'choldgraf/myst-giscus-comments',
  repoId: 'R_kgDORavRfw',
  category: 'Announcements',
  categoryId: 'DIC_kwDORavRf84C3XfM',
  lang: 'en',
};

const giscusTransform = {
  name: 'giscus-comments',
  doc: 'Appends a giscus comments widget to every page.',
  stage: 'document',
  plugin: () => (tree) => {
    tree.children.push({
      type: 'anywidget',
      esm: '../src/giscus-widget.mjs',
      model: { ...GISCUS_CONFIG },
    });
  },
};

export default { name: 'Giscus Comments', transforms: [giscusTransform] };
