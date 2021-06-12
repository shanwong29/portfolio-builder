const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

describe("A user without no documents in firestore initialize app", () => {
  before(() => {
    cy.task("createAdminUser", { email: testEmail, password: testPassword, displayName: testUserName });
  });

  beforeEach(() => {
    cy.visit("/admin");
  });

  after(async () => {
    cy.request("DELETE", "http://localhost:9099/emulator/v1/projects/shanwong/accounts");
  });

  it("should display a Login Form", () => {
    cy.findByLabelText("Email").should("be.visible");
    cy.findByLabelText("Password").should("be.visible");
  });

  it("should block process when form input are incomplete", () => {
    cy.findByLabelText("Email").type(testEmail);
    cy.get("button")
      .contains("Login")
      .click();
    cy.findByText("Password is required").should("be.visible");
  });

  it("should show login error when creditial is invalid", () => {
    cy.findByLabelText("Email").type(testEmail);
    cy.findByLabelText("Password").type("wrong-password");
    cy.get("button")
      .contains("Login")
      .click();
    cy.findByText("Invalid credential").should("be.visible");
  });

  it("should redirect user to main page when login success", () => {
    cy.findByLabelText("Email").type(testEmail);
    cy.findByLabelText("Password").type(testPassword);
    cy.get("button")
      .contains("Login")
      .click();
    cy.location("pathname").should("eq", "/");
  });

  it("should not always redirect user to home page when user has already login", () => {
    cy.location("pathname").should("eq", "/");
  });

  it("should show edit button on main page when user is login", () => {
    cy.location("pathname").should("eq", "/");
    cy.get("button")
      .contains("Edit")
      .should("be.visible");
  });
});
