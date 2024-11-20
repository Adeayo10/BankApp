
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

function renderTransactionTable(transactionList, transactions){
    transactionList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${transactions.map(transaction => `
                    <tr data-id="${transaction.id}">
                        <td>${transaction.amount}</td>
                        <td>${transaction.vendor}</td>
                        <td>${transaction.category}</td>
                        <td>${transaction.date}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}



