import {validateUser} from "../validate.js";

let users = [];

async function handleGetUsers(userList) {
    try {
        const response = await fetch("../db.json");
        const data = await response.json();
        users = data.users;
        displayUsers(userList, users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

function handleGetUsersBySearch(userList, searchValue) {
    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.role.toLowerCase().includes(searchValue.toLowerCase())
        );
    });
    displayUsers(userList, filteredUsers);
}


function displayUsers(userList, users){
    renderUserTable(userList, users);
    const userRows = userList.querySelectorAll("tr");
    userRows.forEach(row => {
        row.addEventListener("click", () => {
            const userId = parseInt(row.getAttribute("data-id"));
            const user = users.find(user => user.id === userId);
            loadUser(user);
        });
    });
    
}
function renderUserTable(userList, users){
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
                ${users.map(user => `
                    <tr data-id="${user.id}">
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>${user.password}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function loadUser(user){
    document.getElementById("user-id").value = user.id;
    document.getElementById("user-name").value = user.name;
    document.getElementById("user-email").value = user.email;
    document.getElementById("user-role").value = user.role;
}

function getFormData(){
    const formData = {
        id: document.getElementById("user-id").value,
        name: document.getElementById("user-name").value,
        email: document.getElementById("user-email").value,
        role: document.getElementById("user-role").value
    };
    return formData;
}

function createUser(formData){
    const user = {
        id: formData.id? parseInt(formData.id) : users.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password ? formData.password : generatePassword()
    };
    return user;
}

function generatePassword(){
    return Math.random().toString(36).slice(-8);
}

function handleCreateUser(e, userForm, userList){
    e.preventDefault();
    const formData = getFormData();

    const existingUserIndex = findExistingUserIndex(formData.id);

    if(existingUserIndex > -1){
        alert("User with the ID already exists");
        return;
    }

    const user = createUser(formData);
    const { isValid, errors } = validateUser(user);
    if(!isValid){
        alert(errors.join("\n"));
        return;
    }

    const saveResult = saveUser(user);
    if(!saveResult.isSuccessfull){
        alert(saveResult.message);
        return;
    }

    alert(saveResult.message);
    console.log(users);
    displayUsers(userList, users);
    console.log(users);

    userForm.reset();
}

function findExistingUserIndex(userId){
    let id = parseInt(userId);
    let userIndex = users.findIndex(user => user.id === id);
    return userIndex;
}

function saveUser(user){
    const userIndex = findExistingUserIndex(user.id);
    if(userIndex > -1){
        return { isSuccessfull: false, message: "User with the ID already exists" };
    }
    
    users.push(user);
    return { isSuccessfull: true, message: "User created successfully" };
}

function handleUpdateUser(userForm, userList) {
    console.log("Calling update user method");

    const formData = getFormData();
    const existingUserIndex = findExistingUserIndex(formData.id);
    if (existingUserIndex === -1) {
        alert("User does not exist");
        return;
    }

    const user = {
        ...users[existingUserIndex],
        name: formData.name,
        email: formData.email,
        role: formData.role,
    };

    const { isValid, errors } = validateUser(user);
    if (!isValid) {
        alert(errors.join("\n"));
        return;
    }

    const previousUser = { ...users[existingUserIndex] };
    updateExistingUser(existingUserIndex, user);

    if (JSON.stringify(previousUser) !== JSON.stringify(users[existingUserIndex])) {
        alert("User updated successfully");
    } else {
        alert("No changes were made to the user");
    }

    displayUsers(userList, users);
    userForm.reset();
}
function updateExistingUser(index, user){
    users[index] = user;
}

function handleDeleteUser(userForm, userList){
    deleteUser(userForm, userList);
}

function deleteUser(userForm, userList){
    const formData = getFormData();
    const existingUserIndex = findExistingUserIndex(formData.id);
    if(existingUserIndex === -1){
        alert("User does not exist");
        return;
    }

    deletingExistingUser(existingUserIndex);
    alert("User deleted successfully");
    displayUsers(userList, users);
    userForm.reset();

}

function deletingExistingUser(index){
users.splice(index, 1);
}   

export { handleGetUsers, handleCreateUser, handleUpdateUser, handleDeleteUser, handleGetUsersBySearch };




