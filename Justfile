# Build the demo docs
docs:
    cd docs && myst build --html

# Start a live dev server for the demo docs
docs-live:
    cd docs && myst start
