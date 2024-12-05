export async function createCustomerapi(customer){
    const response = await fetch('http://localhost:3000/customer/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    try {
        const data = await response.json();
        return { status: response.status, message: data.message };
    } catch (error) {
        console.error('Error:', error);
    }
}
 
export async function getCustomersapi() {
    const response = await fetch('http://localhost:3000/customer/all',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const data = await response.json();
        return { status: response.status, message:response.message, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getCustomerByIdapi(id) {}