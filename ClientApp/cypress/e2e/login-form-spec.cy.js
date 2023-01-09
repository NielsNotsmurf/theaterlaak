describe('login form', () => {
    it('passes', () => {
        cy.visit('https://localhost:44492/Identity/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dtheaterlaak%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A44492%252Fauthentication%252Flogin-callback%26response_type%3Dcode%26scope%3DtheaterlaakAPI%2520openid%2520profile%26state%3Dded7ac6d788b471aa84fed3bbd3c8a60%26code_challenge%3DGQ58B2oQ9FhjKO1r39r4Xa11B7ZsOQ7Mdzp7tCnCeT4%26code_challenge_method%3DS256%26response_mode%3Dquery')
        cy.get('input[name="Email"]').type('alice')
        cy.get('input[name="Password"]').type('password')
        cy.get('button[type="submit"]').click()
    })
})