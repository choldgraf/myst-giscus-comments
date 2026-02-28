# Paths to local dev builds (sibling repos)
mystmd := env("MYSTMD", "../mystmd/packages/mystmd/dist/myst.cjs")
mystmd_root := env("MYSTMD_ROOT", "../mystmd")
myst_theme := env("MYST_THEME", "../myst-theme")

# Build local mystmd CLI and book theme (run once, or after source changes)
setup:
    cd {{mystmd_root}} && npm run build -- --force
    cd {{myst_theme}} && make build-book || true

# Build the demo docs
docs:
    cd docs && node ../{{mystmd}} build --html

# Start a live dev server for the demo docs
docs-live:
    cd docs && node ../{{mystmd}} start --headless
