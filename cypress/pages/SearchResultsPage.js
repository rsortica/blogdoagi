// FILE: /cypress/pages/SearchPage.js

class SearchResultsPage {
  constructor() {
    this.resultList = 'main article, .search-results .post, .posts-list .post';
    this.noResultsMessage = 'p:contains("Nenhum resultado"), .no-results, .search-none, .no-results-message';
  }

  getResults() {
    return cy.get(this.resultList);
  }

  assertHasResults() {
    cy.get(this.resultList).should('exist').and('have.length.greaterThan', 0);
    return this;
  }

  assertNoResults() {
    cy.get(this.noResultsMessage).should('be.visible');
    cy.get(this.resultList).should('not.exist');
    return this;
  }

  openResultByIndex(index = 1) {
    // index is 1-based
    cy.get(this.resultList).eq(index - 1).find('a').first().click();
    const ArticlePage = require('./ArticlePage');
    return new ArticlePage();
  }
}

module.exports = SearchResultsPage;
