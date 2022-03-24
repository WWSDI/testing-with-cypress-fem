/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="filter-items"').as('filterInput');
    cy.get('[data-test="items"').as('allItems');
    cy.get('[data-test="items-unpacked"').as('unpackedItems');
    cy.get('[data-test="items-packed"').as('packedItems');
  });

  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');
    // The chainers (e.g. 'not.contain.text') used in Cypress come from Chai - a Behavior Driven Development (BDD) Assertions library
    cy.get('@allItems').should('not.contain.text', 'Hoodie');
  });

  it('should move items from unpacked list to packed list when items are clicked', () => {
    cy.get('@unpackedItems')
      .find('label')
      .each(($item) => {
        cy.wrap($item).click();
        cy.get('@unpackedItems').should('not.contain.text', $item.text());
        cy.get('@packedItems').contains($item.text());
      });
  });

  it('experiement - async',  () => {
    const names = [];
    cy.get('@unpackedItems')
      .find('label')
      .each( ($label) => {
        names.push($label.text());
      });
    console.log(names);
  });
});
