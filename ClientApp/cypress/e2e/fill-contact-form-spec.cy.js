describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Contact')
        cy.get('input[id=inputName]').type('Henk Pleister')
        cy.get('input[id=inputMail]').type('henkpleister9@gmail.com')
        cy.get('textarea[id=inputMessage]').type('hfhfhfhfhfhhfhfhfhfhfhfhfhfhhfhfhfhfhfhhhhfhfhfhfhfhfhfhfhhfhfhf')
        cy.get('button[type=submit]').click()
    })
  })