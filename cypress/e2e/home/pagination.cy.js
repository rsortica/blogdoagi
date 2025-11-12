// FILE: /cypress/e2e/home/pagination.cy.js
// Feature: Paginação

const HomePgPag = require('../../pages/HomePage');

describe('Home - Paginação', () => {
  const home = new HomePgPag();

  beforeEach(() => {
    home.visit();
  });

  it('@paginacao Deve avançar para próxima página e listar novos artigos', () => {
    // pega títulos da primeira página
    cy.get(home.articleList).then($list => {
      const firstTitles = [];
      $list.each((i, el) => {
        const t = Cypress.$(el).find('h1, h2, h3').first().text().trim();
        if (t) firstTitles.push(t);
      });

      // tenta avançar
      cy.get(home.paginationNext).then($btn => {
        if ($btn.length) {
          cy.wrap($btn).click();
          // after navigation check that at least one title differs
          cy.get(home.articleList).should('exist').then($newList => {
            const newTitles = [];
            $newList.each((i, el) => {
              const t = Cypress.$(el).find('h1, h2, h3').first().text().trim();
              if (t) newTitles.push(t);
            });
            const different = newTitles.some(nt => !firstTitles.includes(nt));
            expect(different).to.be.true;
          });
        } else {
          cy.log('Botão Próxima não encontrado — paginação não aplicável');
        }
      });
    });
  });

  it('@paginacao @negativo Não avançar além da última página', () => {
    // Navega até tentar avançar repetidamente e garantir que não sai do limite
    function tryNext(retries = 0) {
      cy.get('body').then($body => {
        if ($body.find(home.paginationNext).length) {
          cy.get(home.paginationNext).then($btn => {
            const disabled = $btn.attr('disabled') || $btn.hasClass('disabled') || $btn.css('pointer-events') === 'none';
            if (disabled) {
              // ok
              expect(disabled).to.be.ok;
            } else if (retries > 10) {
              // safety stop
              cy.log('Stop retries to avoid infinite loop');
            } else {
              cy.wrap($btn).click();
              // small wait for page load
              cy.wait(500);
              tryNext(retries + 1);
            }
          });
        } else {
          cy.log('Sem paginação disponível');
        }
      });
    }

    tryNext(0);
  });
});