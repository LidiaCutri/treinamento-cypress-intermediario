const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 880,

  e2e: {
    baseUrl: 'https://cac-tat.s3.eu-central-1.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
