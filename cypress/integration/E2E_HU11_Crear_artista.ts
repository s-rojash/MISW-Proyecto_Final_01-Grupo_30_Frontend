import { Utilities } from "./utilities/utilities"
import { faker } from '@faker-js/faker';

describe('Create Artist', () => {

    let utility = new Utilities();
   
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Prueba Positiva: Desplegar la opción de crear artista, validar que se muestra el formulario, ingresar datos aleatorios, pulsar crear. Luego ingresar a la lista de artistas, buscar que el artista este creado este en la lista', () => {

        utility.showCreateArtist();
        //validar que se despliegue el componente crear
        cy.get('app-artist-create');
        
        //Search for Create Artist title
        utility.getMessage('Create a new artist', 'h2');
        //genera datos para el formulario
        let name = faker.name.findName();
        let birthplace = faker.address.country();
        let birthdate = faker.date.past(50).toLocaleDateString('en-CA');
        //let birthdate = birth.substring(0,10);
        let image = faker.image.people();
        //busca campos del formulario 
        cy.get("input[id='name']").type(name,{force: true});
        cy.get("input[id='birthplace']").type(birthplace,{force: true});
        cy.get("input[id='birthdate']").type(birthdate,{force: true});
        cy.get("input[id='image']").type(image,{force: true});
        
       //pulsar crear
        cy.get('button[type="submit"]').click({force: true});    
        
        cy.wait(5000);
        //listar Museos
        utility.listArtists();
        cy.wait(2000);
        //Search for Artist List Title
        utility.getMessage('Artists List', 'h1');
        //validar que se despliegue el componente listar
        cy.get('app-artist-list');
        //Busca el artista creado
        utility.getMessage(name, 'a');
        //pulsa en la lista para ver el detalle
        cy.get("a[class='list-group-item list-group-item-action']").contains(name).click({force: true});
    });

});