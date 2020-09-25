describe('Login Page', () => {

    it('should display header', () => {
          
        cy.visit("https://glass.acptfanniemae.com/portal#/signin");
        cy.contains("Welcome");
        cy.get('input[name=email]').type('test');
        cy.get('input[name=password]').type(`test{enter}`);
        cy.contains("We didn't recognize your credentials. Please try again");
    
        
    })

});