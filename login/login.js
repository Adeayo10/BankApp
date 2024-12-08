import { handleSubmit } from './loginService.js';
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener("submit", (e) => {
        console.log("login form submitted");
        handleSubmit(e);
      });
});



    