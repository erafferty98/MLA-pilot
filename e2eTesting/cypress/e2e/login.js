import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am a logged in user", () => {
  cy.visit("localhost");
  cy.get('[id="formUsername"]').type("jeff");
  cy.get('[id="formPassword"]').type("jeff");
  cy.get('[class="btn btn-primary"]').click();
});

When("I track an exercise", () => {
  cy.log("When");
});

Then("it should show up", () => {
  cy.log("Then");
});
