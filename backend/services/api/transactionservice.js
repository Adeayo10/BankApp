const customr = require('../../models/Customer');

function checkIfAccountNumberExistAndReturnCustomer(accountNumber) {
    const customer = customr.find((customer) => customer.accountNumber === accountNumber);
    return customer;
}

function creditCustomerAccount(accountNumber, amount) {
    const customer = customr.find((customer) => customer.accountNumber === accountNumber);
    customer.balance += amount;
    customr.save(customer);
    
}


function debitCustomerAccount(accountNumber, amount) {
    const customer = customr.find((customer) => customer.accountNumber === accountNumber);
    customer.balance -= amount;
    customr.save(customer);
}

module.exports = {
    accountNumberExistAndReturnCustomer: checkIfAccountNumberExistAndReturnCustomer,
    creditCustomerAccount,
    debitCustomerAccount,
};