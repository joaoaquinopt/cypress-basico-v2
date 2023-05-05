it('testa a página da política de privacidade de forma independente', () => {

    cy.visit('./src/privacy.html')

    cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        
    cy.contains('#title', 'CAC TAT - Política de privacidade')
        .should('be.visible')
});