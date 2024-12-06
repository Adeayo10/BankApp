import { validateTransaction } from "../validate.js";
import { getTransactionsAPI, checkIfAccountNumberExistAndReturnCustomerAPI, createTransactionAPI } from "../apis/transactionAPI.js";

async function handleGetTransactions(transactionList) {
    try {
        const response = await getTransactionsAPI();
        const transactions = response.data;
        displayTransactions(transactionList, transactions);
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
    }
}

function displayTransactions(transactionList, transactions) {
  renderTransactionTable(transactionList, transactions);
  const transactionRows = transactionList.querySelectorAll("tr");
  // transactionRows.forEach((row) => {
  //   // row.addEventListener("click", () => {
  //   //   const transactionId = parseInt(row.getAttribute("data-id"));
  //   //   const transaction = transactions.find(
  //   //     (transaction) => transaction.id === transactionId
  //   //   );
  //   //   loadTransaction(transaction);
  //   // });
  // });
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
  try {
    console.log(accountNumber);
    console.log("calling api");
    const response = await checkIfAccountNumberExistAndReturnCustomerAPI(accountNumber);
    if (response.status === 200) {  
      console.log(response.data.name);
      return response.data.name;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

async function displayCustomerName() {
  const accountNumber = document.getElementById("transaction-customer-accountNumber").value;
  const customerName = await checkIfAccountNumberExistAndReturnCustomer(accountNumber);
  if (customerName) {
    console.log(customerName);
    alert("Customer found");
    document.getElementById("customer-name").value = customerName;
  }
}

function getTransactionFormData() {
  const formData = {
    accountNumber: document.getElementById("transaction-customer-accountNumber")
      .value,
    amount: document.getElementById("transaction-amount").value,
    type: document.getElementById("transaction-type").value,
    description: document.getElementById("transaction-description").value,
    date: document.getElementById("transaction-date").value,
  };
  return formData;
}

function createTransactionObject(formData) {
  const transaction = {
    accountNumber: parseInt(formData.accountNumber, 10),
    amount: parseFloat(formData.amount),
    type: formData.type,
    description: formData.description,
    date: formData.date,
  };
  return transaction;
}

function saveTransaction(transaction) {
  if (checkIfAccountNumberExistAndReturnCustomer(transaction.accountNumber)) {
    transactions.push(transaction);
    alert("Transaction saved successfully");
  }
}

function handleTransactionFormSubmit(e, transactionForm, transactionList) {
  e.preventDefault();
  const formData = getTransactionFormData();
  const transaction = createTransactionObject(formData);
  const { isValid, errors } = validateTransaction(transaction);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }
  saveTransaction(transaction);
  displayTransactions(transactionList, transactions);
  transactionForm.reset();
}

export {
  handleGetTransactionBySearch,
  handleGetTransactions,
  displayCustomerName,
  handleTransactionFormSubmit,
};
