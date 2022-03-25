/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    const selectedAvenger = 'Captain America';
    cy.get('[data-test="select-input"]').select(selectedAvenger);
    cy.get('[data-test="select-result"]').contains(selectedAvenger);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').click();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    const chosenColor = '#923f80';
    // The strange thing here is that in Cypress docs I found an article claiming that triggering a 'change' event you can achieve the same effect, but it doesn't work here, possbily due to Cypress' updated API?
    cy.get('[data-test="color-input"]').invoke('val', chosenColor).trigger('input');
    cy.get('[data-test="color-result"]').contains(chosenColor);
  });

  it('should find and control a date input', () => {
    const chosenDate = '2022-03-25'; // has to be in the ISO formate: yyyy-mm-dd, otherwise wouldn't work
    // if you use .type() then you don't have to trigger an event
    cy.get('[data-test="date-input"]').type(chosenDate)
    // cy.get('[data-test="date-input"]').invoke('val', chosenDate).trigger('input');
    cy.get('[data-test="date-result"]').contains(chosenDate);
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', 10).trigger('input')
    cy.get('[data-test="range-result"]').contains(10);
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]')
    cy.get('[data-test="file-result"]');
  });
});
