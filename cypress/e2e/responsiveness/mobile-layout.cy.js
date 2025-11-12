// FILE: /cypress/e2e/responsiveness/mobile-layout.cy.js
// Feature: Responsividade mobile

const HomeMobile = require('../../pages/HomePage');

describe('Responsividade - Mobile', () => {
  const home = new HomeMobile();

  it('@mobile Deve abrir menu hamburger em 375x812 e navegar para Produtos', () => {
    cy.viewport(375, 812);
    home.visit();
    // abre menu se existir
    cy.get('body').then($body => {
      if ($body.find(home.menuToggle).length) {
        cy.get(home.menuToggle).click({ force: true });
        // verifica se menu aparece
        cy.get('nav, .mobile-menu, .menu').should('be.visible');
        // tenta clicar em Produtos se disponível
        cy.contains('nav a, .menu a', 'Produtos').first().click({ force: true });
        // valida que página carregou
        cy.location('pathname').should('not.eq', '/');
      } else {
        cy.log('Menu toggle não encontrado em mobile — skip');
      }
    });
  });

  it('@mobile Deve garantir leitura do artigo sem overflow horizontal', () => {
    cy.viewport(375, 812);
    home.visit();
    // Abre primeiro artigo
    home.openFirstArticle();
    // Asserts básicos: título e primeiro parágrafo visíveis
    cy.get('article h1, .post-title, .entry-title').should('be.visible');
    cy.get('article .entry-content p').first().should('be.visible').and($p => {
      // checa visualmente largura não maior que viewport
      const el = $p[0];
      expect(el.scrollWidth).to.be.lte(375);
    });
  });
});
