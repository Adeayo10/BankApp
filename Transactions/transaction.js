import {  handleGetTransactions } from "./handler.js";

export function initializeTransactionScripts(){

    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const deleteTransactionButton = document.getElementById("delete-transaction");
    const updateTransactionButton = document.getElementById("update-transaction");

   handleGetTransactions(transactionList);
}