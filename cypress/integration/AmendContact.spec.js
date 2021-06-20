import { testId } from "../test-id/index";
const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

describe("Edit About Section", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.login(testEmail, testPassword);
    cy.stubGithubApiCall();
    cy.visit("/");
  });

  after(() => {
    cy.cleanUpEmulatorData();
  });

  const testLinkedinLink = "https://de.linkedin.com/";

  describe("Edit Linkedin url", () => {
    it("Editing only Linkedin url should be possible, and successful message should be shown after saving", () => {
      cy.get(`[data-test-id=${testId.editBtn}]`).click();

      cy.get("#edit-pop-up-navbar")
        .contains("Contact")
        .click();

      cy.findByLabelText("Linkedin").type(testLinkedinLink);
      cy.contains("Save Changes").click();
      cy.contains(/Successfully updated Contact./).should("be.visible");
    });

    it("the updated linkedin Link should be accessible on main page", () => {
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      cy.get("#contact").within(() => {
        const linkedInLink = cy.get(`a[href*="${testLinkedinLink}"]`);
        linkedInLink.should("be.visible");
        linkedInLink.should("have.attr", "target", "_blank");
      });
    });
  });
});
