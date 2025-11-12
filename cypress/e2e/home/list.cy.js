 // FILE: /cypress/e2e/home/list.cy.js
// Feature: Lista de artigos e abertura do primeiro artigo

const Home = require('../../pages/HomePage');
const Article = require('../../pages/ArticlePage');

describe('Home - Lista de artigos', () => {
  const home = new Home();
  const article = new Article();

  beforeEach(() => {
    home.visit();
  });

  it('@artigo @positivo A listagem de artigos carrega com cards e cada card tem título e link', () => {
    cy.get(home.articleList).should('exist').and('have.length.greaterThan', 0);
    cy.get(home.articleList).first().within(() => {
      cy.get('a').should('have.attr', 'href');
      cy.get('h1, h2, h3').should('exist');
    });
  });

  it('@artigo Deve abrir o primeiro artigo e verificar estrutura mínima', () => {
    // Abre o primeiro artigo via page object
    const openedArticle = home.openFirstArticle();
    // após navegação, valida estrutura
    openedArticle.assertStructureMinimum();
  });
});