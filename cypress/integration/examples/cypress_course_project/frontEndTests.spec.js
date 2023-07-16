/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsAccount'
import '../../../support/commandsTransaction'
import buildEnv from '../../../support/buildEnv'

describe("Cypress Project for learning - Front End Tests", ()=>{
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

    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
       cy.login(username, password, usernameAlias)
      // cy.resetApp()
    })

    it("Should create an account", ()=>{
        cy.route({
            method: 'POST',
            url: '/contas',
            response: [{
                id: 3,
                nome: nomeConta,
                visivel: true,
                usuario_id: 1
            }]
        }).as('contasSave')

            cy.accessAccountMenu()

            cy.route({
                method: 'GET',
                url: '/contas',
                response: [{
                    id: 1,
                    nome: 'carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: nomeConta,
                    visivel: true,
                    usuario_id: 1
                }]
            }).as('contasCadastro')

             cy.createAccount(nomeConta)
             cy.get(loc.MESSAGE).should("contain","Conta inserida com sucesso")

    })
    
    it("Should update an account", ()=>{
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: [{
                id: 1,
                nome: nomeContaAlterada,
                visivel: true,
                usuario_id: 1
            }]
        }).as('contasSave')

        cy.accessAccountMenu()

            cy.updateAccount('carteira', nomeContaAlterada)
         
            cy.get(loc.MESSAGE).should("contain","Conta atualizada com sucesso")
})

    
    it("Should not create an account with same name", ()=>{
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 1,
                nome: 'carteira',
                visivel: true,
                usuario_id: 1
            },
            status: 400
        }).as('contasNotSaveWithSameName')
        cy.accessAccountMenu()
        cy.createAccount('carteira')
        cy.get(loc.MESSAGE).should("contain","code 400")
    })

    it("Should create a transaction upon an account", ()=>{
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                id: 1,
                data_pagamento: '10/07/2023',
                data_transacao: '10/07/2023',
                descricao: descricao,
                envolvido: interessado,
                observacao: descricao,
                status: true,
                tipo: 'REC',
                valor: valor
            }
        }).as('shouldCreateATransaction')

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        }).as('shouldCreateATransaction')

        cy.accessTransactionMenu()
        cy.createTransaction(descricao, valor, interessado, 'carteira')
        cy.get(loc.MESSAGE).should("contain","Movimentação inserida com sucesso")
        cy.xpath(loc.MOVIMENTACOES.FN_SALDO_TRANSACTION(descricao)).should("contain",valor)
    })

    it("Should get balance", ()=>{
        
        cy.accessMenuHome()
        cy.xpath(loc.BALANCE.FN_SALDO_TRANSACTION(valor)).should("contain",valor)
    })

    it("Should delete a transaction", ()=>{
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        }).as('shouldCreateATransaction')

        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {
                
            },
            status: 204
        }).as('deletion')
        cy.accessMenuExtrato()
        cy.xpath(loc.MOVIMENTACOES.FN_DELETE_TRANSACTION(descricao)).click()
        cy.get(loc.MESSAGE).should("contain","Movimentação removida com sucesso")
    })

})


