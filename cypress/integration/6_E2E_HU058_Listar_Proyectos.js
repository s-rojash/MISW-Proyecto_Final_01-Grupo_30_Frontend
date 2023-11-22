const { faker } = require('@faker-js/faker');

describe('Testing list projects of the company in ABC Jobs', () => {
    let nameproject = faker.lorem.word(6);
    let descriptionproject = faker.lorem.words(3);

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test list projects of the company Success', () => {
        cy.get('[id="email"]', { timeout: 5000 }).should('be.visible');
        cy.get("input[id='email']").type("s.rojash@uniandes.edu.co",{force: true});
        cy.get('[id="password"]', { timeout: 5000 }).should('be.visible');
        cy.get("input[id='password']").type("12345",{force: true});
        cy.get('select').should('be.visible');
        cy.get('select').select('0');
        cy.get('button[type=submit]').should('be.visible');
        cy.get('button[type=submit]').click();
        cy.get('a[id="navbarDropdown2"]', { timeout: 5000 }).should('be.visible');
        cy.get('a[id="navbarDropdown2"]').click();
        cy.get('a[routerlink="/projects/create"]', { timeout: 5000 }).should('be.visible');
        cy.get('a[routerlink="/projects/create"]').click();
        cy.get('input[formcontrolname="nombre"]', { timeout: 5000 }).should('be.visible');
        cy.get('input[formcontrolname="nombre"]').type( nameproject, {force: true});
        cy.get('input[formcontrolname="descripcion"]').type(descriptionproject, {force: true});
        cy.get('button[type=submit]').should('not.be.disabled');
        cy.get('button[type=submit]').click();
        cy.contains('mat-card-title', nameproject, { timeout: 5000 }).should('be.visible');
        cy.contains('mat-card-subtitle', descriptionproject, { timeout: 5000 }).should('be.visible');
        cy.get('a[id="navbarDropdown2"]', { timeout: 5000 }).should('be.visible');
        cy.get('a[id="navbarDropdown2"]').click();
        cy.get('a[routerlink="/projects/get"]', { timeout: 5000 }).should('be.visible');
        cy.get('a[routerlink="/projects/get"]').click();
        cy.contains('mat-card-title', nameproject, { timeout: 5000 }).should('be.visible');
        cy.contains('mat-card-subtitle', descriptionproject, { timeout: 5000 }).should('be.visible');
    })
});
