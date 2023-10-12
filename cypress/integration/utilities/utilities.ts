export class Utilities {
 
    goHome()
    {
        cy.visit('/')
        cy.contains('Musearch')
        cy.wait(2000)
    }
        
    getMessage(error, selector)
    {   
            var errorExists=0; var element2='';
            cy.get(selector).then(($elements)=>{
                for(var i=0;i < $elements.length; i++)
                {
                    element2 = $elements[i].innerText;
                    console.log(`Texto del selector ${element2} ---error ${error}`);
                    //await this.driver.writeSignal(page);
                    if(element2.toString().trim() === error.toString().trim())
                    {
                        console.log("Encontrado");
                        errorExists=1;
                        expect(element2).to.equal(error)
                        return true;
                    }
                }
                if(!errorExists)
                        expect(element2).to.equal(false);
            }) ;
    }
    listArtists()
    {
        //search for Artists menu
        cy.get('a[id="navbarDropdown4"]').click({force: true});
        cy.wait(100)
        //Press List
        cy.get('a[routerlink="/artistas/list"]').click({force: true});    
        cy.wait(5000)
        //Verify URL
        cy.url().should('include', '/artistas/list');
    }
    listMuseums()
    {
        //search for Museums menu
        cy.get('a[id="navbarDropdown2"]').click({force: true});
        cy.wait(100)
        //Press List
        cy.get('a[routerlink="/museums/list"]').click({force: true});    
        cy.wait(5000)
        //Verify URL
        cy.url().should('include', '/museums/list');
    }
    pushElementFromElements(selector, index)
    {
        cy.get(selector).then(($elements)=>{
                 $elements[index].click({force: true});
          });
    }
    showCreateMuseums()
    {
        //search for Museums menu
        cy.get('a[id="navbarDropdown2"]').click({force: true});
        cy.wait(100)
        //Press List
        cy.get('a[routerlink="/museums/create"]').click({force: true});    
        cy.wait(1000)
        //Verify URL
        cy.url().should('include', '/museums/create');
    }
    showCreateArtist()
    {
        //search for Museums menu
        cy.get('a[id="navbarDropdown4"]').click({force: true});
        cy.wait(100)
        //Press List
        cy.get('a[routerlink="/artistas/create"]').click({force: true});    
        cy.wait(1000)
        //Verify URL
        cy.url().should('include', '/artistas/create');
    }
    showCreateMovement()
    {
        //search for Museums menu
        cy.get('a[id="navbarDropdown6"]').click({force: true});
        cy.wait(100)
        //Press List
        cy.get('a[routerlink="/movements/create"]').click({force: true});    
        cy.wait(1000)
        //Verify URL
        cy.url().should('include', '/movements/create');
    }
}
