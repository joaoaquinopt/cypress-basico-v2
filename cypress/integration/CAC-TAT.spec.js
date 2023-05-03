/// <reference types="Cypress" />

import fillMandatoryFieldsAndSubmit from '../support/commands'

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('[id="firstName"]').type('Joao')
        cy.get('[id="lastName"]').type('Aquino')
        cy.get('[id="email"]').type('testeaquino@gmail.com')
        cy.get('[id="open-text-area"]').type('Quero conseguir fazer os testes automáticos com cypress e também tentar colocar um delay a zero', { delay: 0 })
        cy.contains('.button', 'Enviar').click()
        //cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Aquino')
        cy.get('#email').type('testeaquino@.com')
        cy.get('#open-text-area').type('Quero conseguir fazer os testes automáticos com cypress')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('digite um telefone não-numérico, para validar que seu campo continuara vazio', () => {
        cy.get('#phone')
            .type('lelelelel')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Aquino')
        cy.get('#email').type('testeaquino@yahoo.com')
        cy.get('#open-text-area').type('Quero conseguir fazer os testes automáticos com cypress')
        cy.get('#phone-checkbox').check()
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Joao')
            .should('have.value', 'Joao')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Aquino')
            .should('have.value', 'Aquino')
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type('testeaquino@yahoo.com')
            .should('have.value', 'testeaquino@yahoo.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(92760204)
            .should('have.value', 92760204)
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('Joao', 'Aquino', 'test@test.com', 'Apenas um test de botão')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    // it('marca o tipo de atendimento "Feedback"', () => {
    //     cy.get('input[type="radio"]')
    //         .check('feedback')
    //         .should('be.checked')
            
    // })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
            
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each( function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
                
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .as('checkboxs')
            .check()
            .should('be.checked')

        cy.get('@checkboxs')
            .last('phone')
            .uncheck()
            .should('not.be.checked')  
    })

    it.skip('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json').then( input => {
                expect(input[0].files[0].name).to.eql('example.json')
            })        
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should( input => {
                expect(input[0].files[0].name).to.eql('example.json')
            })        
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should( input => {
                expect(input[0].files[0].name).to.eql('example.json')
            })        
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should( input => {
                expect(input[0].files[0].name).to.eql('example.json')
            })        
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('[href="privacy.html"]').should('have.attr', 'target', '_blank')

        //cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')    
    })

    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.get('[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
            
        cy.contains('#title', 'CAC TAT - Política de privacidade')
            .should('be.visible')

        
    });



})
