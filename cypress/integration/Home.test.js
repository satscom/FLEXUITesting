describe('Login Page', () => {

    it('should display header', () => {
          
        cy.visit("https://glass.acptfanniemae.com/portal#/signin");
        cy.contains("Welcome");
        
    })

});