const Home = require('../../pages/HomePage');

describe('Home - Acessibilidade', () => {
  const home = new Home();


  beforeEach(() => {
    home.visit();
  });

  it('deve exibir o campo de busca após clicar na lupa', () => {
    home.openSearch();
    cy.get(home.searchInput).should('be.visible');

    // Verifica se o campo de busca tem atributos de acessibilidade
    cy.get(home.searchInput)
      .should('have.attr', 'aria-label', 'Search field')
      .and('have.attr', 'role', 'searchbox');

    // Verifica se o botão de submissão da busca tem atributos de acessibilidade
    cy.get('button[type="submit"][aria-label="Submit search"]')
      .should('have.attr', 'role', 'button')
      .and('have.attr', 'aria-label', 'Submit search');

    // Verifica se o campo de busca é focável via teclado
    cy.get(home.searchInput).focus().should('have.focus');

    // Garante que o botão de submissão é focável via teclado
    cy.get('button[type="submit"][aria-label="Submit search"]').focus().should('have.focus');

    // Verifica se é possível digitar no campo de busca
    const searchTerm = 'empréstimo';
    cy.get(home.searchInput).type(searchTerm).should('have.value', searchTerm);

    // Verifica se o botão de submissão pode ser acionado via teclado (Enter)
    cy.get(home.searchInput).type('{enter}');
    cy.url().should('include', `s=${encodeURIComponent(searchTerm)}`);

    // Verifica se os resultados da busca são acessíveis
    cy.get('main').within(() => {
      cy.get('article').each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'tabindex')
          .and('match', /^\d+$/); // Deve ter tabindex numérico
        cy.wrap($el)
          .find('h1, h2, h3')
          .should('exist'); // Deve ter título
      });
    }); 

    // Verifica se o menu responsivo (hambúrguer) é acessível
    cy.get(home.menuToggle)
      .should('have.attr', 'aria-label', 'Abrir menu')
      .and('have.attr', 'role', 'button')
      .focus()
      .should('have.focus')
      .click();
    cy.get(home.menuLink('Home'))
      .should('be.visible')
      .and('have.attr', 'tabindex')
      .and('match', /^\d+$/); // Deve ter tabindex numérico
    
  });
});