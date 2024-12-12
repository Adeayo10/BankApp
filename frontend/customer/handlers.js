import { validateCustomer } from "../validate.js";
import {
  createCustomerapi,
  getCustomersapi,
  getCustomerByIdapi,
  updateCustomerapi,
  deleteCustomerapi,
} from "../apis/customerAPI.js";

async function getCustomers(customerList) {
  const response = await getCustomersapi();
  const customers = response.data;
  console.log("calling getCustomers", customers);
  displayCustomers(customerList, customers.data);
}

async function getCustomersbySearch(customerList, searchValue) {
  const response = await getCustomersapi();
  const customers = response.data.data;
  console.log("calling getCustomersbySearch", customers);
  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchValue.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.toLowerCase().includes(searchLower) ||
      customer.address.toLowerCase().includes(searchLower) ||
      customer.dateOfBirth.toLowerCase().includes(searchLower) ||
      customer.accountType.toLowerCase().includes(searchLower) ||
      customer.accountNumber.toString().includes(searchLower)
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
const createCustomerObject = (FormData) => {
  const customer = {
    // id: FormData.id ? parseInt(FormData.id) : null,
    name: FormData.name,
    email: FormData.email,
    address: FormData.address,
    dateOfBirth: FormData.dateOfBirth,
    accountType: FormData.accountType ? FormData.accountType : "Savings",
    phone: FormData.phone,
    accountNumber: FormData.accountNumber
      ? FormData.accountNumber
      : generateAccountNumber(),
    balance: 0,
  };
  return customer;
};
const generateAccountNumber = () => {
  const min = 1;
  const max = 100000000000;
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  return randNum.toString().padStart(10, "0");
};

async function findExistingCustomerIndex(customerId) {
  let id = parseInt(customerId);
  const response = await getCustomerByIdapi(id);
  if (response.status === 404) {
    return response.message;
  }
  const data = response.data;
  return data;
}
const saveCustomer = async (customer) => {
  const response = await createCustomerapi(customer);
  return response;
};
const loadCustomer = (customer) => {
  document.getElementById("customer-id").value = customer.id;
  document.getElementById("customer-name").value = customer.name;
  document.getElementById("customer-email").value = customer.email;
  document.getElementById("customer-phone").value = customer.phone;
  document.getElementById("customer-address").value = customer.address;
  document.getElementById("customer-dob").value = formatDate(
    customer.dateOfBirth
  );
  document.getElementById("customer-account-type").value = customer.accountType;
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
            <td>${formatDate(customer.dateOfBirth)}</td>
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

async function handleSubmit(e, customerForm, customerList) {
  e.preventDefault();
  const formData = getFormData();
  
  const customer = createCustomerObject(formData);
  const { isValid, errors } = validateCustomer(customer);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  const saveResult = await saveCustomer(customer);
  if (saveResult.status !== 201) {
    alert(saveResult.message);
    return;
  }

  alert(saveResult.message);
  getCustomers(customerList);
  customerForm.reset();
}

const updateCustomer = async (customerForm, customerList) => {
  const formData = getFormData();
  const existingCustomer = await findExistingCustomerIndex(formData.id);

  if (existingCustomer.message === "Customer not found") {
    alert("Customer does not exist");
    return;
  }
  console.log("existingCustomer", existingCustomer);

  const customer_id = existingCustomer.data.id;
  console.log("existingCustomerIndex", existingCustomer.id);

  const customer = {
    ...existingCustomer.data,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    dateOfBirth: formData.dateOfBirth,
    accountType: formData.accountType,
  };

  const { isValid, errors } = validateCustomer(customer);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  const response = await updateCustomerapi(customer, customer_id);
  if (response.status !== 200) {
    alert(response.message);
    return;
  }

  alert(response.message);
  getCustomers(customerList);
  customerForm.reset();
};

const handleDeleteCustomer = async (customerForm, customerList) => {
  const formData = getFormData();
  const existingCustomer = await findExistingCustomerIndex(formData.id);

  if (existingCustomer.message === "Customer not found") {
    alert("Customer does not exist");
    return;
  }

  const customer_id = existingCustomer.data.id;

  const response = await deleteCustomerapi(customer_id);
  if (response.status !== 200) {
    alert(response.message);
    return;
  }

  alert(response.message);
  getCustomers(customerList);
  customerForm.reset();
};
export {
  getCustomers as handleGetCustomers,
  getCustomersbySearch as handleGetCustomersbySearch,
  handleSubmit,
  updateCustomer as handleUpdateCustomer,
  handleDeleteCustomer,
};
