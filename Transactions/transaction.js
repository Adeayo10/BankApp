import {  handleGetTransactions, displayCustomerName, handleTransactionFormSubmit, handleGetTransactionBySearch} from "./handler.js";

export function initializeTransactionScripts(){

    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    // const deleteTransactionButton = document.getElementById("delete-transaction");
    // const updateTransactionButton = document.getElementById("update-transaction");
    const accountNumberInput = document.getElementById("transaction-customer-accountNumber");
    const cancelTransactionButton = document.getElementById("cancel-transaction-btn");
    const searchTransactionButton = document.getElementById("search-transaction-btn");
    const searchTransactionInput = document.getElementById("search-transaction-input");
    handleGetTransactions(transactionList);

    accountNumberInput.addEventListener("blur", displayCustomerName);
    
    transactionForm.addEventListener("submit", (e) => handleTransactionFormSubmit(e, transactionForm, transactionList));
  
    cancelTransactionButton.addEventListener("click", () => transactionForm.reset());

    searchTransactionButton.addEventListener("click", () => {
        const searchValue = searchTransactionInput.value;
        handleGetTransactionBySearch(transactionList, searchValue);
    
    });   
       
}