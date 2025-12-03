<!--
Guidance for AI coding agents working on the `blogdoagi` repository.
Keep this concise, actionable and specific to repository patterns.
-->

# Copilot / AI Agent Instructions — blogdoagi

Purpose: help AI agents become productive quickly in this Cypress + POM test repo.

- **Tech stack / expectations**
  - Cypress v15.5.0 (devDependency). Node LTS >= 20 recommended.
  - CommonJS modules: files use `module.exports` / `require()` (see `package.json` `"type": "commonjs"`).
  - Page Object Model: page classes live in `cypress/pages` and are instantiated from specs.

- **Where to look first (key files)**
  - `cypress.config.js` — contains `baseUrl` and e2e config used by many tests.
  - `package.json` — useful npm scripts: `npx cypress open` / `npx cypress run`.
  - `cypress/pages/*.js` — Page Objects (HomePage, SearchResultsPage, ArticlePage, etc.).
  - `cypress/e2e/**` — test specs. Follow the pattern: each spec instantiates page objects and calls their methods.
  - `cypress/support/commands.js` and `cypress/support/e2e.js` — custom Cypress commands and global setup.
  - `cypress/fixtures/*` — test data (e.g. `search_terms.json`).

- **Important repository conventions**
  - Page object methods perform Cypress actions and return either `this` or another page instance:
    - Example: `HomePage.search(term)` types, clicks submit and returns `new SearchResultsPage()` (see `cypress/pages/HomePage.js`).
  - Tests prefer structural assertions (selectors / existence) over exact editorial text, to reduce flakiness.
  - Module paths are relative `require('../../pages/SearchResultsPage')` (do not convert to ES imports).

- **Common gotchas & how to fix them (concrete patterns)**
  - Missing import error like `Can't resolve './SearchPage'`:
    - Search for `require(.../SearchPage)` and update to `require(.../SearchResultsPage)` to match file name.
    - Example patch: `const SearchPg = require('../../pages/SearchResultsPage');`
    - Temporary shim approach used previously: `cypress/pages/SearchPage.js` re-exported `SearchResultsPage` — prefer fixing requires.
  - `baseUrl` mismatch:
    - `cypress.config.js` sets `baseUrl: 'https://blogdoagi.com.br'`. Specs should use `cy.visit('/')` not hard-coded full host.
    - If a Page object hardcodes a different host (e.g. `HomePage.visit()` uses `https://blog.agibank.com.br/`), update to `cy.visit('/')` to use `baseUrl`.
  - Trailing-slash flakiness in URL assertions:
    - Prefer `cy.location('origin').should('eq', Cypress.config('baseUrl'))` and `cy.location('pathname').should('eq', '/')` over strict `cy.url().should('eq', ...)`.

- **How to add a new Page / Test (pattern example)**
  1. Create `cypress/pages/MyPage.js` exporting a class with selectors in constructor and methods that perform actions.
  2. In spec, require it: `const MyPage = require('../../pages/MyPage'); const page = new MyPage();`
  3. Methods that navigate to another page should `return new OtherPage()` so specs can continue chaining.

- **Running & debugging tests (practical commands)**
  - Open interactive runner:
    ```powershell
    npx cypress open
    ```
  - Run headless and target a single spec:
    ```powershell
    npx cypress run --spec "cypress/e2e/smoke.cy.js"
    ```
  - Useful diagnostics:
    - Check `cypress.config.js` `baseUrl` when tests fail due to URL mismatches.
    - Look at `cypress/screenshots` and `cypress/videos` for visual failures.

- **Testing / assertion patterns to follow**
  - Use structural selectors (e.g. `main article`, `.posts-list .post`) defined in Page objects.
  - Use `cy.get(...).should('exist')` and `.and('have.length.greaterThan', 0)` for lists.
  - For navigation, prefer `cy.location` checks vs full URL equality.

- **Integration points & external dependencies**
  - Tests run against a public production-like site via `baseUrl` (no local server required).
  - Accessibility: `cypress-axe` is referenced in README; see `cypress/support/accessibility.js` for how axe is integrated.

- **When editing tests or pages — checklist for PRs**
  - Preserve CommonJS style (`require` / `module.exports`).
  - Update any relative requires when renaming files (search repo for old name).
  - Run `npx cypress run --spec "<changed-spec>"` to validate changes locally.
  - If you modify `baseUrl` or host assumptions, update `cypress.config.js` and any Page `visit()` methods to use `cy.visit('/')`.

If anything above is unclear or you want this trimmed/expanded with examples (e.g. a sample Page class template), tell me which section to expand.
