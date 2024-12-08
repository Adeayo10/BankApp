import { login } from "../apis/authAPI";

export async function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await login(loginData);
        return{}
    } catch (error) {
        console.error(error);
    }
}