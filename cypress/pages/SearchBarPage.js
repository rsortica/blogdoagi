  /**
   * Classe que representa a funcionalidade de busca do Blog do Agi.
   * Implementa os fluxos de interação com o campo de pesquisa.
   */
class SearchBarPage {
  constructor() {
    // Ícone de lupa que abre o campo de busca
    this.searchIcon = '[aria-label="Search button"]';

    // Campo de input da busca (aparece após clicar na lupa)
    this.searchInput = 'input[id="search-field"]';

    // Botão de submit da busca
    this.searchButton = 'button[type="submit"][aria-label="Submit search"]';

    // Títulos dos resultados de busca
    this.searchResultTitles = 'article h2, article h3';

    // Mensagem de sem resultados
    this.noResultsMessage = 'body:contains("Nenhum resultado encontrado")';
  }

  /**
   * Clica no ícone de busca (lupa) para abrir o campo de input de pesquisa
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  openSearchBar() {
    cy.get(this.searchIcon).click();
    return this;
  }

  /**
   * Exibe o campo de busca e digita o termo de pesquisa
   * @param {string} term - termo a ser digitado na busca
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  typeSearch(term) {
    cy.get(this.searchInput).should('be.visible').clear().type(term);
    return this;
  }

  /**
   * Submete a busca pressionando Enter
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  submitSearch() {
    cy.get(this.searchInput).type('{enter}');
    return this;
  }

  /**
   * Submete a busca clicando no botão de submit
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  submitSearchByButton() {
    cy.get(this.searchButton).should('exist').click();
    return this;
  }

  /**
   * Valida se os resultados contêm o termo pesquisado
   * @param {string} term - termo a ser validado nos resultados
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  validateResultsContain(term) {
    cy.get(this.searchResultTitles).each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then((text) => {
          expect(text.toLowerCase()).to.contain(term.toLowerCase());
        });
    });
    return this;
  }

  /**
   * Verifica se a mensagem de sem resultados é exibida
   * @returns {this} - retorna a instância para encadeamento de métodos
   */
  assertNoResults() {
    cy.contains('Nenhum resultado encontrado').should('be.visible');
    return this;
  }
}

module.exports = SearchBarPage;
