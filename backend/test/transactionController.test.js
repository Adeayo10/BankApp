const { createTransaction, checkIfAccountNumberExistAndReturnCustomer } = require('../controllers/transactionController');
const { accountNumberExistAndReturnCustomer, creditCustomerAccount, debitCustomerAccount } = require('../services/api/transactionservice');
const Transaction = require('../models/Transaction');
const { sendTransactionEmail } = require('../services/api/emailservice');


jest.mock('../models/Transaction');
jest.mock('../services/api/transactionservice');
jest.mock('../services/api/emailservice');
