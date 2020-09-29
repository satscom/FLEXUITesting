const { it } = require("mocha");

describe('Login Page', () => {

    beforeEach(() => {

        cy.fixture('asapplus.json').as("asapJSON");

        cy.server();

        cy.route('fez/flexapi/asapmanagement/summary/ALL/2020-09-28/2020-09-28', "@asapJSON").as("asap");

    });


    it('should display header', () => {
        
        cy.visit(Cypress.env("siteURL"));
        cy.contains("Welcome");
        cy.get('input[name=email]').type(Cypress.env("userName"));
        cy.get('input[name=password]').type(Cypress.env("password"));
        cy.contains('SIGN IN').click();
        
    })

    
});