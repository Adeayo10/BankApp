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
const transaction = require("../models/Transaction");

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
      return notFoundResponseMessage(res, "Customer not found");
    }

    if (type === "deposit") {
      await creditCustomerAccount(accountNumber, amount);
      console.log("Credited", amount);
    } else if (type === "withdrawal") {
      console.log("Debited", amount);
      const response = await debitCustomerAccount(accountNumber, amount);
      if (response.status === 400) {
        console.log(response.message, response.status);
        return errorResponseMessage(res, response.message);
      }
    } else {
      return errorResponseMessage(res, "Invalid transaction type");
    }

    const newTransaction = await transaction.create(req.body);
    createdResponseMessage(
      res,
      "Transaction created successfully",
      newTransaction
    );
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

const fetchAllTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll();
    successResponseMessage(
      res,
      "Transactions retrieved successfully",
      transactions
    );
  } catch (error) {
    errorResponseMessage(res, error.message);
  }
};

module.exports = {
  createTransaction,
  getTransactions: fetchAllTransactions,
  checkIfAccountNumberExistAndReturnCustomer,
};
