const { faker } = require('@faker-js/faker');

describe('Testing Ghost application Museums', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Artworks List', () => {
        cy.get('[id="principal"]', { timeout: 5000 }).should('be.visible');
        cy.get('#navbarDropdown2').click({force: true});
        cy.get(':nth-child(1) > .dropdown-menu > :nth-child(1) > .dropdown-item').click({force: true});
        cy.wait(10000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get(':nth-child(1) > .list-group-item').click({force: true});
        cy.wait(5000);
        cy.get('.btn').click({force: true});
        cy.wait(10000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get(':nth-child(2) > .list-group-item').click({force: true});
        cy.wait(5000);
        cy.get('.col-2 > .btn').click({force: true});
        // cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('.associateArtwork > .btn').click({force: true});
        cy.wait(1000);
        cy.get('.associateArtwork > .btn').click({force: true});
        cy.get('#addArtwork').select(1);
        cy.wait(1000);
        cy.get('.card > .btn').click({force: true});
        cy.get('.toast-title', { timeout: 5000 }).should('be.visible');
        cy.reload()
    })
});
