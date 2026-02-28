# myst-giscus

A MyST plugin that adds [Giscus](https://giscus.app) comments to every page of a MyST site using [anywidget](https://mystmd.org/guide/widgets).

## Setup

1. Install the [giscus GitHub App](https://github.com/apps/giscus) on a public repo with Discussions enabled.
2. Get your `repoId` and `categoryId` from <https://giscus.app>.
3. Edit the `GISCUS_CONFIG` in `src/giscus.mjs` with your values.
4. Copy `src/giscus.mjs` and `src/giscus-widget.mjs` into your MyST project and add the plugin to your `myst.yml`:

```yaml
project:
  plugins:
    - giscus.mjs
```

## Demo

```sh
just docs       # build the demo site
just docs-live  # start a live dev server
```
