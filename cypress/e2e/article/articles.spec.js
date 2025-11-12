// articles.spec.js
const HomePage = require('../../pages/HomePage');
const ArticlePage = require('../../pages/ArticlePage');

describe('Artigos - fluxo funcional + validação estrutural', () => {
  const home = new HomePage();
  const article = new ArticlePage();

  beforeEach(() => {
    home.visit();
  });

  it('@regressao @artigo Deve abrir o primeiro artigo e validar estrutura mínima', () => {
    home.openFirstArticle();
    article.assertStructureMinimum();
  });

  it('@busca Deve buscar por termo existente e abrir primeiro resultado', () => {
    home.search('empréstimo');
    const SearchResults = require('../../pages/SearchResultsPage');
    const search = new SearchResults();
    search.assertHasResults();
    search.openResultByIndex(1);
    article.assertStructureMinimum();
  });
});
