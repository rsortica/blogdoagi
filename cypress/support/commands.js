// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// FILE: /cypress/support/commands.js

const HomePage = require('../pages/HomePage');

Cypress.Commands.add('visitHome', () => {
  const home = new HomePage();
  home.visit();
  return cy.wrap(home);
});

Cypress.Commands.add('searchTerm', (term) => {
  const Home = new HomePage();
  return cy.wrap(Home.search(term));
});

Cypress.Commands.add('openFirstArticle', () => {
  const Home = new HomePage();
  return cy.wrap(Home.openFirstArticle());
});
// Helper to assert article structure faster
Cypress.Commands.add('assertArticleStructure', () => {
  const ArticlePage = require('../pages/ArticlePage');
  const page = new ArticlePage();
  return page.assertStructureMinimum();
});

// small helper for mobile viewport
Cypress.Commands.add('setMobileViewport', (preset = 'iphone-6') => {
  const viewports = {
    'iphone-6': [375, 667],
    'iphone-x': [375, 812],
    'pixel-2': [411, 731]
  };
  const vp = viewports[preset] || viewports['iphone-6'];
  cy.viewport(vp[0], vp[1]);
});

module.exports = {};
