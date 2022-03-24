/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      const item = 'Feed my cats';
      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('[data-test="add-item"]').click();
      cy.contains(item);
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
      cy.get('[data-test="items-unpacked"] > ul > li').last().contains('Feed my cats');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('tooth');
      cy.get('#jetsetter-application ul li').should('have.length', 2).contains('Tooth Brush');
      cy.get('#jetsetter-application ul li').contains('Tooth Paste');
      // ❌ The following approach doesn't work, it fails on the second contains(). The reason being the first .contains() actually changed the content of filteredItems and made its scope narrowed down to the element that contains 'Tooth Brush', instead of its original scope of a collection of two li elements.
      // ⭐️ It turns out that you can't store selector results in Cypress because it's async operation.

      // const filteredItems = cy.get('#jetsetter-application ul li')
      // filteredItems.should('have.length', 2).contains('Tooth Brush');
      // filteredItems.contains('Tooth Paste');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('tooth');

      cy.contains('Hoodie').should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items"] li').should('not.exist');
        // My original apporach before I know how to use 'not.exist':
        // cy.get('#jetsetter-application ul li').should('have.length', 0);
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
      // This seems to be the right way of doing it - use .wrap() to turn label into a Chainable:
      cy.get('[data-test="items-unpacked"] ul li label').each(($label) => {
        cy.wrap($label).click();
        cy.wrap($label).should('not.exist');
      });
      cy.get('[data-test="items-packed"] li').should('have.length', 5);

      // ⭐️ Strange thing is my original approach does work, but the .click() here is actually a jQuery method instead of Cypress'
      /* cy.get('[data-test="items-unpacked"] ul li label').each((label) => label.click());
      cy.get('[data-test="items-unpacked"] ul li').should('have.length', 0);
      cy.get('[data-test="items-packed"] ul li').should('have.length', 5); */
    });
  });
});
