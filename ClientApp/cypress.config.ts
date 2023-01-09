import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'z33s3r',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
