export async function login(loginData) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    try{
        const result = await response.json();
        return{ token: result.token,  user: result.user, message: result.message, status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
}