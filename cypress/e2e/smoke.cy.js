import SearchResultsPage from '../../pages/SearchResultsPage';
const HomePage = require('../../pages/HomePage');
it('deve exibir o campo de busca após clicar na lupa', () => {
  const home = new HomePage();
  home.visit();

  cy.get(home.searchToggle).click();
  cy.get(home.searchInput).should('be.visible');
});