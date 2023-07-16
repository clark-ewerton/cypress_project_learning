const buildEnv = () => {
    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'usuario falso',
            token: 'uma string muito grande para testar rsrsrssssssssssssssssssssssssssssssssssssssssss'
        }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{
            conta_id: 1001,
            conta: 'carteira',
            saldo: '111.00'
        },
        {
            conta_id: 10012,
            conta: 'banco',
            saldo: '1002222.00'
        }]
    }).as('saldo')

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
        }]
    }).as('contas')
}

export default buildEnv