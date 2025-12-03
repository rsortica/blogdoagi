/**
 * Classe que representa a página inicial (Home) do Blog do Agi.
 * Implementa os principais fluxos e elementos interativos.
 */
class HomePage {
  constructor() {
    // Ícone de lupa que abre o campo de busca
    this.searchToggle = '[aria-label="Search button"]';
    this.searchIcon = 'a.astra-search-icon';
    this.searchButton = 'button[type="submit"][aria-label="Submit search"]';

    // Campo de input da busca (aparece após clicar na lupa)
    this.searchInput = 'input[id="search-field"]';


    // Lista de artigos na home
    this.articleList = 'main article, .posts-list .post, .blog .post';
    this.firstArticle = `${this.articleList}:first-of-type`;

    // Menu responsivo (hambúrguer)
    this.menuToggle =
      'button[aria-label="Abrir menu"], .menu-toggle, .navbar-toggler';
    this.menuLink = (name) =>
      `nav a:contains("${name}"), .menu a:contains("${name}")`;

    // Botões de download (CTA)
    this.ctaDownload =
      'a[href*="play.google.com"], a[href*="apps.apple.com"], a.cta-download';

    // Link de paginação "Próximo"
    this.paginationNext =
      'a[rel="next"], .pagination .next, .nav-links .next';
  }
  /**
   * Visita a página inicial (usa o baseUrl configurado em cypress.config.js)
   */
  visit() {
    cy.visit('/');
    return this;
  }
  
  /**
   * Verifica se o botão de busca existe e é clicável
   */
  getSearchIcon() {
    return cy.get(this.searchIcon);
  }

  getSearchInput() {
    return cy.get(this.searchInput);
  }

  openSearch() {
    cy.get(this.searchToggle).click();
    return this;
  }
  



  /**
   * Realiza uma busca e retorna o objeto da página de resultados.
   */
  search(term) {
    cy.get('body').then(($body) => {
      if ($body.find(this.searchToggle).length) {
        cy.get(this.searchToggle).click();
      }
    });

    cy.get(this.searchInput).should('be.visible').clear().type(term);
    cy.get(this.searchButton).should('exist').click();

    const SearchResultsPage = require('./SearchResultsPage');
    return new SearchResultsPage();
  }

  /**
   * Abre o primeiro artigo da página inicial
   */
  openFirstArticle() {
    cy.get(this.firstArticle)
      .should('exist')
      .within(() => {
        cy.get('a').first().click();
      });
    const ArticlePage = require('./ArticlePage');
    return new ArticlePage();
  }

  /**
   * Clica em um item do menu pelo nome
   */
  clickMenuItem(name) {
    cy.get('body').then(($body) => {
      if ($body.find(this.menuToggle).length) {
        cy.get(this.menuToggle).click({ force: true });
      }
    });
    cy.contains('nav a, .menu a', name).first().click();
    return this;
  }

  /**
   * Clica no botão de download (App Store / Play Store)
   */
  clickCtaDownload() {
    cy.get(this.ctaDownload).first().invoke('removeAttr', 'target').click();
    return this;
  }

  /**
   * Avança para a próxima página de artigos
   */
  goToNextPage() {
    cy.get(this.paginationNext).should('exist').click();
    return this;
  }

  /**
   * Retorna a contagem de artigos exibidos
   */
  getArticleCount() {
    return cy.get(this.articleList).its('length');
  }
}

module.exports = HomePage;
