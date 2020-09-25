
describe('Login Page', () => {

    beforeEach(() => {

        console.log("Before hook");

    });


    it('should display header', () => {
          
       // Add cy.visit here
        cy.contains("Welcome");
        cy.get('input[name=email]').type('test');
        cy.get('input[name=password]').type(`test{enter}`);
        cy.contains("We didn't recognize your credentials. Please try again");
    
        
    })

});