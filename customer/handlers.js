import { validateCustomer } from "../validate.js";

let customers = [];

export const getCustomers = (customerList) => {
  fetch("../db.json")
    .then((response) => response.json())
    .then((data) => {
      customers = data.customers;
      displayCustomers(customerList, customers);
    });
};

const getFormData = () => {
  const formData = {
    id: document.querySelector("#customer-id").value,
    name: document.querySelector("#customer-name").value,
    email: document.querySelector("#customer-email").value,
    phone: document.querySelector("#customer-phone").value,
    address: document.querySelector("#customer-address").value,
    dateOfBirth: document.querySelector("#customer-dob").value,
    accountType: document.querySelector("#customer-account-type").value,
  };
  return formData;
};
const createCustomer = (FormData) => {
  const customer = {
    id: FormData.id ? parseInt(FormData.id) : Date.now(),
    name: FormData.name,
    email: FormData.email,
    address: FormData.address,
    dateOfBirth: FormData.dateOfBirth,
    accountType: FormData.accountType ? FormData.accountType : "Savings",
    accountNumber: FormData.id ? null : generateAccountNumber(),
  };
  return customer;
};
const generateAccountNumber = () => {
  const min = 1;
  const max = 100000000000;
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  return randNum.toString().padStart(10, "0");
};

