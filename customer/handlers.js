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

const saveCustomer = (customer) => {
  console.log("calling saveCustomer");
  const existingCustomerIndex = customers.findIndex(
    (c) => c.id === customer.id
  );
  if (existingCustomerIndex > -1) {
    alert("Customer with the ID already exists");
    return;
  }
  customer.id = customers.length + 1;
  customers.push(customer);
};
const loadCustomer = (customer) => {
  document.getElementById("customer-id").value = customer.id;
  document.getElementById("customer-name").value = customer.name;
  document.getElementById("customer-email").value = customer.email;
  document.getElementById("customer-phone").value = customer.phone;
  document.getElementById("customer-address").value = customer.address;
  document.getElementById("customer-dob").value = customer.dateOfBirth;
  document.getElementById("customer-account-type").value = customer.accountType;
};
