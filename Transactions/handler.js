
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

