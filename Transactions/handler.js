
let transactions = [];

async function handleGetTransactions(transactionList) {
    try {
        const response = await fetch("../db.json");
        const data = await response.json();
        transactions = data.transactions;
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



