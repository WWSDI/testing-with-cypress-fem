/// <reference types="cypress" />

const user = {
  email: 'first@example.com',
  password: 'password123',
};

describe('Sign Up', () => {
  beforeEach(() => {
    // reset the db to the following state: db is clean and has no existing user accounts.
    cy.task('reset');
    cy.visit('/echo-chamber/sign-in');
  });

  it('should successfully create a user when entering an email and a password', () => {
    // Sign Up
    cy.signUp(user);
    // Sign In
    cy.signIn(user);
    // validate sign in operation
    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-in');
    cy.task('seed');
  });

  it('should sign in with an existing user', () => {
    // Sign in as the user whose profile is provided
    cy.signIn(user);
    // Test if the logged-in page has current user info
    // 1. if logged in, path should end with 'posts', meaning the logged-in page should show all users' posts
    cy.location('pathname').should('contain', '/echo-chamber/posts');
    // 2. current user's email account should show on the page as well
    cy.contains('Signed in as ' + user.email);
  });
});
