// cypress/pages/SearchBarPage.js

class SearchBarPage {

  // --- Selectors ---
  elements = {
    searchIcon: () => cy.get('a[aria-label="Search button"], .astra-search-icon'),
    searchInput: () => cy.get('input[type="search"], input[type="text"]'),
    searchResultTitles: () => cy.get('article h2, article h3'),
    noResultsMessage: () => cy.contains('Nenhum resultado encontrado').should('be.visible')
  };

  // --- Actions ---
  openSearchBar() {
    this.elements.searchIcon().click();
  }

  typeSearch(term) {
    this.elements.searchInput().should('be.visible').clear().type(term);
  }

  submitSearch() {
    this.elements.searchInput().type('{enter}');
  }

  validateResultsContain(term) {
    this.elements.searchResultTitles().each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.contain(term.toLowerCase());
        });
    });
  }
}

export default new SearchBarPage();
