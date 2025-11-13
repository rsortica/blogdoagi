// FILE: /cypress/e2e/search/search-positive.cy.js
// Feature: Busca positiva

const HomePg = require('../../pages/HomePage');
const SearchPg = require('../../pages/SearchResultsPage');
const ArticlePg = require('../../pages/ArticlePage');

describe('Search - positivo', () => {
  const home = new HomePg();

  beforeEach(() => {
    home.visit();
  });

    // Verfica se o campo de busca não está visível no carregamento inicial da página
  it('deve ocultar o campo de busca ao carregar a página', () => {
    cy.get(home.searchInput).should('not.be.visible');
  });

  // Verifica se o ícone de busca tem atributos de acessibilidade via teclado e leitores de tela
  it('deve ter atributos de acessibilidade no ícone de busca', () => {  
    cy.get('a.astra-search-icon')
      .should('have.attr', 'role', 'button')
      .and('have.attr', 'aria-label', 'Search button');
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