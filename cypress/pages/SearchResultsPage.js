/**
 * Classe que representa a página de resultados da busca (Search Results).
 * 
 * Segue o padrão Page Object Model (POM) — cada página da aplicação
 * possui seus seletores, ações e validações encapsulados.
 */

class SearchResultsPage {
  constructor() {
    /**
     * 🔍 Seletores dos principais elementos da página de resultados
     */
    this.resultList = 'main article, .search-results .post, .posts-list .post';
    this.noResultsMessage =
      'p:contains("Nenhum resultado"), .no-results, .search-none, .no-results-message';
  }

  /**
   * Obtém a lista de elementos de resultado de busca
   */
  getResults() {
    return cy.get(this.resultList);
  }

  /**
   * Valida que há pelo menos 1 resultado exibido
   */
  assertHasResults() {
    cy.get(this.resultList)
      .should('exist')
      .and('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Valida o cenário negativo: nenhum resultado foi encontrado
   */
  assertNoResults() {
    cy.get(this.noResultsMessage).should('be.visible');
    cy.get(this.resultList).should('not.exist');
    return this;
  }

  /**
   * Abre um resultado de busca pelo índice (1-based)
   */
  openResultByIndex(index = 1) {
    cy.get(this.resultList)
      .eq(index - 1)
      .find('a')
      .first()
      .click();

    const ArticlePage = require('./ArticlePage');
    return new ArticlePage();
  }
}

module.exports = SearchResultsPage;
