const { faker } = require('@faker-js/faker');

describe('Testing login application for company in ABC Jobs', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Login Company Success', () => {
        cy.get('[id="email"]', { timeout: 5000 }).should('be.visible');
        cy.get("input[id='email']").type("s.rojash@uniandes.edu.co",{force: true});
        cy.get('[id="password"]', { timeout: 5000 }).should('be.visible');
        cy.get("input[id='password']").type("12345",{force: true});
        cy.get('select').should('be.visible');
        cy.get('select').select('0');
        cy.get('button[type=submit]').should('be.visible');
        cy.get('button[type=submit]').click();
    })
});
