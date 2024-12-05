export async function createUserAPI(user) {
    try {
      const response = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return { status: response.status, message: data.message };
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
  
  export async function getUsersAPI() {
    try {
      const response = await fetch('http://localhost:3000/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return { status: response.status, message: response.message, data: data };
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
  
  export async function getUserByIdAPI(id) {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return { status: response.status, message: response.message, data: data };
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
  
  export async function updateUserAPI(user, id) {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return { status: response.status, message: data.message };
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }