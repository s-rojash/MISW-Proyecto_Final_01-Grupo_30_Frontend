const { faker } = require('@faker-js/faker');

describe('Testing Ghost application Museums', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Login Applicant Success', () => {
      cy.get('[id="email"]', { timeout: 5000 }).should('be.visible');
      cy.get("input[id='email']").type("s.rojash@uniandes.edu.co",{force: true});
      cy.get('[id="password"]', { timeout: 5000 }).should('be.visible');
      cy.get("input[id='password']").type("12345",{force: true});
      cy.get('select').should('be.visible');
      cy.get('select').select('1');
      cy.get('button[type=submit]').should('be.visible');
      cy.get('button[type=submit]').click();
    })
});
