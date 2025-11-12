// FILE: /cypress/pages/HomePage.js

class HomePage {
  constructor() {
    // Selectors (CSS purist approach)
    this.searchInput = 'input[type="search"], input[name="s"], input[placeholder*="Pesquisar"]';
    this.searchButton = 'button[type="submit"], form.searchform button, button[aria-label="Buscar"]';
    this.articleList = 'main article, .posts-list .post, .blog .post';
    this.firstArticle = `${this.articleList}:first-of-type`;
    this.menuToggle = 'button[aria-label="Abrir menu"], .menu-toggle, .navbar-toggler';
    this.menuLink = (name) => `nav a:contains("${name}"), .menu a:contains("${name}")`;
    this.ctaDownload = 'a[href*="play.google.com"], a[href*="apps.apple.com"], a.cta-download';
    this.paginationNext = 'a[rel="next"], .pagination .next, .nav-links .next';
  }

  visit() {
    cy.visit('https://blog.agibank.com.br/')
    return this;
  }

  search(term) {
    cy.get(this.searchInput).should('exist').clear().type(term);
    cy.get(this.searchButton).should('exist').click();
    const SearchResultsPage = require('./SearchPage');
    return new SearchResultsPage();
  }

  openFirstArticle() {
    cy.get(this.firstArticle).should('exist').within(() => {
      cy.get('a').first().click();
    });
    const ArticlePage = require('./ArticlePage');
    return new ArticlePage();
  }

  clickMenuItem(name) {
    cy.get('body').then($body => {
      if ($body.find(this.menuToggle).length) {
        cy.get(this.menuToggle).click({ force: true });
      }
    });
    cy.contains('nav a, .menu a', name).first().click();
    return this;
  }

  clickCtaDownload() {
    // Remove target so tests can assert in same tab
    cy.get(this.ctaDownload).first().invoke('removeAttr', 'target').click();
    return this;
  }

  goToNextPage() {
    cy.get(this.paginationNext).should('exist').click();
    return this;
  }

  getArticleCount() {
    return cy.get(this.articleList).its('length');
  }
}

module.exports = HomePage;