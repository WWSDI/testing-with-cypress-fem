/// <reference types="cypress" />

const pokemons = [
  { id: 1, name: 'Bumblesaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.get('@search').type('ivy');
    // .wait() will wait for the specified network request to return result
    cy.wait('@api');
  });

  it('should update the query parameter', () => {
    cy.get('@search').type('ivy');
    cy.wait('@api');
    cy.location('search').should('equal', '?name=ivy');
  });

  it('should call the API with correct query parameter', () => {
    cy.get('@search').type('ivy');
    cy.wait('@api').its('request.url').should('contain', 'name=ivy');
    cy.location('search').then((x) => console.log(x));
  });

  it('should pre-populate the search field with the query parameter', () => {
    // pre-populate means that user don't manually type the query parameter into the search field, but rather it should show up when user sees the rendered page
    cy.visit({ url: '/pokemon-search', qs: { name: 'char' } });
    cy.wait('@api').its('request.url').should('contain', 'name=char');
  });

  it('should render the results to the page', () => {
    // The reason for using .intercept is that we are simply testing if the response can be rendered correctly (such as if rendered at all, if in correct format etc.). We don't care about the actual data being rendered. Therefore we don't need an actual API for that.
    // if you pass a second argument to .intercept() then the request doesn't actual fires and the response object is stubbed with the argument you provided.
    cy.intercept('/pokemon-search/api?*', { pokemon: pokemons }).as('stubbed');
    cy.get('@search').type('ivy');
    pokemons.forEach(pokemon => cy.contains(pokemon.name))
  });

  it('should link to the correct pokémon', () => {
    
  });

  it('should persist the query parameter in the link to a pokémon', () => {});

  it('should bring you to the route for the correct pokémon', () => {});

  it('should immediately fetch a pokémon if a query parameter is provided', () => {});
});
