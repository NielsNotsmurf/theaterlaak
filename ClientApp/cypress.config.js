const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "z33s3r",
  defaultCommandTimeout: 10000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
