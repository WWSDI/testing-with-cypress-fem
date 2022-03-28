/// <reference types="cypress" />

describe('Dog Facts', () => {
  beforeEach(() => {
    cy.visit('/dog-facts');

    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out with an empty state', () => {
    cy.get('@emptyState').should('exist');
  });

  it('should make a request when the button is called', () => {
    cy.get('@fetchButton').click();
    // if not such request made, after 5s, the wait() will throw an error
    cy.wait('@api');
  });

  it('should adjust the amount when the select is changed', () => {
    cy.get('@amountSelect').select('8').trigger('input');
    cy.get('@fetchButton').click();
    cy.wait('@api').its('request.url').should('contain','amount=8')
  });

  it('should show the correct number of facts on the page', () => {
    const amount = 8 
    cy.get('@amountSelect').select(`${amount}`).trigger('input');
    cy.get('@fetchButton').click();
    cy.wait('@api');
    cy.get('#facts').children().should('have.length', amount);
  });

  it('should clear the facts when the "Clear" button is pressed', () => {
    cy.fetchDogFacts(5);
    cy.get('@clearButton').click();
    cy.get('@emptyState').should('exist');
  });

  it("should reflect the number of facts we're looking for in the title", () => {
    const amount = 5
    cy.fetchDogFacts(amount);
    cy.document().its('title').should('contain', `${amount}`);
  });
});
