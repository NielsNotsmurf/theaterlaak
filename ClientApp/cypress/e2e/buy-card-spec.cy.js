describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Programmering')
        cy.get('button[id="meerButton"]').click()
        cy.get('button[id="bestellen"]').click()
    })
  })