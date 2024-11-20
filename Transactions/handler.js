
let transactions = [];

async function handleGetTransactions(transactionList) {
    try {
        const response = await fetch("../db.json");
        const data = await response.json();
        transactions = data.transactions;
        console.log(transactions);
        displayTransactions(transactionList, transactions);
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
    }
}

function displayTransactions(transactionList, transactions){
    renderTransactionTable(transactionList, transactions);
    const transactionRows = transactionList.querySelectorAll("tr");
    transactionRows.forEach(row => {
        row.addEventListener("click", () => {
            const transactionId = parseInt(row.getAttribute("data-id"));
            const transaction = transactions.find(transaction => transaction.id === transactionId);
            loadTransaction(transaction);
        });
    });
    
}
 
function renderTransactionTable(transactionList, transactions){
    transactionList.innerHTML = `
        <table>
        <thead>
        <tr>
            <th>Account number</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        ${transactions.map(transaction => `
            <tr data-id="${transaction.id}">
                <td>${transaction.accountNumber}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.date}</td>
                <td>${transaction.type}</td>
                <td>${transaction.description}</td>
            </tr>
        `).join("")}
        </tbody>
        </table>
    `;
}

function loadTransaction(transaction) {
    document.getElementById("transaction-id").value = transaction.id;
    document.getElementById("transaction-customer-accountNumber").value = transaction.accountNumber;
    document.getElementById("transaction-amount").value = transaction.amount;
    document.getElementById("transaction-type").value = transaction.type;
    document.getElementById("transaction-description").value = transaction.description;
    document.getElementById("transaction-date").value = transaction.date;
}

function getTransactionFormData() {
    const transactionData = {
        id: document.getElementById("transaction-id").value,
        accountNumber: document.getElementById("transaction-customer-accountNumber").value,
        amount: document.getElementById("transaction-amount").value,
        type: document.getElementById("transaction-type").value,
        description: document.getElementById("transaction-description").value,
        date: document.getElementById("transaction-date").value
    };

    return transactionData;
}
function createTransaction(transactionData) {
    const newTransaction = {
        id: transactions.length + 1,
        accountNumber: transactionData.accountNumber,
        amount: transactionData.amount,
        type: transactionData.type,
        description: transactionData.description,
        date: transactionData.date
    };

    transactions.push(newTransaction);
    return newTransaction;
}

function handleCreateTransaction(transactionList) {
    
}

export { handleGetTransactions };

