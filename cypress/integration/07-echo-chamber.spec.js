/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    // Can't use .contains() here because it can only be chained to a window object, whereas here we yield a title element after applying .title()
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"').click();
    cy.location('pathname').should('equal', '/echo-chamber/sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]').click();
    // The following statement doesn't work for some unknown reason
    // cy.location('pathname').should('contain.text', '/sign-up')
    cy.location('pathname').should('equal', '/echo-chamber/sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  const validEmail = 'thisIsAValid@email.address';

  it('should require an email', () => {
    // click the submit button with an empty email input field
    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]')
      // check the valid prop in the validity prop (of ValidationState type) - if input value is not valid, domObj.validity.valid should be false.
      // this approach is most accurate but less elegent due to Cypress' limitation of accessing a nested property
      .invoke('prop', 'validity')
      .then((validationState) => expect(validationState.valid).to.be.false);

    // This is another way of doing it:
    // .invoke('prop','validationMessage')
    // .should('not.be.empty');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@submit').type(validEmail);
    cy.get('[data-test="sign-up-email"]')
      .invoke('prop', 'validity')
      .then((validationState) => expect(validationState.valid).to.be.true);
  });

  it('should require a password when the email is present', () => {
    // 1. type a valid email address into email field
    cy.get('@submit').type(validEmail);

    // 2. check if password validation exists
    cy.get('[data-test="sign-up-password"]')
      .invoke('prop', 'validity')
      .should('exist')
      // You can further test the properties of ValidationState obj as follow, such as if valueMissing equals to true then it indicates the password field is empty
      // .then((validationState) => expect(validationState.valueMissing).to.be.true);
  });
});
