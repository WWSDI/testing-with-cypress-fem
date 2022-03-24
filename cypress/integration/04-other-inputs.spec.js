/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {
    cy.get('@rating-filter').invoke('val', 7).trigger('input')
    cy.get('.name').should('have.length', 1)
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
  });

  it('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').select('KFC');
    cy.get('@restaurant-filter').should('have.value', 'KFC');
    cy.get('.whereToOrder')
      .should('have.length', 7)
      .each(($cell) => cy.wrap($cell).contains($cell.text()));
  });
});
