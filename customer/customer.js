import { handleSubmit, getCustomers } from "./handlers.js";

export function initializeCustomerScripts() {
  const customerForm = document.querySelector("#customer-form");
  const customerList = document.querySelector("#customer-list");
  const updateCustomer = document.querySelector("#update-customer");

  getCustomers(customerList);

  customerForm.addEventListener("submit", (e) => {
    handleSubmit(e, customerForm, customerList);
  });

  updateCustomer.addEventListener("click", ()=>{})



  // ...
}
