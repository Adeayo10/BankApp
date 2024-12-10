const getToken = () => localStorage.getItem("token");
export async function createUserAPI(user) {
  try {
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":  getToken()
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { status: response.status, message: data.message };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function getUsersAPI() {
  try {
    const response = await fetch("/api/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      
      },
    });
    const data = await response.json();
    return { status: response.status, message: response.message, data: data };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function getUserByIdAPI(id) {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      },
    });
    const data = await response.json();
    return { status: response.status, message: response.message, data: data };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function updateUserAPI(user, id) {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return { status: response.status, message: data.message };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
export async function deleteUserAPI(id) {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getToken()
      },
    });
    const data = await response.json();
    return { status: response.status, message: data.message };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}