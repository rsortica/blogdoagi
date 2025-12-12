// FILE: /cypress/e2e/search/search.cy.js
// Feature: Busca - positiva e negativa
const HomePg = require('../../pages/HomePage');
const SearchBarPage = require('../../pages/SearchBarPage');
const searchPage = new SearchBarPage();



describe('Funcionalidade de Busca', () => {

  let home;

  beforeEach(() => {
    cy.visit('/');           // garante visita correta
    home = new HomePg();     // instancia dentro do describe
  });

  // -------------------------------
  //      TESTES POSITIVOS
  // -------------------------------

  context('Search - positivo', () => {

    it.only('deve exibir o campo de busca após clicar na lupa', () => {
      searchPage.openSearchBar().typeSearch('empréstimo').submitSearch();
     
    });

    it('@busca Deve buscar por termo existente e abrir o primeiro resultado', () => {
      const term = 'empréstimo';

      const searchPage = home.search(term);

      // valida lista de resultados
      cy.get(searchPage.resultList)
        .should('exist')
        .and('have.length.greaterThan', 0);

      // abre o primeiro resultado
      searchPage.openResultByIndex(1);

      const article = new ArticlePg();
      article.assertStructureMinimum();
    });
  });

  // -------------------------------
  //      TESTES NEGATIVOS
  // -------------------------------

  context('Search - negativo', () => {

    it('@busca @negativo Termo inexistente deve exibir mensagem de nenhum resultado', () => {
      const term = 'xyz123abc';

      home.search(term);

      // abordagem tolerante a diferentes implementações de tema/wordpress
      cy.get('main').then(($main) => {

        if ($main.find('p:contains("Nenhum resultado")').length > 0) {
          cy.contains('Nenhum resultado').should('be.visible');

        } else if ($main.find('.no-results, .search-none').length > 0) {
          cy.get('.no-results, .search-none').should('be.visible');

        } else {
          // fallback robusto
          cy.get('main article, .posts-list .post').should('not.exist');
        }
      });
    });
  });

});
