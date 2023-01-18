describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/registreren')
        cy.get('input[name="firstName"]').type('henk')
        cy.get('input[name="lastName"]').type('pleister')
        cy.get('input[name="UserName"]').type('test@test.nl')
        cy.get('input[name="password"]').type('Qwerty123!')
        cy.get('input[name="confirmPassword"]').type('Qwerty123!')
        cy.get('button[type="submit"]').click()
    })
})