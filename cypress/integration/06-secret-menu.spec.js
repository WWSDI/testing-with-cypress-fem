/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  describe('should change menu items based on restaurant filter', () => {
    for (let restaurant of restaurants) {
      it(`when ${restaurant} is selected`, () => {
        cy.get('#restaurant-visibility-filter').select(restaurant);
        cy.get('#restaurant-visibility-filter').should('have.value', restaurant);
        cy.get('.whereToOrder').each(($where) => cy.wrap($where).contains(restaurant));
      });
    }
  });

  describe('should change menu items based on rating filter', () => {
    for (let rating of ratings) {
      it(`when ${rating} is selected`, () => {
        cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('input');
        cy.get('.popularity').each(($popularity) =>
          // you don't always have to use Cypress chainers, sometimes sticking to jQuery and old fashion expect() is much simpler.
          expect(+$popularity.text()).to.be.gte(rating)
        );
      });
    }
  });
});
