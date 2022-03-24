/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should do something', () => {
    cy.get('form').should('exist');
  });

  it("should have a label 'Item'", () => {
    cy.contains('Item');
  });
  it("should have a label 'Filter'", () => {
    cy.contains('Filter');
  });
  it('should put stuff in an input field', () => {
    cy.get('[data-test="new-item-input"').type('Just do the work!');
    cy.get('[data-test="add-item"').click();
    cy.contains('Just do the work!');
  });
});
