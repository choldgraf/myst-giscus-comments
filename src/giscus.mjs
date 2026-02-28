/**
 * MyST plugin that adds Giscus comments to every page.
 *
 * Uses a transform to inject an anywidget node at the bottom of each page.
 * The widget renders a giscus iframe using giscus-widget.mjs.
 *
 * Configure giscus by editing the GISCUS_CONFIG object below.
 * Get your repo ID and category ID from https://giscus.app
 */

// ---- Giscus Configuration ----
// Edit these values for your repository.
// Use https://giscus.app to find your repoId and categoryId.
const GISCUS_CONFIG = {
  repo: 'choldgraf/myst-giscus-comments',
  repoId: 'R_kgDORavRfw',
  category: 'Announcements',
  categoryId: 'DIC_kwDORavRf84C3XfM',
  theme: 'preferred_color_scheme',
  lang: 'en',
};

let counter = 0;

const giscusTransform = {
  name: 'giscus-comments',
  doc: 'Appends a giscus comments widget to every page.',
  stage: 'document',
  plugin: (opts, utils) => (tree) => {
    const id = `giscus-${counter++}-${Date.now()}`;
    tree.children.push({
      type: 'anywidget',
      esm: '../src/giscus-widget.mjs',
      model: { ...GISCUS_CONFIG },
      id,
    });
  },
};

const plugin = {
  name: 'Giscus Comments',
  transforms: [giscusTransform],
};

export default plugin;
