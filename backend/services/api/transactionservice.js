const Customer = require('../../models/customer');

async function accountNumberExistAndReturnCustomer(accountNumber) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}

async function creditCustomerAccount(accountNumber, amount) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    if (customer) {
      customer.balance += amount;
      await customer.save();
    }
  } catch (error) {
    console.error("Error crediting customer account:", error);
    throw error;
  }
}

async function debitCustomerAccount(accountNumber, amount) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    if (customer) {
      customer.balance -= amount;
      await customer.save();
    }
  } catch (error) {
    console.error("Error debiting customer account:", error);
    throw error;
  }
}

module.exports = {
  accountNumberExistAndReturnCustomer,
  creditCustomerAccount,
  debitCustomerAccount,
};