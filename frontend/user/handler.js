import { validateUser } from "../validate.js";
import {
  createUserAPI,
  getUsersAPI,
  getUserByIdAPI,
  updateUserAPI,
deleteUserAPI,
} from "../apis/userAPI.js";

async function handleGetUsers(userList) {
  const response = await getUsersAPI();
  const users = response.data;
  displayUsers(userList, users.data);
}

async function handleGetUsersBySearch(userList, searchValue) {
    const response =await getUsersAPI()
    const users = response.data.data;

  const filteredUsers = users.filter((user) => {
    const searchLower = searchValue.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });
  displayUsers(userList, filteredUsers);
}

function displayUsers(userList, users) {
  renderUserTable(userList, users);
  const userRows = userList.querySelectorAll("tr");
  userRows.forEach((row) => {
    row.addEventListener("click", () => {
      const userId = parseInt(row.getAttribute("data-id"));
      const user = users.find((user) => user.id === userId);
      loadUser(user);
    });
  });
}
function renderUserTable(userList, users) {
  userList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${users
                  .map(
                    (user) => `
                    <tr data-id="${user.id}">
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                       
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
}

function loadUser(user) {
  document.getElementById("user-id").value = user.id;
  document.getElementById("user-name").value = user.name;
  document.getElementById("user-email").value = user.email;
  document.getElementById("user-role").value = user.role;
}

function getFormData() {
  const formData = {
    id: document.getElementById("user-id").value,
    name: document.getElementById("user-name").value,
    email: document.getElementById("user-email").value,
    role: document.getElementById("user-role").value,
  };
  return formData;
}

function createUserObject(formData) {
  const user = {
    name: formData.name,
    email: formData.email,
    role: formData.role,
    password: formData.password ? formData.password : generatePassword(),
  };
  return user;
}

function generatePassword() {
  const password = Math.random().toString(36).slice(-8);
  console.log("password", password);
  return password;
}
async function saveUser(user) {
  const response = await createUserAPI(user);
  console.log("response", response);
  return response;
}

async function handleCreateUser(e, userForm, userList) {
  e.preventDefault();
  const formData = getFormData();

  const user = createUserObject(formData);
  const { isValid, errors } = validateUser(user);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  const saveResult = await saveUser(user);
  console.log("saveResult", saveResult.status, saveResult.message);
  if (saveResult.status !== 201) {
    alert(saveResult.message);
    return;
  }
  alert(saveResult.message);
  handleGetUsers(userList);
  userForm.reset();
}

async function  findExistingUserIndex(userId) {
  let id = parseInt(userId);
  const response = await getUserByIdAPI(id);
  if (response.status === 404) {
    return response.message;
  }
  const user = response.data;
  console.log("user", user);
  return user;
}

async function handleUpdateUser(userForm, userList) {
  const formData = getFormData();
  const existingUser = await findExistingUserIndex(formData.id);
  if (existingUser.message === "User not found") {
    alert("User does not exist");
    return;
  }
  console.log("existingUser 150", existingUser);

  const user_id = existingUser.data.id;
  console.log("existingUserIndexddddddddd", existingUser.data.id);

  const user = {
    ...existingUser.data,
    name: formData.name,
    email: formData.email,
    role: formData.role,
    password: formData.password,
  };

  const { isValid, errors } = validateUser(user);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  const response = await updateUserAPI(user, user_id);
  if (response.status !== 200) {
    alert(response.message);
    return;
  }

  alert(response.message);
  handleGetUsers(userList);
  userForm.reset();
}

async function handleDeleteUser(userForm, userList) {
  const formData = getFormData();
  const existingUser = await findExistingUserIndex(formData.id);
  if (existingUser.message === "User not found") {
    alert("User does not exist");
    return;
  }

  console.log("existingUser 150", existingUser.data.id);

  const user_id = existingUser.data.id;

  const response = await deleteUserAPI(user_id);
  if (response.status !== 200) {
    alert(response.message);
    return;
  }

    alert(response.message);
    handleGetUsers(userList);

    userForm.reset();
}

export {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUsersBySearch,
};
