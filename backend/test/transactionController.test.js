const { createTransaction, checkIfAccountNumberExistAndReturnCustomer } = require('../controllers/transactionController');
const { accountNumberExistAndReturnCustomer, creditCustomerAccount, debitCustomerAccount } = require('../services/api/transactionservice');
const Transaction = require('../models/Transaction');
const { sendTransactionEmail } = require('../services/api/emailservice');


jest.mock('../models/Transaction');
jest.mock('../services/api/transactionservice');
jest.mock('../services/api/emailservice');


describe('Transaction Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should check if account number exists and return customer', async () => {
      const req = { params: { accountNumber: '1234567890' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      accountNumberExistAndReturnCustomer.mockResolvedValue({ name: 'John Doe' });
  
      await checkIfAccountNumberExistAndReturnCustomer(req, res);
  
      expect(accountNumberExistAndReturnCustomer).toHaveBeenCalledWith('1234567890');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer retrieved successfully', data: { name: 'John Doe' }, status: 'success' });
    });
  

  });