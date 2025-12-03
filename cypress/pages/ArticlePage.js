// cypress/pages/ArticlePage.js

class ArticlePage {

  // --- Selectors ---
  elements = {

    // Cartões de artigos na home ou listas
    articleCards: () => cy.get('article'),

    // Título do artigo
    articleTitle: () => cy.get('h1, h2'),

    // Botões comuns
    readTextButton: () => cy.contains('button, a', 'Ler texto'),
    readMoreButton: () => cy.contains('button, a', 'Ler mais'),
    seeMoreButton: () => cy.contains('button, a', 'Ver mais'),

    // Redes sociais (ícones externos)
    facebookLink: () => cy.get('a[href*="facebook"]'),
    instagramLink: () => cy.get('a[href*="instagram"]'),
    linkedinLink: () => cy.get('a[href*="linkedin"]'),
    tiktokLink: () => cy.get('a[href*="tiktok"]'),

    // Conteúdo do artigo
    articleContent: () => cy.get('article, .entry-content'),
  };

  // --- Actions ---

  clickFirstArticle() {
    this.elements.articleCards().first().find('a').first().click();
  }

  clickReadText() {
    this.elements.readTextButton().click();
  }

  clickReadMore() {
    this.elements.readMoreButton().click();
  }

  clickSeeMore() {
    this.elements.seeMoreButton().click();
  }

  clickSocialFacebook() {
    this.elements.facebookLink().invoke('removeAttr', 'target').click();
  }

  clickSocialInstagram() {
    this.elements.instagramLink().invoke('removeAttr', 'target').click();
  }

  clickSocialLinkedin() {
    this.elements.linkedinLink().invoke('removeAttr', 'target').click();
  }

  clickSocialTiktok() {
    this.elements.tiktokLink().invoke('removeAttr', 'target').click();
  }

  validateArticlePageLoaded() {
    this.elements.articleTitle().should('be.visible');
    this.elements.articleContent().should('be.visible');
  }
}

export default new ArticlePage();
