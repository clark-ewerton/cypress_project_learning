/// <reference types="cypress" />

describe("Cypress Basics", ()=>{
    it("Should visit a page and assert title", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.title()
            .should("be.equal", "Campo de Treinamento")
            .and("contain","Campo")
    })
    it("Should find and interact with an element", ()=>{
        cy.visit("https://wcaquino.me/cypress/componentes.html")

        cy.get('#buttonSimple')
        .click()
        .should("have.value","Obrigado!")
})
})

describe("Work with basic elements", ()=>{
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })

    beforeEach(() => {
        cy.reload()
    })


    it("Text", ()=>{
            cy.get('body').should("contain", "Cuidado")
            //cy.get('body').should("have.text", "Cuidado")
            cy.get('span').should("contain", "Cuidado")
            cy.get('.facilAchar').should("contain", "Cuidado")
            cy.get('.facilAchar').should("have.text", "Cuidado onde clica, muitas armadilhas...")
    
    })

    it("Links", ()=>{
        cy.get('#resultado').should("have.text", "Status: Nao cadastrado")
        cy.get('[href="#"]').click()
        cy.get('#resultado').should("have.text", "Voltou!")

        cy.reload()
        cy.get('#resultado').should("have.text", "Status: Nao cadastrado")
        cy.contains('Voltar').click()
        cy.get('#resultado').should("have.text", "Voltou!")

})

it("TextFields", ()=>{
    cy.get('#formNome').type("Cypress Text")
    cy.get('#formNome').should("have.value", "Cypress Text")

    cy.get('#elementosForm\\:sugestoes').type("Teste12345{backspace}{backspace}").should("have.value", "Teste123")

    cy.get('[data-cy=dataSobrenome]').type("textarea").should("have.value", "textarea")

    cy.get('#elementosForm\\:sugestoes').clear().type("Erro{selectall}acerto", {delay: 100}).should("have.value", "acerto")

})

it("RadioButton", ()=>{
    cy.get('#formSexoFem').click().should("be.checked")
    cy.get('#formSexoMasc').should("not.be.checked")

    cy.get("[name='formSexo']").should("have.length", 2)

})

it("Checkbox", ()=>{
    cy.get('#formComidaPizza').click().should("be.checked")
    cy.get("[name='formComidaFavorita']").click({multiple:true})
    cy.get('#formComidaPizza').should("not.be.checked")
    cy.get('#formComidaVegetariana').should("be.checked")

})

it("Combo", ()=>{
    cy.get("[data-test='dataEscolaridade']").select('2o grau completo').should("have.value", '2graucomp')
    cy.get("[data-test='dataEscolaridade']").select('1graucomp').should("have.value", '1graucomp')

})

it.only("ComboMultipla", ()=>{
    cy.get("[data-testid='dataEsportes']").select(['natacao', 'Corrida', 'nada'])
})
 
})


