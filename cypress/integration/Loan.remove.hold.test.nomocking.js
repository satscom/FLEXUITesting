
describe("Early Funding User can remove hold from a Funding Request", () => {

    before(() => {
        cy.visit("/portal#/signin");
        cy.contains("Welcome");
        cy.get('input[name=email]').type(Cypress.env("userName"));
        cy.get('input[name=password]').type(Cypress.env("password"));
        cy.contains('SIGN IN').click();
        cy.url().should('include', '/glass-home')
        cy.get('.md-card').click()
        cy.url().should('include', '/home')
        cy.get('span[class=ui-dd-menu-item-icon]').should('contain', 'flex automation1') //'FlexAuto Acpt1'
        cy.get(':nth-child(2) > .dropdown-title').click()
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        
    });

    it ("User can filter on Requested FR, and removes hold", () => {
        cy.url().should('include', '/funding-request')
        cy.get('#status > .dropdown > .form-control').select('Requested')
        cy.get('#status > .dropdown > .form-control').should('have.value', 'Requested')
        cy.get('#lender_name').type('ARBOR')
        cy.get('#ddfLoanId').type('0838183060')
        cy.get('[type="submit"]').click()
        cy.get('fm-loading-spinner').should('be.visible')
        cy.get('fm-loading-spinner').should('not.be.visible')
        cy.get('tr[class=ng-star-inserted]', {timeout:10000}).should('be.visible')
        cy.get('input[name=fndgChkBox]').eq(0).click()
        cy.get('#useraction').select('Remove Hold')
        cy.get('.ui-confirmdialog-message').should('contain', 'remove hold on the selected')
        cy.get('.ui-dialog-footer > .c-button--primary > span').click()
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-content > .ng-star-inserted').should('contain', 'processed Successfully')
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-footer > fm-footer-template > .c-button > span').click()
        cy.get('[type="submit"]').click()
        cy.get('.hold-font').should('contain', 'N')

    })

    it('User logs out', () => {
        cy.get('.ui-dd-menu-item-icon').click()
        cy.get('span[class=ui-menuitem-text]').click()
        cy.url().should('include', '/signin')
    })
        
})