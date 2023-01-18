describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Login')
        cy.get('input[type="userName"]').type('test123@hotmail.com')
        cy.get('input[type="Password"]').type('qwerty123!w')
        cy.get('button[type="submit"]').click()
    })
})