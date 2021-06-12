const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";
import "@firebase/firestore";
import "@firebase/auth";
import { auth } from "../../src/firebase-config/init";

// const firebase = require("@firebase/rules-unit-testing");

describe("A Login user amend about section", () => {
  before(() => {
    cy.task("createAdminUser", { email: testEmail, password: testPassword, displayName: testUserName }).then(() => {
      cy.visit("/").then(() => {
        auth.signInWithEmailAndPassword(testEmail, testPassword).then(() => {
          console.log(`signed`);
        });
      });
      // console.log("sth, ", sth);

      // cy.request(
      //   "POST",
      //   "http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key",
      //   {
      //     email: testEmail,
      //     password: testPassword,
      //     returnSecureToken: true
      //   }
      // ).then(response => {
      //   console.log(response);
      // });
    });
  });

  after(() => {
    cy.request("DELETE", "http://localhost:9099/emulator/v1/projects/shanwong/accounts");
  });

  it("should display a Edit button", () => {
    cy.get('[data-test-id="edit-btn"]').should("be.visible");
  });

  // describe("Edit About Section", () => {
  //   before(() => {
  //     cy.get("button")
  //       .contains("Edit")
  //       .click();
  //   });

  //   it("should save changes of all the amended fields", () => {
  //     cy.findByLabelText("Display Name").type("new display name");
  //     cy.findByLabelText("One-line Bio").type("bio");
  //     cy.findByLabelText("Self Introduction").type("intro");
  //     cy.findByLabelText("Add Interest").type("interest 1");
  //     cy.get('[data-test-id="add-interest-btn"]').click();
  //     cy.findByLabelText("Add Interest").type("interest 2{enter}");
  //     cy.get("button")
  //       .contains("Save Changes")
  //       .click();
  //     cy.get('[data-test-id="close-edit-pop-up-btn"]').click();
  //     cy.get("#about").within(() => {
  //       cy.contains("new display name").should("be.visible");
  //       cy.contains("bio").should("be.visible");
  //       cy.contains("intro").should("be.visible");
  //       cy.contains("interest 1").should("be.visible");
  //     });
  //   });
  // });
});
