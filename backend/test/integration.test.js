const request = require('supertest');
const app = require('../app');
const Customer = require('../models/customer');
const Transaction = require('../models/Transaction');
const { sendAccountCreationEmail } = require('../services/api/emailservice');
const { sendTransactionEmail } = require('../services/api/emailservice');
const { createdResponseMessage } = require('../helpers/helpers.js');
const {accountNumberExistAndReturnCustomer} = require('../services/api/transactionservice')
const {generateTestToken} = require('../controllers/loginController.js');
const sequelize = require('../config/database');

jest.mock('../models/Customer');
jest.mock('../models/Transaction');
jest.mock('../services/api/emailservice');
jest.mock('../services/api/transactionservice');

describe('Integration Test', () => {


  });
