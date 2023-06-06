Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Lidia')
    cy.get('#lastName').type('Cutri')
    cy.get('#email').type('lidiacutri@teste.com')
    cy.get('#open-text-area').type('teste teste')
    cy.contains('button','Enviar').click()    
})
