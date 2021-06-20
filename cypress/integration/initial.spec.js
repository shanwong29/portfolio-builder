const testEmail = "octo-cat@test-email.com";
const testPassword = "password";
const testUserName = "Octo-Cat";

describe("A user with no documents in firestore initialize app", () => {
  beforeEach(() => {
    cy.stubGithubApiCall();
    cy.visit("/initial");
  });

  after(async () => {
    cy.cleanUpEmulatorData();
  });

  it("should display a form for initalization", () => {
    cy.findByLabelText("Your Display Name").should("be.visible");
    cy.findByLabelText("Email").should("be.visible");
    cy.findByLabelText("Password").should("be.visible");
    cy.findByLabelText("Re-enter Password").should("be.visible");
    cy.get("button")
      .contains("Initial App")
      .should("be.visible");
  });

  it("should block process when form input are incomplete", () => {
    cy.findByLabelText("Your Display Name").type(testUserName);
    cy.findByLabelText("Password").type(testPassword);
    cy.findByLabelText("Re-enter Password").type(testPassword);
    cy.get("button")
      .contains("Initial App")
      .click();
    cy.contains("E-mail must be valid").should("be.visible");
  });

  it("should show successful dialog when form input are incomplete which includes an OK button to redirect user to admin login page", () => {
    cy.findByLabelText("Your Display Name").type(testUserName);
    cy.findByLabelText("Email").type(testEmail);
    cy.findByLabelText("Password").type(testPassword);
    cy.findByLabelText("Re-enter Password").type(testPassword);
    cy.get("button")
      .contains("Initial App")
      .click();

    cy.contains(/octo-cat@test-email.com has been set as admin account/).should("be.visible");

    cy.contains("ok").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/admin");
  });
});

describe("A user tries to reinitialize after initialization", () => {
  beforeEach(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.stubGithubApiCall();
    cy.visit("/initial");
  });

  after(async () => {
    cy.cleanUpEmulatorData();
  });

  it("should always redirect user to home page when user revisit initial page after successful initialization", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains(`Hi, I am ${testUserName}`).should("be.visible");
  });
});
