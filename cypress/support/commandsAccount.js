import loc from './locators'

Cypress.Commands.add('accessAccountMenu',(nomeConta) =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTA).click()
})

Cypress.Commands.add('createAccount',(nomeConta) =>{
        cy.get(loc.CONTAS.NOME).type(nomeConta)
        cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('updateAccount',(locatorAccountName, nomeContaAlterada) =>{
    cy.xpath(loc.CONTAS.FN_FIND_ACCOUNT_RECORD(locatorAccountName)).click()
    cy.get(loc.CONTAS.NOME).clear().type(nomeContaAlterada)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})








