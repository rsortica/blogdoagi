// FILE: /cypress/pages/ArticlePage.js

class ArticlePage {
  constructor() {
    this.title = 'article h1, .post-title, .entry-title';
    this.date = 'article time, .post-meta time, .entry-date';
    this.author = '.author, .byline, .post-author';
    this.heroImage = '.post-thumbnail img, .featured-image img, .entry-content img:first-of-type';
    this.content = '.entry-content, .post-content, article .content';
    this.breadcrumbs = '.breadcrumbs, nav.breadcrumbs, .breadcrumb';
    this.tags = '.tags, .post-tags a, .post-categories a';
  }

  assertStructureMinimum() {
    cy.get(this.title).should('exist').and('be.visible');
    cy.get(this.date).should('exist');
    cy.get('body').then($body => {
      if ($body.find(this.heroImage).length) {
        cy.get(this.heroImage).should('have.attr', 'src').and('not.be.empty');
      } else {
        // If hero image not present, ensure placeholder or none breaks nothing
        cy.log('Hero image not present — acceptable if placeholder or editorial choice');
      }
    });
    cy.get(this.content).find('p').its('length').should('be.gte', 1);
    cy.get(this.breadcrumbs).should('exist');
    // tags are optional in some posts
    return this;
  }

  getTitleText() {
    return cy.get(this.title).invoke('text');
  }
}

module.exports = ArticlePage;
