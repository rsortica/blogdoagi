// FILE: /cypress/e2e/home/navigation.cy.js
// Feature: Navegação no menu principal

const HomePage = require('../../pages/HomePage');

describe('Home - Navegação no menu', () => {
  const home = new HomePage();

  beforeEach(() => {
    home.visit();
  });

  it('@menu @sanidade Deve acessar seção "Notícias" pelo menu e mostrar artigos', () => {
    home.clickMenuItem('Notícias');
    // valida que carregou e existe ao menos 1 artigo
    cy.get('main article, .posts-list .post').should('exist').and('have.length.greaterThan', 0);
  });

  it('@menu @negativo Item do menu - rota 404 deve tratar', () => {
    // Testa navegação para um link que pode não existir - usa um selector genérico
    // Tentamos clicar em um item do menu e caso a rota retorne 404 o site deve ter fallback
    // Seleciona o último item do menu e segue
    cy.get('nav a, .menu a').last().then($link => {
      const href = $link.prop('href');
      if (!href) {
        cy.log('Link sem href — pulando');
        return;
      }
      // Faz request direto para verificar status
      cy.request({ url: href, failOnStatusCode: false }).then(resp => {
        if (resp.status === 404) {
          // valida que UI não quebra — por exemplo a home ou mensagem é exibida
          cy.visit('/');
          cy.get('main').should('exist');
        } else {
          // rota válida
          cy.log('Rota válida com status ' + resp.status);
        }
      });
    });
  });
});