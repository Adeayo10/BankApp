const Customer = require('../../models/Customer');
const Decimal = require('decimal.js');
async function accountNumberExistAndReturnCustomer(accountNumber) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return{ status: 500, message: error.message };
  }
}

async function creditCustomerAccount(accountNumber, amount) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    if (customer) {
      const decimalAmount = new Decimal(amount);
      customer.balance = new Decimal(customer.balance).plus(decimalAmount).toFixed(2);
      await customer.save();
    }
  } catch (error) {
    console.error("Error crediting customer account:", error);
    return { status: 500, message: error.message };
  }
}

async function debitCustomerAccount(accountNumber, amount) {
  try {
    const customer = await Customer.findOne({ where: { accountNumber } });
    if (customer) {
      const decimalAmount = new Decimal(amount);
    if (new Decimal(customer.balance).lessThan(decimalAmount)) {
       return { status: 400, message: "Insufficient balance" };
    }
     customer.balance = new Decimal(customer.balance).minus(decimalAmount).toFixed(2);
      await customer.save();
      return { status: 200, message: "Debited successfully" };
    }
  } catch (error) {
    console.error("Error debiting customer account:", error);
    return { status: 500, message: error.message };
  }
}

module.exports = {
  accountNumberExistAndReturnCustomer,
  creditCustomerAccount,
  debitCustomerAccount,
};