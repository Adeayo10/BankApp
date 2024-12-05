const transaction = require("../models/transaction");
const {
  createdResponseMessage,
  successResponseMessage,
  errorResponseMessage,
} = require("../helpers/helpers");
const { accountNumberExistAndReturnCustomer, creditCustomerAccount,
    debitCustomerAccount, } = require("./transactionService");

const checkIfAccountNumberExistAndReturnCustomer = (accountNumber) => {
    const customer = accountNumberExistAndReturnCustomer(accountNumber);
    return customer;

}

const createTransaction = async (req, res) => {
    try {
        const { accountNumber, amount, type } = req.body;
        const customer = checkIfAccountNumberExistAndReturnCustomer(accountNumber);
        if (!customer) {
            errorResponseMessage(res, "Customer not found");
        } else {
            if (type === "credit") {
                creditCustomerAccount(accountNumber, amount);
            } else {
                debitCustomerAccount(accountNumber, amount);
            }
            await transaction.create(req.body);
            createdResponseMessage(res, "Transaction created successfully");
        }
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
}

const fetchAllTransactions = async (req, res) => {
    try {
        const allTransactions = await transaction.findAll();
        successResponseMessage(
            res,
            "Transactions retrieved successfully",
            allTransactions
        );
    } catch (error) {
        errorResponseMessage(res, error.message);
    }
};

module.exports = {
    createTransaction,
    getTransactions: fetchAllTransactions,
    checkIfAccountNumberExistAndReturnCustomer,
}