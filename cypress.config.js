const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://leadhack.ru",
    video: false,
    screenshots: false,

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
