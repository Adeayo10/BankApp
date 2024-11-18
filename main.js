import { initializeCustomerScripts } from "./customer/customer.js";
import { initializeUserScripts } from "./user/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("#main-content");
  const loadCustomersLink = document.querySelector("#load-customers");
  const loadUserLink = document.querySelector("#load-users");

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

  loadUserLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadContent("./views/components/user.html", initializeUserScripts);
    console.log("Load users clicked");
  });
});
