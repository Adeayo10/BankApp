import { initializeCustomerScripts } from "./customer/customer.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("#main-content");
  const loadCustomersLink = document.querySelector("#load-customers");

  function loadContent(url, callback) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        mainContent.innerHTML = data;
        callback();
      });
  }

  loadCustomersLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadContent("./views/components/customer.html", initializeCustomerScripts);
    console.log("Load customers clicked");
  });
});
