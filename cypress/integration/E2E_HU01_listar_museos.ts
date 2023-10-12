import { Utilities } from "./utilities/utilities"

describe('List museums', () => {

    let utility = new Utilities();
    beforeEach('Navigate to home', ()=>{
        utility.goHome();
    })

    it('1. Validar que se encuentre desplegada la lista de museos, y busca que hayan museos desplegados', () => {
        
        utility.listMuseums();
        //Search for Museum List Title
        utility.getMessage('Museums List', 'h1');
        //busca etieutas usadas 
        cy.get("a[class='list-group-item list-group-item-action']");
    });

});


