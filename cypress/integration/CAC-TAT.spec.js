/// <reference types="Cypress" />


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
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Aquino')
        cy.get('#email').type('testeaquino@.com')
        cy.get('#open-text-area').type('Quero conseguir fazer os testes automáticos com cypress')
        cy.get('.button').click()
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
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
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

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })
})
