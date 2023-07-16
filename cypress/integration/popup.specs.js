/// <reference types="cypress" />

describe("work with Popup", ()=>{
    it("deve testar popup diretamente", ()=>{
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        cy.window().then(win =>{
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
}
    )

    it("deve testar frame diretamente", ()=>{
        cy.visit("https://wcaquino.me/cypress/frame.html")
        cy.get('#otherButton').click()
        
            cy.on('window:alert', msg =>{
                expect(msg).to.be.equal('Click OK!')
            })

        })
    }
    )

    describe.only("work with Popup with links...", ()=>{
        beforeEach(() => {
            cy.visit("https://wcaquino.me/cypress/componentes.html")
        })

        it("check popup url", ()=>{
            cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal','https://wcaquino.me/cypress/frame.html')
    }
        )

        it("should access poup dynamically", ()=>{
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
    }
        )
        }
        )
