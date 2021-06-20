import { testId } from "../test-id/index";
const testEmail = "octo-cat@test-email.com";
const testPassword = "password-password";
const testUserName = "Octo-Cat";

describe("A Login user amends about section", () => {
  before(() => {
    cy.task("initializeAccount", { email: testEmail, password: testPassword, displayName: testUserName });
    cy.login(testEmail, testPassword);
    cy.stubGithubApiCall();
    cy.visit("/");
    cy.wait(3000); // wait for getting data from firestore
  });

  after(() => {
    cy.cleanUpEmulatorData();
  });

  const addedDisplayName = "Surname";
  const addedBio = "this is a new bio line.";
  const addedIntro = "this is a new intro.";
  const addedInterest = ["interest-1", "interest-2", "interest-3"];

  describe("Add data in all text fields", () => {
    before(() => {
      cy.get(`[data-test-id=${testId.editBtn}]`).click();
    });

    it("message indicating that data has been updated after saving", () => {
      cy.findByLabelText("Display Name").type(addedDisplayName);
      cy.findByLabelText("One-line Bio").type(addedBio);
      cy.findByLabelText("Self Introduction").type(addedIntro);
      cy.findByLabelText("Add Interest").type(addedInterest[0]);
      cy.get(`[data-test-id=${testId.addInterestBtn}]`).click();
      cy.findByLabelText("Add Interest").type(`${addedInterest[1]}{enter}`);
      cy.findByLabelText("Add Interest").type(`${addedInterest[2]}{enter}`);
      cy.get(`[data-test-id=${testId.addedInterestInput}]`).should("have.length", 3);

      cy.contains("Save Changes").click();
      cy.contains(/Successfully updated About./).should("be.visible");
    });

    it("updated data should be displayed on main page", () => {
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      cy.get("#about").within(() => {
        cy.contains(`${testUserName}${addedDisplayName}`).should("be.visible");
        cy.contains(addedBio).should("be.visible");
        cy.contains(addedIntro).should("be.visible");
        cy.contains(addedInterest[0]).should("be.visible");
        cy.contains(addedInterest[1]).should("be.visible");
      });
    });
  });

  describe("Move and delete interest order", () => {
    beforeEach(() => {
      cy.get(`[data-test-id=${testId.editBtn}]`).click();
    });

    const checkIfInterestListOrderCorrect = expectedInterestList => {
      cy.get("#about li").should($els => {
        const displayedInterestList = $els.toArray().map($el => {
          return $el.innerText;
        });

        expect(displayedInterestList).to.deep.eq(expectedInterestList);
      });
    };

    it("Each interest should have 1 move-up, 1 move-down and 1 delete bitton", () => {
      cy.get(`[data-test-id=${testId.moveUpInterestBtn}]`).should("have.length", 3);
      cy.get(`[data-test-id=${testId.moveDownInterestBtn}]`).should("have.length", 3);
      cy.get(`[data-test-id=${testId.delInterestBtn}]`).should("have.length", 3);
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();
    });

    it("move up interest order should be possible", () => {
      cy.get(`[data-test-id=${testId.moveUpInterestBtn}]`).each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).click();
        }
      });
      cy.contains("Save Changes").click();
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      const expectedInterestList = [addedInterest[0], addedInterest[2], addedInterest[1]];
      checkIfInterestListOrderCorrect(expectedInterestList);
    });

    it("move down interest order should be possible", () => {
      cy.get(`[data-test-id=${testId.moveDownInterestBtn}]`).each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).click();
        }
      });
      cy.contains("Save Changes").click();
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      const expectedInterestList = [addedInterest[2], addedInterest[0], addedInterest[1]];
      checkIfInterestListOrderCorrect(expectedInterestList);
    });

    it("delete interest should be possible", () => {
      cy.get(`[data-test-id=${testId.delInterestBtn}]`).each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).click();
        }
      });
      cy.contains("Save Changes").click();
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      const expectedInterestList = [addedInterest[2], addedInterest[0]];
      checkIfInterestListOrderCorrect(expectedInterestList);
    });
  });

  describe("amend Show / Hide contribution setting", () => {
    beforeEach(() => {
      cy.get(`[data-test-id=${testId.editBtn}]`).click();
    });
    it("hide contribution on main page when setting change from HIDE to SHOW", () => {
      cy.contains(/Contribution Section:/).within(() => {
        cy.contains("HIDE").click();
        cy.contains("SHOW").should("be.visible");
      });

      cy.contains("Save Changes").click();
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();
      cy.get("#contributions").should("be.visible");
    });

    it("hide contribution on main page when setting change from SHOW to HIDE", () => {
      cy.contains(/Contribution Section:/).within(() => {
        cy.contains("SHOW").click();
        cy.contains("HIDE").should("be.visible");
      });

      cy.contains("Save Changes").click();
      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();
      cy.get("#contributions").should("not.exist");
    });
  });

  describe("Amend without saving", () => {
    beforeEach(() => {
      cy.get(`[data-test-id=${testId.editBtn}]`).click();
    });

    it("should not save the changes when save changes button is not clicked", () => {
      const newlyAddedBio = "bla bla bla";
      const newlyaddedIntro = "BBBBBBBBBBBBBBBBBBBBBBBB";
      cy.findByLabelText("One-line Bio").type(newlyAddedBio);
      cy.findByLabelText("Self Introduction").type(newlyaddedIntro);
      cy.contains(/Contribution Section:/).within(() => {
        cy.contains("HIDE").click();
      });

      cy.get(`[data-test-id=${testId.closeEditPopUpBtn}]`).click();

      cy.findByText(newlyAddedBio, { exact: false }).should("not.exist");
      cy.findByText(newlyaddedIntro, { exact: false }).should("not.exist");
      cy.get("#contributions").should("not.exist");
    });
  });
});
