// FILE: /cypress/e2e/search/search-positive.cy.js
// Feature: Busca positiva

const HomePg = require('../../pages/HomePage');
const SearchPg = require('../../pages/SearchPage');
const ArticlePg = require('../../pages/ArticlePage');

describe('Search - positivo', () => {
  const home = new HomePg();

  beforeEach(() => {
    home.visit();
  });

  it('@busca Deve buscar por termo existente e abrir primeiro resultado', () => {
    const term = 'empréstimo';
    const searchPage = home.search(term);
    // valida resultados
    cy.get(searchPage.resultList).should('exist').and('have.length.greaterThan', 0);
    // abre primeiro resultado e valida estrutura mínima
    searchPage.openResultByIndex(1);
    const article = new ArticlePg();
    article.assertStructureMinimum();
  });
});