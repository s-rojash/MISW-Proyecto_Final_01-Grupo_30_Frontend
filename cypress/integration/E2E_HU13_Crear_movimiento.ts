import { Utilities } from "./utilities/utilities"
import { faker } from '@faker-js/faker';

describe('Create Artist', () => {

    let utility = new Utilities();
   
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Prueba Positiva: Desplegar la opción de crear Movimiento, validar que se muestra el formulario, ingresar datos aleatorios, pulsar crear.', () => {

        utility.showCreateMovement();
        //validar que se despliegue el componente crear
        cy.get('app-movement-create');
        
        //Search for Create Movement title
        utility.getMessage('Create a new movement', 'h2');
        //genera datos para el formulario
        let name = faker.lorem.word();
        let description = faker.lorem.paragraph();
        let countryOfOrigin = faker.address.country();
        let activeYears = faker.random.number(100).toString();
        //busca campos del formulario 
        cy.get("input[id='name']").type(name,{force: true});
        cy.get("textarea[id='description']").type(description,{force: true});
        cy.get("input[id='countryOfOrigin']").type(countryOfOrigin,{force: true});
        cy.get("input[id='activeYears']").type(activeYears,{force: true});
        
       //pulsar crear
        cy.get('button[type="submit"]').click({force: true});    
        
        cy.wait(7000);
        
    });

});