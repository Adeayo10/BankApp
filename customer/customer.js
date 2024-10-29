import {
  handleSubmit,
  getCustomers,
  handleUpdateCustomer,
  handleDeleteCustomer,
} from "./handlers.js";

export function initializeCustomerScripts() {
  const customerForm = document.querySelector("#customer-form");
  const customerList = document.querySelector("#customer-list");
  const updateCustomer = document.querySelector("#update-customer");
  const deleteCustomer = document.querySelector("#delete-customer");
  const cancelCustomer = document.querySelector("#cancel-customer");

  getCustomers(customerList);

  customerForm.addEventListener("submit", (e) => {
    handleSubmit(e, customerForm, customerList);
  });

  updateCustomer.addEventListener("click", () => {
    handleUpdateCustomer(customerForm, customerList);
  });
  
  deleteCustomer.addEventListener("click", () => {
    handleDeleteCustomer(customerForm, customerList);
  });
  
  cancelCustomer.addEventListener("click", () => {
    customerForm.reset();
  });

  // ...
}
