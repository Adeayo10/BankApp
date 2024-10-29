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


