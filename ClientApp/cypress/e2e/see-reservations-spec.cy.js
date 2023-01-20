describe( 'See Reservations', () => {
    it( 'should display reservations' , () => {
        cy.visit( 'https://localhost:44492/profiel' );
        cy.get('button[id="showReserveringen"]').click()
    })
})