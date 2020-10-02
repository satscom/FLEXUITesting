
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
        // cy.get('.ui-dd-menu-item-icon').should('include', 'flex automation1')
        cy.get(':nth-child(2) > .dropdown-title').click()
    })

    beforeEach(() => {
        cy.fixture('fundingRequestResponseInHoldState1.json').as("holdJSON");
        cy.server();
        cy.route('/fez/flexapi/fundingrequest/details**', "@holdJSON").as("hold");

        cy.fixture('fundingRequestRemoveHoldResponse.json').as("removeHoldJSON");
        cy.route('PUT','/fez/flexapi/fundingrequest/removehold', "@removeHoldJSON").as("removeHold");

        cy.fixture('fundingRequestResponseInRequestState1.json').as("noHoldJSON");
        cy.route('/fez/flexapi/fundingrequest/details?fndgStatTyp=Requested&fndgHldInd=N**', "@noHoldJSON").as("noHold");

        cy.fixture('fundingRequestPlaceHoldResponse.json').as("placeHoldJSON");
        cy.route('PUT','/fez/flexapi/fundingrequest/placehold', "@placeHoldJSON").as("placeHold");

        cy.fixture('fundingRequestCancelResponse.json').as("cancelJSON");
        cy.route('PUT','/fez/flexapi/fundingrequest/cancel', "@cancelJSON").as("cancel");

        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        
    });


    it ("User filters on Requested FR, and removes hold", () => {
        cy.url().should('include', '/funding-request')
        cy.get('#status > .dropdown > .form-control').select('Requested')
        cy.get('#status > .dropdown > .form-control').should('have.value', 'Requested')
        cy.get('#hold > .dropdown > .form-control').select('Y')
        cy.get('#hold > .dropdown > .form-control').should('have.value', 'Y')
        cy.get('[type="submit"]').click()
        cy.get('tr[class=ng-star-inserted]', {timeout:10000}).should('be.visible')
        cy.get('input[name=fndgChkBox]').eq(0).click()
        cy.get('#useraction').select('Remove Hold')
        cy.get('.ui-confirmdialog-message').should('contain', 'remove hold on the selected')
        cy.get('.ui-dialog-footer > .c-button--primary > span').click()
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-content > .ng-star-inserted').should('contain', 'processed Successfully')
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-footer > fm-footer-template > .c-button > span').click()
    })

    it ("User filters on Requested FR, and places hold", () => {
        cy.url().should('include', '/funding-request')
        cy.get('#status > .dropdown > .form-control').select('Requested')
        cy.get('#status > .dropdown > .form-control').should('have.value', 'Requested')
        cy.get('#hold > .dropdown > .form-control').select('N')
        cy.get('#hold > .dropdown > .form-control').should('have.value', 'N')
        cy.get('[type="submit"]').click()
        cy.get('tr[class=ng-star-inserted]', {timeout:10000}).should('be.visible')
        cy.get('input[name=fndgChkBox]').eq(0).click()
        cy.get('#useraction').select('Place Hold')
        cy.get('.ui-confirmdialog-message').should('contain', 'place hold on the selected')
        cy.get('.ui-dialog-footer > .c-button--primary > span').click()
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-content > .ng-star-inserted').should('contain', 'processed Successfully')
        cy.get('fm-dialog.ng-tns-c4-6 > .ui-dialog > .ui-dialog-footer > fm-footer-template > .c-button > span').click()
    })


    it ("User filters on Requested FR, and cancels the loan", () => {
        cy.url().should('include', '/funding-request')
        cy.get('#status > .dropdown > .form-control').select('Requested')
        cy.get('#status > .dropdown > .form-control').should('have.value', 'Requested')
        cy.get('#hold > .dropdown > .form-control').select('N')
        cy.get('#hold > .dropdown > .form-control').should('have.value', 'N')
        cy.get('[type="submit"]').click()
        cy.get('tr[class=ng-star-inserted]', {timeout:10000}).should('be.visible')
        cy.get('input[name=fndgChkBox]').eq(0).click()
        cy.get('#useraction').select('Cancel FR')
        cy.get('.ui-confirmdialog-message').should('contain', 'you want to Cancel')
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