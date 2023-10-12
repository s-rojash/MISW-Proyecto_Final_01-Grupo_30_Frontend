import { Utilities } from "./utilities/utilities"

describe('List artists', () => {

    let utility = new Utilities();
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Validar que se encuentre desplegada la lista de artistas, y busca que hayan artistas desplegados', () => {
        
        utility.listArtists();
        //Search for Museum List Title
        utility.getMessage('Artists List', 'h1');
        //validar que se despliegue el componente listar
        cy.get('app-artist-list');
        //busca etiquetas usadas en la lista para mostrar artistas
        cy.get("a[class='list-group-item list-group-item-action']");
    });

});
