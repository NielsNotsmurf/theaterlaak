describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/login')
        cy.get('input[name="UserName"]').type('test@test.nl')
        cy.get('input[name="password"]').type('Qwerty123!')
        cy.get('button[type="submit"]').click()

        // cy.visit('https://localhost:44492/beheer')
        // cy.get('button[data-test-id="showtje-toevoegen"]').click()
        // cy.url().should('include', '/beheer/show-toevoegen')      
    })
})