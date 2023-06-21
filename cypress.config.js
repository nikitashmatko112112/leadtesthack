const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = {
  testFiles: "**/*.spec.js",
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    browser: "chrome",
  },
  e2e: {
    baseUrl: "https://leadhack.ru",
    setupNodeEvents: function (on, config) {
      allureWriter(on, config);
      return config;
    },
  },
};
