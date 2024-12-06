const {
  createdResponseMessage,
  successResponseMessage,
  errorResponseMessage,
  notFoundResponseMessage,
} = require("../helpers/helpers");
const {
  accountNumberExistAndReturnCustomer,
  creditCustomerAccount,
  debitCustomerAccount,
} = require("../services/api/transactionservice");
const transaction = require("../models/transaction");

const checkIfAccountNumberExistAndReturnCustomer = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const customer = await accountNumberExistAndReturnCustomer(accountNumber);
    if (!customer) {
      notFoundResponseMessage(res, "Customer not found");
    } else {
      successResponseMessage(res, "Customer retrieved successfully", customer);
    }
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

const createTransaction = async (req, res) => {
  try {
    const { accountNumber, amount, type } = req.body;
    const customer = await accountNumberExistAndReturnCustomer(accountNumber);
    if (!customer) {
      errorResponseMessage(res, "Customer not found");
    } else {
      if (type === "credit") {
        await creditCustomerAccount(accountNumber, amount);
      } else {
        await debitCustomerAccount(accountNumber, amount);
      }
      await transaction.create(req.body);
      createdResponseMessage(res, "Transaction created successfully");
    }
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

const fetchAllTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll();
    successResponseMessage(res, "Transactions retrieved successfully", transactions);
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

module.exports = {
  createTransaction,
  getTransactions: fetchAllTransactions,
  checkIfAccountNumberExistAndReturnCustomer,
};

