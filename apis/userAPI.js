export async function createUserAPI(user) {
  try{
    const response = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return { status: response.status, message: data.message };
  }catch(error){
    console.error('Error:', error);
    return { status: 500, message: 'Internal Server Error' };

  }
}