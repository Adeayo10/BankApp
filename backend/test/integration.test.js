const request = require('supertest');
const app = require('../app');
const Customer = require('../models/Customer');
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

beforeAll(async () => {
    testToken = generateTestToken();
    await sequelize.sync({ force: true });
  }); 
  afterAll(async () => {
    await sequelize.close();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a customer and then create a transaction', async () => {
    Customer.create.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });
    Transaction.create.mockResolvedValue({ id: 1, accountNumber: '1234567890', amount: 100, type: 'credit' });
    sendAccountCreationEmail.mockResolvedValue();
    sendTransactionEmail.mockResolvedValue();
    accountNumberExistAndReturnCustomer.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    const customer = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        dateOfBirth: '1990-01-01',
        accountType: 'savings',
        accountNumber: '1234567890',
        balance: 0,
      };

    const customerResponse = await request(app)
      .post('/customer/create')
      .set('Authorization', testToken)
      .send(customer)
      .expect(201);
      console.log('Response:', customerResponse.body);
    expect(customerResponse.body.message).toBe('Customer created successfully');
    expect(sendAccountCreationEmail).toHaveBeenCalledWith(customer);


    const transaction = { accountNumber: '1234567890', amount: 100, type: 'deposit', description: 'Deposit transaction' };
    
    const transactionResponse = await request(app)
      .post("/transaction/create")
      .set("Authorization", testToken)
      .send(transaction)
      .expect(201);

    expect(transactionResponse.body.message).toBe('Transaction created successfully');
    expect(sendTransactionEmail).toHaveBeenCalledWith('john@example.com', 'John Doe', 'Deposit of 100 to account 1234567890');
  });
});