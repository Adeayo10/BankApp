const getToken = () => localStorage.getItem('token');
export async function createTransactionAPI(transaction){
    const response = await fetch('http://localhost:3000/transaction/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        },
        body: JSON.stringify(transaction),
    });
    try {
        const data = await response.json();
        return { status: response.status, message: data.message };
    } catch (error) {
        console.error('Error:', error);
    }

}

export async function checkIfAccountNumberExistAndReturnCustomerAPI(accountNumber){
    const response = await fetch(`http://localhost:3000/transaction/${accountNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        },
    });
    try {
        const data = await response.json();
        return { status: response.status, message: data.message, data: data.data };
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getTransactionsAPI(){
    const response =await fetch('http://localhost:3000/transaction/all',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
    });
    try {
        const data = await response.json();
        return { status: response.status, message:response.message, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}