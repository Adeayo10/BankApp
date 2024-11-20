import { validateTransaction } from "../validate.js";
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

function displayTransactions(transactionList, transactions) {
  renderTransactionTable(transactionList, transactions);
  const transactionRows = transactionList.querySelectorAll("tr");
  transactionRows.forEach((row) => {
    // row.addEventListener("click", () => {
    //   const transactionId = parseInt(row.getAttribute("data-id"));
    //   const transaction = transactions.find(
    //     (transaction) => transaction.id === transactionId
    //   );
    //   loadTransaction(transaction);
    // });
  });
}

function renderTransactionTable(transactionList, transactions) {
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
        ${transactions
          .map(
            (transaction) => `
            <tr data-id="${transaction.id}">
                <td>${transaction.accountNumber}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.date}</td>
                <td>${transaction.type}</td>
                <td>${transaction.description}</td>
            </tr>
        `
          )
          .join("")}
        </tbody>
        </table>
    `;
}

// function loadTransaction(transaction) {
//   document.getElementById("transaction-id").value = transaction.id;
//   document.getElementById("transaction-customer-accountNumber").value =
//     transaction.accountNumber;
//   document.getElementById("transaction-amount").value = transaction.amount;
//   document.getElementById("transaction-type").value = transaction.type;
//   document.getElementById("transaction-description").value =
//     transaction.description;
//   document.getElementById("transaction-date").value = transaction.date;
// }

function handleGetTransactionBySearch(transactionList, searchValue) {
    const filteredTransactions = transactions.filter((transaction) => {
        return (
        transaction.accountNumber.toString().includes(searchValue) ||
        transaction.amount.toString().includes(searchValue) ||
        transaction.date.includes(searchValue) ||
        transaction.type.includes(searchValue) ||
        transaction.description.includes(searchValue)
        );
    });
    displayTransactions(transactionList, filteredTransactions);
}

async function checkIfAccountNumberExistAndReturnCustomer(accountNumber) {
    const response = await fetch(`../db.json`);
    const data = await response.json();
    console.log(data);
    const customers = data.customers;
    console.log(customers);
    const user = customers.find(
        (customer) => customer.accountNumber === parseInt(accountNumber, 10)
    );
    return user;
}

async function displayCustomerName() {
    const accountNumber = document.getElementById("transaction-customer-accountNumber").value;
    const customerName = document.getElementById("customer-name");

    try {
        const user = await checkIfAccountNumberExistAndReturnCustomer(accountNumber);
        if (user) {
            alert("Account number exists");
            customerName.value = user.name;
        } else {
            alert("Account number does not exist");
            customerName.value = "";
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

function getTransactionFormData(){
    const formData  ={
        accountNumber: document.getElementById("transaction-customer-accountNumber").value,
        amount: document.getElementById("transaction-amount").value,
        type: document.getElementById("transaction-type").value,
        description: document.getElementById("transaction-description").value,
        date: document.getElementById("transaction-date").value
    }
    return formData;
}

function createTransactionObject(formData){
    const transaction = {
        accountNumber: parseInt(formData.accountNumber, 10),
        amount: parseFloat(formData.amount),
        type: formData.type,
        description: formData.description,
        date: formData.date
    }
    return transaction;
}

function saveTransaction(transaction){
    if(checkIfAccountNumberExistAndReturnCustomer(transaction.accountNumber)){
        transactions.push(transaction);
        alert("Transaction saved successfully");
    }
}

function handleTransactionFormSubmit(e, transactionForm, transactionList){
    e.preventDefault();
    const formData = getTransactionFormData();
    const transaction = createTransactionObject(formData);
    const { isValid, errors } = validateTransaction(transaction);
    if(!isValid){
        alert(errors.join("\n"));
        return;
    }
    saveTransaction(transaction);
    displayTransactions(transactionList, transactions);
    transactionForm.reset();
}



export {handleGetTransactionBySearch, handleGetTransactions, displayCustomerName, handleTransactionFormSubmit  };
