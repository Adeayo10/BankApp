const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  checkIfAccountNumberExistAndReturnCustomer,
} = require('../controllers/transactionController');

router.post('/create', createTransaction);
router.get('/all', getTransactions);
router.get('/:accountNumber', checkIfAccountNumberExistAndReturnCustomer);

module.exports = router;