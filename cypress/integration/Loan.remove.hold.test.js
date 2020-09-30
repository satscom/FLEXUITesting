//const { describe } = require("mocha");

describe("Early Funding User can remove hold from a Funding Request", () => {

    it('User logs in', () => {
        cy.visit("/portal#/signin");
        cy.contains("Welcome");
        cy.get('input[name=email]').type(Cypress.env("userName"));
        cy.get('input[name=password]').type(Cypress.env("password"));
        cy.contains('SIGN IN').click();
    })

    it ('User navigates to FundingRequest view', () => {
        cy.url().should('include', '/glass-home')
        cy.get('.md-card').click()
        cy.url().should('include', '/home')
        cy.get(':nth-child(2) > .dropdown-title').click()
    })

    it ("User can filter on Authorized FR, and removes hold", () => {
        cy.url().should('include', '/funding-request')
        cy.get('#status > .dropdown > .form-control').select('Authorized')
        cy.get('#status > .dropdown > .form-control').should('have.value', 'Authorized')
        cy.get('#hold > .dropdown > .form-control').select('Y')
        cy.get('#hold > .dropdown > .form-control').should('have.value', 'Y')
        //Add to search based on specific id
        cy.get('[type="submit"]').click()
        cy.get('input[name=fndgChkBox]').click({ multiple: true })
        cy.get('#useraction').select('Remove Hold')
        cy.get('fm-confirmdialog.ng-tns-c19-5 > .ui-dialog > .ui-dialog-content').should('contain', 'remove hold on the selected')
        cy.get('.ui-dialog-footer > .c-button--primary > span').click()
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-content > .ng-star-inserted').should('contain', 'processed Successfully')
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-footer > fm-footer-template > .c-button > span').click()
    })

    it('User logs out', () => {
        cy.get('.ui-dd-menu-item-icon').click()
        cy.get('span[class=ui-menuitem-text]').click()
        cy.url().should('include', '/signin')
    })
        
})