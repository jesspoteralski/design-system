# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Dev server with live reload
npm run build          # Production build → /dist
npm test               # Run tests once with coverage
npm run test:watch     # Run tests in watch mode
npm run lint           # Check lint/formatting (read-only)
npm run format         # Auto-fix lint and formatting
npm run storybook      # Storybook dev server on port 8080
npm run storybook:build # Build static Storybook site
npm run analyze        # Regenerate custom-elements.json manifest
```

Tests run on compiled output, so TypeScript must compile first. `test:watch` handles this automatically; for a one-shot run, `npm test` uses the existing `out-tsc/` output.

## Architecture

This is a **Lit-based Web Components** library scaffolded with Open-wc. It exports a single custom element `<design-system>` as a starting point.

**Build pipeline:**
```
src/*.ts → tsc → out-tsc/ → rollup → dist/
                   ↓
              out-tsc/test/   (test runner input)
              out-tsc/stories/ (Storybook input)
```

Key point: the dev server, test runner, and Storybook all consume the TypeScript-compiled output in `out-tsc/`, not the source directly. Always ensure TypeScript is compiled before running tests or Storybook manually.

**Component pattern** (`src/design-system.ts`):
- Extends `LitElement` with `@customElement` decorator to auto-register
- Reactive props declared with `@property`
- Styles scoped via `static styles = css\`...\`` (Shadow DOM)
- CSS custom properties (e.g. `--design-system-background-color`) are the API for external styling

**Testing** (`test/*.test.ts`):
- Framework: Web Test Runner + @open-wc/testing (Mocha/Chai)
- Use `fixture(html\`...\`)` to mount components in tests
- Accessibility audits: `await expect(element).shadowDom.to.be.accessible()`

**Linting:**
- ESLint with `@open-wc/eslint-config` + TypeScript rules
- Prettier: single quotes, no unnecessary arrow parens
- Pre-commit hook (Husky + lint-staged) enforces lint on staged files

**Production build** (`rollup.config.js`):
- Entry: `index.html`; output: `/dist` with content-hashed filenames
- esbuild minification targeting Chrome 64+, Firefox 67+, Safari 11.1+
- Workbox service worker generated automatically
