/// <reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', function(){

    this.beforeEach(function(){
        cy.visit('/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('001 - Preencha os campos obrigatórios e envia o formulário', function(){
        const textolongo = "teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, testetextolongotextolongotextolongotextolongotextolongotextolongotextolongotextolongotextolongotextolongotextolongo"
        
        cy.get('#firstName').type('Lidiadelay')
        cy.get('#lastName').type('Cutri')
        cy.get('#email').type('lidiacutri@teste.com')
        cy.get('#open-text-area').type(textolongo, { delay:0 })
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('002 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Lidiadelay')
        cy.get('#lastName').type('Cutri')
        cy.get('#email').type('lidiacutri')
        cy.get('#open-text-area').type('teste teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('003 - Validar campo de telefone no qual só aceita números', function(){
        cy.get('#phone').type('teste').should('have.value', '')
    })

    it('004 - Exibe msg de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lidiadelay')
        cy.get('#lastName').type('Cutri')
        cy.get('#email').type('lidiacutri')
        cy.get('#open-text-area').type('teste teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('005 - Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Lidia')
        .should('have.value','Lidia')
        .clear()
        .should('have.value','');

        cy.get('#lastName').type('Cutri').should('have.value','Cutri').clear().should('have.value','');
        cy.get('#email').type('lidiacutri@teste.com').should('have.value','lidiacutri@teste.com').clear().should('have.value','');
    })

    it('006 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('007 - Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('008 - Utilizando o comando contains', function(){
        cy.get('#firstName').type('Lidiadelay')
        cy.get('#lastName').type('Cutri')
        cy.get('#email').type('lidiacutri@teste.com')
        cy.get('#open-text-area').type('teste teste')
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('009 - seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('010 - seleciona um produto (mentoria) por seu valor', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('011 - seleciona um produto (Blog) pelo seu indice', function(){
        cy.get('#product').select(1).should('have.value','blog')
    })

    it('012 - marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]').check().should('have.value','feedback')
    })

    it('013 - marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('014 - marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })

    it('015 - seleciona um arquivo para upload', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/support/e2e.js')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('e2e.js')
        })
    })

    it('016 - seleciona um arquivo para upload utilizando a função drag-and-drop - arrastar arquivo', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('017 - seleciona um arquivo para upload utilizando um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })        
    })

    it('018 - verifica que a política de privacidade abre em outra aba', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('019 - acessa a página da política de privacidade revomento o target', function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target').click()
    })
})