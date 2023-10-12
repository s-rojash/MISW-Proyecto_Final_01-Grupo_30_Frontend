import { Utilities } from "./utilities/utilities"
import { faker } from '@faker-js/faker';

describe('Create museum', () => {

    let utility = new Utilities();
   
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Prueba Positiva: Desplegar la opción de crear museo, validar que se muestra el formulario, ingresar datos aleatorios, pulsar crear. Luego ingresar a la lista de museos, buscar que el museo creado este en la lista', () => {

        utility.showCreateMuseums();
        //validar que se despliegue el componente crear
        cy.get('app-museum-create');
        
        //Search for Create Museum title
        utility.getMessage('Create a new museum', 'h2');
        //genera datos para el formulario
        let name = faker.company.companyName();
        let description = faker.lorem.paragraph();
        let address = faker.address.streetAddress(true);
        let city = faker.address.cityName();
        let image = faker.image.business();
        //busca campos del formulario 
        cy.get("input[id='name']").type(name,{force: true});
        cy.get("textarea[id='description']").type(description,{force: true});
        cy.get("input[id='address']").type(address,{force: true});
        cy.get("input[id='city']").type(city,{force: true});
        cy.get("input[id='image']").type(image,{force: true});
        
        //pulsar crear
        cy.get('button[type="submit"]').click({force: true});    
        
        cy.wait(5000);
        //listar Museos
        utility.listMuseums();
        cy.wait(2000);
        //Search for Museum List Title
        utility.getMessage('Museums List', 'h1');
        //Busca el museo creado
        utility.getMessage(name, 'a');
        //pulsa en la lista para ver el detalle
        cy.get("a[class='list-group-item list-group-item-action']").contains(name).click({force: true});
    });

});