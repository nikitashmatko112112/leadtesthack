import validUser from "/cypress/fixtures/validUser.json";

export function loginMe() {
  cy.visit("/auth");
  cy.get('[name="phone"]').type(validUser.phone);
  cy.get('[name = "password"]').type(validUser.password);
  cy.get("#auth-form-submit").click();
}
