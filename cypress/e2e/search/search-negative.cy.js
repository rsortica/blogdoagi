// FILE: /cypress/e2e/search/search-negative.cy.js
// Feature: Busca negativa

const HomePg2 = require('../../pages/HomePage');

describe('Search - negativo', () => {
  const home = new HomePg2();

  beforeEach(() => {
    home.visit();
  });

  it('@busca @negativo Termo inexistente mostra mensagem de nenhum resultado', () => {
    const term = 'xyz123abc';
    home.search(term);
    // valida mensagem de nenhum resultado sem depender de seletor exato
    cy.get('main').then($main => {
      if ($main.find('p:contains("Nenhum resultado")').length) {
        cy.contains('Nenhum resultado').should('be.visible');
      } else if ($main.find('.no-results, .search-none').length) {
        cy.get('.no-results, .search-none').should('be.visible');
      } else {
        // fallback: garante que não há artigos listados
        cy.get('main article, .posts-list .post').should('not.exist');
      }
    });
  });
});