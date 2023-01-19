describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Registreren')
        cy.get('input[name="firstName"]').type('henk')
        cy.get('input[name="lastName"]').type('pleister')
        cy.get('input[name="UserName"]').type('drerrie@hotmail.com')
        cy.get('input[name="password"]').type('Plmojn1@')
        cy.get('input[name="confirmPassword"]').type('Plmojn1@')
        cy.get('button[type="submit"]').click()
    })
})