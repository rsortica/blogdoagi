// PaginationComponent.js
class PaginationComponent {
  constructor() {
    this.next = 'a[rel="next"], .pagination .next';
    this.prev = 'a[rel="prev"], .pagination .prev';
    this.pageNumber = '.pagination .current, .page-number.current';
  }

  goNext() {
    cy.get(this.next).click();
    return this;
  }

  assertOnPage(number) {
    cy.get(this.pageNumber).should('contain.text', String(number));
    return this;
  }
}

module.exports = PaginationComponent;
