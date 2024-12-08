import { login } from "../apis/authAPI.js";
import { initializeCustomerScripts } from "../customer/customer.js";


async function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };
    try {
        const response = await login(loginData);
        if (response.token?.length > 0) {
            console.log(response.message);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            alert(response.message);
            updateLoginLogoutLink();
            await loadCustomerSection();
            
        } else {
            console.error(response.message);
            alert(response.message);
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadCustomerSection() {
    const mainContent = document.querySelector("#main-content");
    const response = await fetch("./views/components/customer.html");
    const data = await response.text();
    mainContent.innerHTML = data;
    initializeCustomerScripts();
}

function updateLoginLogoutLink() {
    const loadLoginLink = document.querySelector("#load-login");
    const token = localStorage.getItem('token');
    if (token) {
        loadLoginLink.textContent = 'Logout';
        loadLoginLink.addEventListener('click', handleLogout);
    } else {
        loadLoginLink.textContent = 'Login';
        loadLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadContent("./views/components/login.html", initializeLoginScripts);
            console.log("Load login clicked");
        });
    }
}
function loadContent(url, callback) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        mainContent.innerHTML = data;
        callback();
      });
  }

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    updateLoginLogoutLink();
    loadContent("./views/components/login.html", initializeLoginScripts);
}
export { handleSubmit };


