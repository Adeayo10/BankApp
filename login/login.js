import { handleSubmit } from "./handler.js";

function initializeLoginScripts(){

  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", (e) => {
    console.log("loginForm submitted");
    handleSubmit(e);
  });

}

export { initializeLoginScripts };