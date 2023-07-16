/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsAccount'
import '../../../support/commandsTransaction'

describe.only("Cypress Project for learning - Functional Tests", ()=>{
    const username = "cypressCourse@test.com";
    const usernameAlias = "cypress course";
    const password = "teste123";

    const nomeConta = 'Conta 1'
    const nomeContaAlterada = 'Conta 1 Alterada'
    const nomeContaRepetida = 'Conta 1 Alterada'

    const descricao = 'transaction clark 1'
    const valor = '111'
    const interessado = 'clark silva'
    const contaSelecao = 'Conta 1 Alterada'

    before(() => {
       cy.login(username, password, usernameAlias)
       cy.resetApp()
    })

    it("Should create an account", ()=>{
            cy.accessAccountMenu()
             cy.createAccount(nomeConta)
             cy.get(loc.MESSAGE).should("contain","Conta inserida com sucesso")

    })
    
    it("Should update an account", ()=>{
            cy.accessAccountMenu()
            cy.updateAccount(nomeConta, nomeContaAlterada)
            cy.get(loc.MESSAGE).should("contain","Conta atualizada com sucesso")
})

    
    it("Should not create an account with same name", ()=>{
        cy.accessAccountMenu()
        cy.createAccount(nomeContaRepetida)
        cy.get(loc.MESSAGE).should("contain","code 400")
    })

    it("Should create a transaction upon an account", ()=>{
        cy.accessTransactionMenu()
        cy.createTransaction(descricao, valor, interessado, contaSelecao)
        cy.get(loc.MESSAGE).should("contain","Movimentação inserida com sucesso")
        cy.xpath(loc.MOVIMENTACOES.FN_SALDO_TRANSACTION(descricao)).should("contain",valor)
    })

    it("Should get balance", ()=>{
        cy.accessMenuHome()
        cy.xpath(loc.BALANCE.FN_SALDO_TRANSACTION(valor)).should("contain",valor)
    })

    it("Should delete a transaction", ()=>{
        cy.accessMenuExtrato()
        cy.xpath(loc.MOVIMENTACOES.FN_DELETE_TRANSACTION(descricao)).click()
        cy.get(loc.MESSAGE).should("contain","Movimentação removida com sucesso")
    })

})


