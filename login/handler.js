import { login } from "../apis/authAPI.js";


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
        if (response.status === 200) {
            console.log(response.message);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            alert(response.message);
            await loadCustomerSection();
            
            
        } else {
            console.error(response.message);
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
export { handleSubmit };


