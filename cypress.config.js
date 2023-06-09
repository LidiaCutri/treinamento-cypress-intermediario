const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },
    fixturesFolder: false,
    video: false,
});
