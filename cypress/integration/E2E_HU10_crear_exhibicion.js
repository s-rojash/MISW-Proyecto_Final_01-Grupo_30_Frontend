const { faker } = require('@faker-js/faker');

describe('Testing Ghost application Museums', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Create Exhibition', () => {
        let name = faker.name.firstName();

        cy.get('[id="principal"]', { timeout: 5000 }).should('be.visible');
        cy.get('[id="navbarDropdown5"]').click({force: true});
        cy.get('[routerlink="/sponsors/create"]').click({force: true});
        cy.wait(3000);
        cy.get('[type="submit"]', { timeout: 5000 }).should('be.visible');
        cy.get('[id="name"]').type(name);
        cy.get('[id="description"]').type(faker.random.alpha(15));
        cy.get('[id="website"]').type(faker.internet.url());
        cy.wait(1000);
        cy.get('[type="submit"]').click({force: true});
        cy.wait(1000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[class="list-group-item list-group-item-action"]').each(($el, index, $list) => {
            if(index == 0){
                expect($list).to.contain(name)
            }
        });

        cy.get('[id="navbarDropdown2"]').click({force: true});
        cy.get('[routerlink="/museums/list"]').click({force: true});
        cy.wait(10000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[class="list-group-item list-group-item-action"]').each(($el, index, $list) => {
            if(index == 0){
                cy.wrap($el).click({force: true});
            }
        });
        cy.get('app-museum-detail', { timeout: 5000 }).should('be.visible');
        cy.get('[class="btn btn-primary"]').click({force: true});
        cy.wait(5000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[routerlink="/exhibitions/create"]').click({force: true});
        cy.get('[type="submit"]', { timeout: 5000 }).should('be.visible');
        cy.get('[id="name"]').type(name);
        cy.get('[id="description"]').type(faker.random.alpha(15));
        cy.get('select').each(($el, index, $list) => {
            cy.wrap($el).select(1);
        });
        cy.get('[type="submit"]').click({force: true});
        cy.wait(1000);
        cy.get('[class="col-4"]', { timeout: 5000 }).should('be.visible');
        cy.get('[class="list-group-item list-group-item-action"]').each(($el, index, $list) => {
            if(index == 0){
                expect($list).to.contain(name)
            }
        });
    })
});
