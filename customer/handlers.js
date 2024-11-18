import { validateCustomer } from "../validate.js";

let customers = [];

function getCustomers(customerList) {
  fetch("../db.json")
    .then((response) => response.json())
    .then((data) => {
      customers = data.customers;
      displayCustomers(customerList, customers);
    });
}

function getCustomersbySearch(customerList, searchValue) {
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.dateOfBirth.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.accountType.toLowerCase().includes(searchValue.toLowerCase()) ||
      parseInt(customer.accountNumber) === parseInt(searchValue)
    );
  });
  displayCustomers(customerList, filteredCustomers);
}
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
  console.log("calling getFormData", formData);
  return formData;
};
const createCustomer = (FormData) => {
  const customer = {
    id: FormData.id ? parseInt(FormData.id) : customers.length + 1,
    name: FormData.name,
    email: FormData.email,
    address: FormData.address,
    dateOfBirth: FormData.dateOfBirth,
    accountType: FormData.accountType ? FormData.accountType : "Savings",
    phone: FormData.phone,
    accountNumber: FormData.accountNumber
      ? FormData.accountNumber
      : generateAccountNumber(),
  };
  return customer;
};
const generateAccountNumber = () => {
  const min = 1;
  const max = 100000000000;
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  return randNum.toString().padStart(10, "0");
};
const findExistingCustomerIndex = (customerId) => {
  let id = parseInt(customerId);
  let customer = customers.findIndex((c) => c.id === id);
  return customer;
};
const saveCustomer = (customer) => {
  const existingCustomerIndex = findExistingCustomerIndex(customer.id);
  if (existingCustomerIndex > -1) {
    return {
      isSuccessfull: false,
      message: "Customer with the ID already exists",
    };
  }
  customers.push(customer);
  return { isSuccessfull: true, message: "Customer saved successfully" };
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

const displayCustomers = (customerList, customers) => {
  renderCustomerTable(customerList, customers);
  const rows = customerList.querySelectorAll("tr");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const customerId = row.getAttribute("data-id");
      const customer = customers.find((c) => c.id === parseInt(customerId));
      loadCustomer(customer);
    });
  });
};
const renderCustomerTable = (customerList, customers) => {
  customerList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Date of Birth</th>
          <th>Account Type</th>
          <th>Balance</th>
          <th>Account Number</th>
        </tr>
      </thead>
      <tbody>
        ${customers
          .map(
            (customer) => `
          <tr data-id="${customer.id}">
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.dateOfBirth}</td>
            <td>${customer.accountType}</td>
            <td>${customer.balance}</td>
            <td>${customer.accountNumber}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
};

function handleSubmit(e, customerForm, customerList) {
  e.preventDefault();
  const formData = getFormData();
  const existingCustomerIndex = findExistingCustomerIndex(formData.id);

  if (existingCustomerIndex > -1) {
    alert("Customer with the ID already exists");
    return;
  }

  const customer = createCustomer(formData);
  const { isValid, errors } = validateCustomer(customer);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  const saveResult = saveCustomer(customer);
  if (!saveResult.isSuccessfull) {
    alert(saveResult.message);
    return;
  }

  alert(saveResult.message);
  displayCustomers(customerList, customers);
  customerForm.reset();
}
const updateCustomer = (customerForm, customerList) => {
  const formData = getFormData();
  const existingCustomerIndex = findExistingCustomerIndex(formData.id);
  if (existingCustomerIndex === -1) {
    alert("Customer does not exist");
    return;
  }
  const customer = {
    ...customers[existingCustomerIndex],
    name: formData.name,
    email: formData.email,
    address: formData.address,
    dateOfBirth: formData.dateOfBirth,
    accountType: formData.accountType,
    phone: formData.phone,
  };
  const { isValid, errors } = validateCustomer(customer);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }
  updateExistingCustomer(existingCustomerIndex, customer);
  alert("Customer updated successfully");
  displayCustomers(customerList, customers);
  customerForm.reset();
};
const updateExistingCustomer = (index, customer) => {
  customers[index] = customer;
};
function handleUpdateCustomer(customerForm, customerList) {
  updateCustomer(customerForm, customerList);
}

const deleteCustomer = (customerForm, customerList) => {
  const formData = getFormData();
  console.log("calling handleDeleteCustomer", formData);
  const existingCustomerIndex = findExistingCustomerIndex(formData.id);
  if (existingCustomerIndex === -1) {
    alert("Customer does not exist");
    return;
  }
  deleteExistingCustomer(existingCustomerIndex);
  alert("Customer deleted successfully");
  displayCustomers(customerList, customers);
  customerForm.reset();
};
const deleteExistingCustomer = (index) => {
  customers.splice(index, 1);
};
function handleDeleteCustomer(customerForm, customerList) {
  deleteCustomer(customerForm, customerList);
}
export {
  getCustomers as handleGetCustomers,
  getCustomersbySearch as handleGetCustomersbySearch,
  handleSubmit,
  handleUpdateCustomer,
  handleDeleteCustomer,
};
