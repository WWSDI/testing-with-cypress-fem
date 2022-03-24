/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('Feed my cats');
      cy.get('[data-test="add-item"]').click();
      cy.contains('Feed my cats');
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Feed my cats');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"]').contains('Feed my cats');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Feed my cats');
      cy.get('[data-test="add-item"]').click();
      // This selector syntax is very similar to css
      cy.get('[data-test="items-unpacked"] > ul > li').last('child').contains('Feed my cats');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('tooth');
      cy.get('#jetsetter-application ul li').should('have.length', 2).contains('Tooth Brush');
      cy.get('#jetsetter-application ul li').should('have.length', 2).contains('Tooth Paste');
    });

    it('should hide items that do not match whatever is in the filter field', () => {});
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('#jetsetter-application ul li').should('have.length', 0);
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('#jetsetter-application ul li [data-test="remove"]').should('have.length', 5);
      });

      it('should remove an item from the page', () => {
        cy.get(':nth-child(3) > [data-test="remove"]').click();
        cy.get('Deoderant').should('have.length', 0);
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] ul li').should('have.length', 0);
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-unpacked"] ul li').should('have.length', 5);
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] ul li label').each((label) => label.click());
      cy.get('[data-test="items-unpacked"] ul li').should('have.length', 0);
      cy.get('[data-test="items-packed"] ul li').should('have.length', 5);
    });
  });
});
