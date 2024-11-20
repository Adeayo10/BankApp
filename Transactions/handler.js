
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
    document.getElementById("transaction-customer-id").value = transaction.customerId;
    document.getElementById("transaction-amount").value = transaction.amount;
    document.getElementById("transaction-type").value = transaction.type;
}

function getTransactionFormData() {
    return {
        id: document.getElementById("transaction-id").value,
        customerId: document.getElementById("transaction-customer-id").value,
        amount: document.getElementById("transaction-amount").value,
        type: document.getElementById("transaction-type").value
    };
}

export { handleGetTransactions };

