import { before } from "mocha";
import { testId } from "../test-id/index";
const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

describe("A admin user tries to login", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
  });

  beforeEach(() => {
    cy.stubGithubApiCall();
    cy.visit("/admin");
  });

  after(async () => {
    cy.cleanUpEmulatorData();
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
});

describe("A loggedin admin user access app", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.login(testEmail, testPassword);
  });

  beforeEach(() => {
    cy.stubGithubApiCall();
  });

  after(async () => {
    cy.cleanUpEmulatorData();
  });

  it("should always redirect user to home page when user tries to access login page", () => {
    cy.visit("/admin");
    cy.location("pathname").should("eq", "/");
  });

  it("should show edit button on main page", () => {
    cy.visit("/");
    cy.get(`[data-test-id=${testId.editBtn}]`).should("be.visible");
  });

  it("should show logout button on main page", () => {
    cy.visit("/");
    cy.get(`[data-test-id=${testId.logoutBtn}]`).should("be.visible");
  });
});

describe("A loggedin admin user logout", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.login(testEmail, testPassword);
    cy.stubGithubApiCall();
    cy.visit("/");
    cy.get(`[data-test-id=${testId.logoutBtn}]`).click();
  });

  after(async () => {
    cy.cleanUpEmulatorData();
  });

  it("should NOT show edit and logout buttons on main page", () => {
    cy.get(`[data-test-id=${testId.editBtn}]`).should("not.exist");
    cy.get(`[data-test-id=${testId.logoutBtn}]`).should("not.exist");
  });
});
