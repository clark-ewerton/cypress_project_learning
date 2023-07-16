/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsAccount'
import '../../../support/commandsTransaction'

describe("Cypress Project for learning - API Tests", ()=>{
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

    let token

    before(() => {
        cy.getToken(username, password)
        //.then(tkn => {
         //   token = tkn
        //})
    })

    beforeEach(() => {
        cy.resetRest(username, password)
    })

    it("Should create an account", ()=>{
            cy.getToken(username, password)
            .then(token => {
                cy.request({
                    method: 'POST',
                   // headers: { Authorization: `JWT ${token}`},
                    url: '/contas',
                    body:{
                        nome: nomeConta
                    }
                }).as('response')
            })

            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome',nomeConta)
            })
    })
    
    it("Should update an account", ()=>{
        cy.getToken(username, password)
        .then(token => {
            cy.request({
                method: 'GET',
              //  headers: { Authorization: `JWT ${token}`},
                url: '/contas',
                q:{
                    nome: nomeConta
                }
            })
        }).then(res => {
            cy.request({
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                url: `/contas/${res.body[0].id}`,
                body:{
                    nome: nomeContaAlterada
                }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome',nomeContaAlterada)
        })
})

    
    it("Should not create an account with same name", ()=>{
        cy.getToken(username, password)
        .then(token => {
            cy.request({
                method: 'POST',
               // headers: { Authorization: `JWT ${token}`},
                url: '/contas',
                body:{
                    nome: nomeConta
                }
            }).as('response')
        })

        cy.getToken(username, password)
        .then(token => {
            cy.request({
                method: 'POST',
                //headers: { Authorization: `JWT ${token}`},
                url: '/contas',
                body:{
                    nome: nomeConta
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error','Já existe uma conta com esse nome!')
        })
    })

    it("Should create a transaction upon an account", ()=>{
        cy.getAccountByName(username, password, nomeConta).then(contaId => {
            cy.request({
                method: 'POST',
               // headers: { Authorization: `JWT ${token}`},
                url: '/transacoes',
                body:{
                    conta_id: contaId,
                    data_pagamento: '10/07/2023',
                    data_transacao: '10/07/2023',
                    descricao: descricao,
                    envolvido: interessado,
                    status: true,
                    tipo: 'REC',
                    valor: valor
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
        })

        cy.get('@response').its('body.id').should('exist')
    })

    it("Should get balance", ()=>{
        cy.request({
            method: 'GET',
           // headers: { Authorization: `JWT ${token}`},
            url: '/saldo'
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')
                saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })

    it("Should delete a transaction", ()=>{
        cy.getToken(username, password)
        .then(token => {
            cy.request({
                method: 'GET',
               // headers: { Authorization: `JWT ${token}`},
                url: '/transacoes',
                q:{
                    nome: 'Movimentacao para exclusao'
                }
            })
        }).then(res => {
            cy.request({
                method: 'DELETE',
             //   headers: { Authorization: `JWT ${token}`},
                url: `/transacoes/${res.body[0].id}`
            }).its('status').should('be.equal', 204)
        })
    })

})


