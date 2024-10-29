import {
  handleSubmit,
  getCustomers,
  handleUpdateCustomer,
} from "./handlers.js";

export function initializeCustomerScripts() {
  const customerForm = document.querySelector("#customer-form");
  const customerList = document.querySelector("#customer-list");
  const updateCustomer = document.querySelector("#update-customer");
  
  const cancelCustomer = document.querySelector("#cancel-customer");

  getCustomers(customerList);

  customerForm.addEventListener("submit", (e) => {
    handleSubmit(e, customerForm, customerList);
  });

  updateCustomer.addEventListener("click", () => {
    handleUpdateCustomer(customerForm, customerList);
  });

  cancelCustomer.addEventListener("click", () => {
    customerForm.reset();
  });

  // ...
}
