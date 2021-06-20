import { testId } from "../test-id/index";
const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

describe("A Loggedin user amend project section", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.login(testEmail, testPassword);
    cy.stubGithubApiCall();
    cy.visit("/");
    cy.get(`[data-test-id=${testId.editBtn}]`).click();
    cy.get("#edit-pop-up-navbar")
      .contains("Project")
      .click();
  });

  after(() => {
    cy.cleanUpEmulatorData();
  });

  describe("Amend 4th and 5th projects", () => {
    const uniqueStack = "project-1-stack-1";
    const commonStack = "common-stack-1";
    before(() => {
      cy.get('[data-test-id="expand-panel-3"]').within(() => {
        cy.contains("octocat.github.io").click();
        cy.contains(/show this project/i).click();
        cy.findByLabelText("Add Stack").type(`${commonStack}{enter}`);
      });

      cy.get('[data-test-id="expand-panel-4"]').within(() => {
        cy.contains("Spoon-Knife").click();
        cy.contains(/show this project/i).click();
        cy.findByLabelText("Add Stack").type(`${uniqueStack}{enter}`);
        cy.findByLabelText("Add Stack").type(`${commonStack}{enter}`);
      });

      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();
    });

    it("project should show two project cards on main page", () => {
      cy.get('[data-test-id="project-card"]').should("have.length", 2);
    });

    it("project card should contain project name, language and description", () => {
      cy.get('[data-test-id="project-card"]')
        .eq(1)
        .within(() => {
          cy.contains("Spoon-Knife");
          cy.contains("HTML");
          cy.contains("This repo is for demonstration purposes only.");
        });
    });
  });
});

// describe("Navigate project section", () => {
//   it("project filter", () => {
//     cy.get('[data-test-id="project-filter"]').within(() => {
//       cy.contains("project-1-stack-1").click();
//     });
//   });

//   it("project should show two project cards", () => {
//     cy.get('[data-test-id="project-card"]').should("have.length", 1);
//   });

//   it("project filter", () => {
//     cy.get('[data-test-id="project-filter"]').within(() => {
//       cy.get('[data-test-id="clear-filter-btn"]').click();
//     });

//     cy.get('[data-test-id="project-card"]').should("have.length", 2);
//   });
// });
