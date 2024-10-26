import { handleSubmit, getCustomers } from "./handlers.js";

export function initializeCustomerScripts() {
  const customerForm = document.querySelector("#customer-form");
  const customerList = document.querySelector("#customer-list");

  getCustomers(customerList);

  customerForm.addEventListener("submit", (e) => {
    handleSubmit(e, customerForm, customerList);
  });

  // ...
}
