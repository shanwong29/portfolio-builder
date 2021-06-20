describe("Non login user visit test portfolio page", () => {
  before(() => {
    // the only test using actual github api
    cy.visit("/");
  });

  it("should display a greeting", () => {
    cy.get('[alt="The Octocat"]').should("be.visible");
  });

  it("should display a link to user's github profile", () => {
    const githubLink = cy.get('a[href*="https://github.com/octocat"]');
    githubLink.should("be.visible");
    githubLink.should("have.attr", "target", "_blank");
  });
});
