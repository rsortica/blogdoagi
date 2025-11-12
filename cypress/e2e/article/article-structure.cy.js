// FILE: /cypress/e2e/article/article-structure.cy.js
// Feature: Abertura de artigo e validação mínima de estrutura

const HomePage = require('../../pages/HomePage');
const ArticlePage = require('../../pages/ArticlePage');

describe('Article - estrutura mínima', () => {
  const home = new HomePage();
  const article = new ArticlePage();

  beforeEach(() => {
    home.visit();
  });

  it('@artigo Abre primeiro artigo e valida título, data, imagem (ou placeholder) e parágrafos', () => {
    // obtém href do primeiro artigo para checar status 200 via request
    cy.get(home.firstArticle).find('a').first().then($a => {
      const href = $a.prop('href');
      expect(href).to.exist;
      // request para garantir status 200 no recurso
      cy.request({ url: href, failOnStatusCode: true }).then(resp => {
        expect(resp.status).to.equal(200);
      });
      // navega clicando
      cy.wrap($a).click();
      // agora valida estrutura mínima via Page Object
      article.assertStructureMinimum();
    });
  });
});