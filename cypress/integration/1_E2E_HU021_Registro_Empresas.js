const { faker } = require('@faker-js/faker');

describe('Testing signup company in application ABC Jobs', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('Test Signup Company Success', () => {
      cy.get('[id="email"]', { timeout: 5000 }).should('be.visible');
      cy.get('a[class="mat-mdc-card-subtitle"]').first().click();
      cy.get('button[routerlink="/signup/company"]', { timeout: 5000 }).should('be.visible');
      cy.get('button[routerlink="/signup/company"]').click();
      cy.get('input[formcontrolname="razonSocial"]', { timeout: 5000 }).should('be.visible');
      cy.get('input[formcontrolname="razonSocial"]').type("Empresa de prueba",{force: true});
      cy.get("input[formcontrolname='numDocumento']").type("12345",{force: true});
      cy.get("input[formcontrolname='digitoVerificacion']").type("0",{force: true});
      cy.get("input[formcontrolname='email']").type("s.rojash@uniandes.edu.co",{force: true});
      cy.get("input[formcontrolname='password']").type("12345",{force: true});
      cy.get('button[type=submit]').should('not.be.disabled');
      cy.get('button[type=submit]').click();
      cy.get('h3', { timeout: 5000 }).invoke('text').should('match', /(Empresa creada correctamente)|(Company created successfully)/);
    })
});
