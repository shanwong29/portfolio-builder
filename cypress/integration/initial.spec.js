const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

// const firebase = require("@firebase/rules-unit-testing");

describe("A user without no documents in firestore initialize app", () => {
  beforeEach(() => {
    cy.visit("/initial");
  });

  after(async () => {
    cy.request("DELETE", "http://localhost:9099/emulator/v1/projects/shanwong/accounts");
    cy.request("DELETE", "http://localhost:8081/emulator/v1/projects/shanwong/databases/(default)/documents");
  });

  it("should display a form for initalization", () => {
    cy.findByLabelText("Your Display Name").should("be.visible");
    cy.findByLabelText("Email").should("be.visible");
    cy.findByLabelText("Password").should("be.visible");
    cy.findByLabelText("Re-enter Password").should("be.visible");
    cy.findByText("Initial App").should("be.visible");
  });

  it("should block process when form input are incomplete", () => {
    cy.findByLabelText("Your Display Name").type(testUserName);
    cy.findByLabelText("Password").type(testPassword);
    cy.findByLabelText("Re-enter Password").type(testPassword);
    cy.findByText("Initial App").click();
    cy.contains("E-mail must be valid").should("be.visible");
  });

  it("should show successful dialog when form input are incomplete which includes an OK button to redirect user to admin login page", () => {
    cy.findByLabelText("Your Display Name").type(testUserName);
    cy.findByLabelText("Email").type("octo-cat@test-email.com");
    cy.findByLabelText("Password").type(testPassword);
    cy.findByLabelText("Re-enter Password").type(testPassword);
    cy.contains("Initial App").click();

    cy.findByText("octo-cat@test-email.com has been set as admin account.", { exact: false }).should("be.visible");

    cy.contains("ok").click();
    cy.url().should("eq", "http://localhost:8080/admin");
  });

  it("should not always redirect user to home page when user revisit initial page after successful initialization", () => {
    cy.url().should("eq", "http://localhost:8080/");
  });
});
