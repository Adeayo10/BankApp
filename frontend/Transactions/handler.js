import { validateTransaction } from "../validate.js";
import { getTransactionsAPI, checkIfAccountNumberExistAndReturnCustomerAPI, createTransactionAPI } from "../apis/transactionAPI.js";

async function handleGetTransactions(transactionList) {
  try {
    const response = await getTransactionsAPI();
    console.log("API Response:", response); 
    const transactions = response.data?.data || []; 
    console.log("Transactions:", transactions);
    displayTransactions(transactionList, transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }
}
function displayTransactions(transactionList, transactions) {
  renderTransactionTable(transactionList, transactions);
  const transactionRows = transactionList.querySelectorAll("tr");
}

function renderTransactionTable(transactionList, transactions) {
  transactionList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${transactions
          .map(
            (transaction) => `
          <tr data-id="${transaction.id}">
            <td>${transaction.accountNumber}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td>${transaction.description}</td>
            <td>${formatDate(transaction.date)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};



function handleGetTransactionBySearch(transactionList, searchValue) {
  const transactions = transactionList.querySelectorAll("tr");
  let found = false;
  transactions.forEach((transaction) => {
    const match = transaction.textContent.toLowerCase().includes(searchValue.toLowerCase());
    transaction.style.display = match ? "table-row" : "none";
    if (match) found = true;
  });
  if (!found) alert("No transactions found for the search term.");
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
  else {
    alert("Customer not found");
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

async function saveTransaction(transaction) {
  try {
   const res =  await createTransactionAPI(transaction);
   return { status: res.status, message: res.message };
  } catch (error) {
    console.error("Failed to save transaction:", error);
  }
}

async function handleTransactionFormSubmit(e, transactionForm, transactionList) {
  e.preventDefault();
  const formData = getTransactionFormData();
  const transaction = createTransactionObject(formData);
  const { isValid, errors } = validateTransaction(transaction);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }
  const saveTransactionResponse = await saveTransaction(transaction);
  if (saveTransactionResponse.status !== 201) {
    alert(saveTransactionResponse.message);
    return;
  }
  alert(saveTransactionResponse.message);
  handleGetTransactions(transactionList);
  transactionForm.reset();
}

export {
  handleGetTransactionBySearch,
  handleGetTransactions,
  displayCustomerName,
  handleTransactionFormSubmit,
};
