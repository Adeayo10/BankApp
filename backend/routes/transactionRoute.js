const express = require('express');
const authenticateToken = require('../middleware/middleware');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  checkIfAccountNumberExistAndReturnCustomer,
} = require('../controllers/transactionController');

router.post('/create', authenticateToken, createTransaction);
router.get('/all',authenticateToken, getTransactions);
router.get('/:accountNumber',authenticateToken, checkIfAccountNumberExistAndReturnCustomer);

module.exports = router;