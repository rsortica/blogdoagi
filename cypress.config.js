const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://blog.agibank.com.br", // URL raiz do blog
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    viewportWidth: 1366,
    viewportHeight: 768,

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,

    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    chromeWebSecurity: false,

    env: {
      environment: "prod",       // rótulo do ambiente
      searchPlaceholder: "Pesquisar por:",   // valor reutilizável
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
