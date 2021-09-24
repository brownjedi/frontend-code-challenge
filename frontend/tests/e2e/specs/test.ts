/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
// https://docs.cypress.io/api/introduction/api.html

describe('Pokédex', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'What Pokémon are you looking for?')
  })

  it('should render search results correctly', () => {
    cy.visit('/')
    cy.get('[data-cy=pokemon-search]').type('char')
    cy.get('[data-cy=pokemon-card]').should('have.length', 3)
    cy.get('[data-cy=pokemon-card]').first().contains('Charmander')
  })

  it('should render filter results correctly', () => {
    cy.visit('/')
    cy.get('[data-cy=filter-button]').contains('Dragon').click()
    cy.get('[data-cy=pokemon-card]').should('have.length', 3)
    cy.get('[data-cy=pokemon-card]').first().contains('Dratini')
  })

  it('should render more results when scrolling to bottom of the page', () => {
    cy.visit('/')
    cy.get('[data-cy=pokemon-card]').should('have.length', 30)
    cy.get('[data-cy=infinite-loading]').scrollIntoView({ duration: 2000 })
    cy.get('[data-cy=pokemon-card]').should('have.length', 60)
  })

  it('should render the pokemon info page when clicked', () => {
    cy.visit('/')
    cy.get('[data-cy=pokemon-card-name]')
      .first()
      .then($el => {
        const text = $el.text()

        $el.trigger('click')
        cy.location('pathname').should('eq', `/${text.toLowerCase()}`)
      })
  })
})
