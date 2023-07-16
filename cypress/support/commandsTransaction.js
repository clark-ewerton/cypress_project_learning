import loc from './locators'

Cypress.Commands.add('accessTransactionMenu',(nomeConta) =>{
    cy.get(loc.MENU.MOVIMENTACOES).click()
})

Cypress.Commands.add('createTransaction',(descricao, valor, interessado, nomeContaSelecionada) =>{
        cy.get(loc.MOVIMENTACOES.DESCRICAO).type(descricao)
        cy.get(loc.MOVIMENTACOES.VALOR).type(valor)
        cy.get(loc.MOVIMENTACOES.INTERESSADO).type(interessado)
        cy.get(loc.MOVIMENTACOES.SELECAO_CONTA).select(nomeContaSelecionada)
        cy.get(loc.MOVIMENTACOES.STATUS).click()
        cy.get(loc.MOVIMENTACOES.TIPO_DESPESA).click()
        cy.get(loc.MOVIMENTACOES.BTN_SALVAR).click()
})








