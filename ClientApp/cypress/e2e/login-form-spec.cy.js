describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Login')
        cy.get('input[type="email"]').type('test123@hotmail.com')
        cy.get('input[type="password"]').type('qwerty123!w')
        cy.get('button[type="submit"]').click()
    })
})