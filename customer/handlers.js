import { validateCustomer } from "../validate.js";

const customerList = document.querySelector("#customer-list");
let  customers = [];

export const getCustomers = async () => {
    try {
      const response = await fetch("../db.json");
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
        const data = await response.json();
        customers = JSON.parse(data.customers);
        displayCustomers(customers);
    }
    catch (error) {
        console.error(error);
    }
};

