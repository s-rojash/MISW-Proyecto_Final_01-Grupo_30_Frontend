const { faker } = require('@faker-js/faker');

describe('Testing Ghost application Museums', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Artist Detail', () => {
        cy.get('[id="principal"]', { timeout: 5000 }).should('be.visible');
        cy.get('[id="navbarDropdown4"]').click({force: true});
        cy.get('[routerlink="/artistas/list"]').click({force: true});
        cy.wait(10000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[class="list-group-item list-group-item-action"]').each(($el, index, $list) => {
            if(index == 0){
                cy.wrap($el).click({force: true});
            }
        });
        cy.get('app-artist-detail', { timeout: 5000 }).should('be.visible');
    })
});
