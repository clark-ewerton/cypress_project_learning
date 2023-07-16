const locators = {
        LOGIN: {
            USER: '[data-test=email]',
            PASSWORD: '[data-test=passwd]',
            BTN_LOGIN: '[type=submit]'
        },
        MENU: {
            HOME: '[data-test=menu-home]',
            MOVIMENTACOES: '[data-test=menu-movimentacao]',
            EXTRATO: '[data-test=menu-extrato]',
            SETTINGS: '[data-test=menu-settings]',
            CONTA: 'a:contains(Contas)',
            RESETAPP: 'a:contains(Resetar)'
        },
        CONTAS: {
            NOME: '[data-test=nome]',
            BTN_SALVAR: '[alt=Salvar]',
            FN_FIND_ACCOUNT_RECORD: nome => `//td[text()='${nome}']/..//a/i[contains(@title,'Alterar')]`
        },
        MOVIMENTACOES: {
            DESCRICAO: '[id=descricao]',
            VALOR: '[data-test=valor]',
            INTERESSADO: '[id=envolvido]',
            SELECAO_CONTA: '[data-test=conta]',
            TIPO_RECEITA: '[data-test=tipo-receita]',
            TIPO_DESPESA: '[data-test=tipo-despesa]',
            STATUS: '[data-test=status]',
            BTN_SALVAR: '[alt=Salvar]',
            FN_SALDO_TRANSACTION: saldo => `//span[text()='${saldo}']/..//small`,
            FN_DELETE_TRANSACTION: saldo => `//span[text()='${saldo}']/../../..//a[@href='#']`
        },
        BALANCE: {
            FN_SALDO_TRANSACTION: saldo => `//td[contains(text(),'${saldo}')]`
        },
        MESSAGE: '.toast-message'
        
}


export default locators;