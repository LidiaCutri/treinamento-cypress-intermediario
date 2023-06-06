/// <reference types="Cypress" />

it('020 - testa a página do link de forma independete', function(){
    cy.visit('/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})