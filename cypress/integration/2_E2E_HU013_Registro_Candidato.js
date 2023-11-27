const { faker } = require('@faker-js/faker');

describe('Testing signup applicant in application ABC Jobs', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Signup Applicant Success', () => {
      cy.get('[id="email"]', { timeout: 5000 }).should('be.visible');
      cy.get('a[class="mat-mdc-card-subtitle"]').first().click();
      cy.get('button[routerlink="/signup/applicant"]', { timeout: 5000 }).should('be.visible');
      cy.get('button[routerlink="/signup/applicant"]').click();
      cy.get('input[formcontrolname="nombres"]', { timeout: 5000 }).should('be.visible');
      cy.get('input[formcontrolname="nombres"]').type("Steve",{force: true});
      cy.get('input[formcontrolname="apellidos"]').type("Rojas",{force: true});
      cy.get("input[formcontrolname='numDocumento']").type("1234",{force: true});
      cy.get("input[formcontrolname='celular']").type("3183104480",{force: true});
      cy.get("input[formcontrolname='email']").type("s.rojash@uniandes.edu.co",{force: true});
      cy.get("input[formcontrolname='password']").type("12345",{force: true});
      cy.get('button[type=submit]').should('not.be.disabled');
      cy.get('button[type=submit]').click();
      cy.get('h3', { timeout: 5000 }).invoke('text').should('match', /(Usuario creado correctamente)|(User created successfully)/);
    })
});
