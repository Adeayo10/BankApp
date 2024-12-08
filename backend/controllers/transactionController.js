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
const {sendTransactionEmail} = require("../services/api/emailservice");

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

    let description;
    if (type === "deposit") {
      await creditCustomerAccount(accountNumber, amount);
      description = `Deposit of ${amount} to account ${accountNumber}`;
    } else if (type === "withdrawal") {
      const response = await debitCustomerAccount(accountNumber, amount);
      if (response.status === 400) {
        return errorResponseMessage(res, response.message);
      }
      description = `Withdrawal of ${amount} from account ${accountNumber}`;
    } else {
      return errorResponseMessage(res, "Invalid transaction type");
    }

    const { email, name } = customer;
    await sendTransactionEmail(email, name, description);

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
