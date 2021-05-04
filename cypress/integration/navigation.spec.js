// describe("Non login user visit my portfolio page", () => {
//   before(() => {
//     cy.visit("/");
//     // cy.intercept("GET", Cypress.env("github_api_url"), { fixture: "github-api-res.json" });
//   });

//   it("should display a greeting", () => {
//     cy.contains("Hi, I am Shan Wong");
//   });

//   it("should display a profile picture", () => {
//     cy.get('[alt="Shan Wong"]').should("be.visible");
//   });

//   it("should display my title", () => {
//     cy.contains("Software Developer");
//   });

//   it("should display my interest", () => {
//     cy.contains("Single-page application (SPA)");
//     cy.contains("Severless Architecture");
//     cy.contains("DevOps Tools");
//   });
// });

// import * as admin from "firebase-admin";const admin = require("@firebase-admin");

// const app = admin.initializeApp({
//   projectId: "test",
//   credential: admin.credential.applicationDefault()
// });

// app.firestore()....

describe("Non login user visit test portfolio page", () => {
  before(() => {
    cy.visit("/");
  });

  it("should display a greeting", () => {
    cy.get('[alt="The Octocat"]').should("be.visible");
  });

  it("should display a link to user's github profile", () => {
    const githubLink = cy.get('a[href*="https://github.com/octocat"]');
    githubLink.should("be.visible");
    githubLink.click();
    cy.url().should("eq", "https://github.com/octocat");
  });
});
