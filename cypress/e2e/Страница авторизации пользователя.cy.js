import validUser from "/cypress/fixtures/validUser.json";
import { loginMe } from "/cypress/support/utils";

describe("Страница авторизации пользователя", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });
  it("Test 1:Проверка, что форма авторизации пользователя существует и является видимой на странице", () => {
    cy.get(".bubble-form.bubble-box").should("be.visible");
  });

  it("Test 2:Авторизация на сайте при вводе валидных данных", () => {
    cy.get('[name="phone"]').type(validUser.phone);
    cy.get('[name = "password"]').type(validUser.password);
    cy.get("#auth-form-submit").click();
    cy.url().should("not.equal", "/auth");
  });

  it("Test 3:Авторизация на сайте при вводе невалидных данных", () => {
    cy.get('[name="phone"]').type(9610000000);
    cy.get('[name = "password"]').type("Nikita113");
    cy.get("#auth-form-submit").click();
    cy.contains("Неверный номер телефона").should("be.visible");
    cy.contains("Неверный пароль").should("be.visible");
  });
  it("Test 4:Авторизация на сайте не заполняя поля формы", () => {
    cy.get("#auth-form-submit").click();
    cy.contains("Введите номер").should("be.visible");
    cy.contains("Минимальная длина 8 символов").should("be.visible");
  });
  it("Test 5:Авторизация на сайте не заполняя поле “Номер телефона”", () => {
    cy.get('[name = "password"]').type(validUser.password);
    cy.get("#auth-form-submit").click();
    cy.contains("Введите номер").should("be.visible");
  });
  it("Test 6:Авторизация на сайте не заполняя поле “Введите пароль”", () => {
    cy.get('[name="phone"]').type(validUser.phone);
    cy.get("#auth-form-submit").click();
    cy.contains("Минимальная длина 8 символов").should("be.visible");
  });
  it("Test 7:Авторизация на сайте с некорректым номером телефона", () => {
    cy.get('[name="phone"]').type(961462406);
    cy.get('[name = "password"]').type(validUser.password);
    cy.get("#auth-form-submit").click();
    cy.contains("Длина номера не соответствует заданной").should("be.visible");
  });
  it("Test 8:Авторизация на сайте при в вводе в поле “Введите пароль” пароль состоящий из цифр", () => {
    cy.get('[name="phone"]').type(validUser.phone);
    cy.get('[name = "password"]').type("00000000");
    cy.get("#auth-form-submit").click();
    cy.contains("Пароль должен состоять из цифр и символов").should(
      "be.visible"
    );
  });
  it("Test 9:При вводе в поле “Введите пароль” пароль скрыт точками, при нажатии на иконку “закрытого глаза”, пароль видимый", () => {
    cy.get('[name = "password"]').type(validUser.password);
    cy.get('[name = "password"]').should("have.attr", "type", "password");
    cy.get(".el-input__suffix-inner").click();
    cy.get('[name = "password"]').should("have.attr", "type", "text");
  });
  it("Test 10:Переход с страницы “Авторизация” на страницу “Зарегистироваться”", () => {
    cy.get(".el-link--primary").click();
    cy.url().should("not.equal", "/sign-up");
    cy.get(".bubble-form__title").should("be.visible");
  });
  it("Test 11:Переход с страницы “Авторизация” на страницу “Забыли пароль”", () => {
    cy.get(".el-link--default").click();
    cy.url().should("not.equal", "/forgot");
    cy.get(".bubble-form__title").should("be.visible");
  });
});
