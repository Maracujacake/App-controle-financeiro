const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



let dummyTransactions = [
    { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
    { id: 2, name: 'Salário', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: 150 }
]

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()
}

const addTransactionIntoDOM = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const AmountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span>${operator} R$ ${AmountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
        </button>
    `

    transactionsUl.append(li)

}
/* formatação opcional de código [ enter antes do ponto (antes de chamar o operador) ]*/ 

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
    .map(transaction => transaction.amount)
    const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
    const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
    const expense = Math.abs( transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}


const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const IDgenerator = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha ambos os campos')
        return
    }

    const transaction = { 
        id: IDgenerator(),
        name: transactionName,
        amount: Number(transactionAmount)
    }
    

    dummyTransactions.push(transaction)
    init()


})