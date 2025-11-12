// helpers.js
module.exports = {
  isProduction() {
    return Cypress.env('ENV') === 'prod' || Cypress.config('baseUrl').includes('blog.agibank.com.br');
  },
  normalizeText(text) {
    return text.trim().replace(/\s+/g, ' ');
  }
};
