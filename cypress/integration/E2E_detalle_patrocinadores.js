const { faker } = require('@faker-js/faker');

describe('Testing Ghost application Museums', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Sponsor Details', () => {
        cy.get('[id="principal"]', { timeout: 5000 }).should('be.visible');
        cy.get('[id="navbarDropdown5"]').click({force: true});
        cy.get('[routerlink="/sponsors/list"]').click({force: true});
        cy.wait(10000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[class="list-group-item list-group-item-action"]').each(($el, index, $list) => {
            if(index == 0){
                cy.wrap($el).click({force: true});
            }
        });
        cy.get('app-sponsor-details', { timeout: 5000 }).should('be.visible');
    })
});
