const { it } = require("mocha");

describe('Login Page', () => {

    beforeEach(() => {

     // Mock server will be added here

    });


    it('should display header', () => {
        let pwd = Cypress.env("password");  
        cy.visit(Cypress.env("siteURL"));
        cy.contains("Welcome");
        cy.get('input[name=email]').type(Cypress.env("userName"));
        cy.get('input[name=password]').type(Cypress.env("password"));
        cy.contains('SIGN IN').click();
        
    })

    
});