import { validateUser } from "../validate.js";
import {
  createUserAPI,
  getUsersAPI,
  getUserByIdAPI,
  updateUserAPI,
} from "../apis/userAPI.js";

async function handleGetUsers(userList) {
  const response = await getUsersAPI();
  const users = response.data;
  displayUsers(userList, users.data);
}

function handleGetUsersBySearch(userList, searchValue) {
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.role.toLowerCase().includes(searchValue.toLowerCase())
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
                    <th>Password</th>
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
                        <td>${user.password}</td>
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
    // id: formData.id? parseInt(formData.id) : null,
    name: formData.name,
    email: formData.email,
    role: formData.role,
    password: formData.password ? formData.password : generatePassword(),
  };
  return user;
}

function generatePassword() {
  return Math.random().toString(36).slice(-8);
}
async function saveUser(user) {
  const response = await createUserAPI(user);
  console.log("response", response);
  return response;
}

async function handleCreateUser(e, userForm, userList) {
  e.preventDefault();
  const formData = getFormData();

  // const existingUserIndex = findExistingUserIndex(formData.id);

  // if(existingUserIndex > -1){
  //     alert("User with the ID already exists");
  //     return;
  // }

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

function handleDeleteUser(userForm, userList) {
  deleteUser(userForm, userList);
}

function deleteUser(userForm, userList) {
  const formData = getFormData();
  const existingUserIndex = findExistingUserIndex(formData.id);
  if (existingUserIndex === -1) {
    alert("User does not exist");
    return;
  }

  deletingExistingUser(existingUserIndex);
  alert("User deleted successfully");
  displayUsers(userList, users);
  userForm.reset();
}

function deletingExistingUser(index) {
  users.splice(index, 1);
}

export {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUsersBySearch,
};
