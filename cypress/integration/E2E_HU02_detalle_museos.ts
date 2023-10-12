import { Utilities } from "./utilities/utilities"

describe('List museums', () => {

    let utility = new Utilities();
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Ir a la lista de museos, seleccionar uno, y validar que se despliegue el detalle', () => {
        
        utility.listMuseums();
        //Search for Museum List Title
        utility.getMessage('Museums List', 'h1');
        //busca las lista de museos y presiona el primer elemento 
        utility.pushElementFromElements("a[class='list-group-item list-group-item-action']", 0);
        //validar que se despliegue el componente detalle
        cy.get('app-museum-detail');
        //validar que se despliegue la imagen
        cy.get('img[class="img-fluid"]');
    });

});