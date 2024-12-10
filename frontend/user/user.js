import { handleGetUsers, handleCreateUser, handleUpdateUser, handleDeleteUser, handleGetUsersBySearch } from "./handler.js";
export function initializeUserScripts(){
    const userForm = document.getElementById("user-form");
    const userList = document.getElementById("user-list");
    const deleteUserButton = document.getElementById("delete-user");
    const updateUserButton = document.getElementById("update-user");
    const cancelUserButton = document.getElementById("cancel-user");
    const searchUserInput = document.getElementById("search-user");
    const searchUserButton = document.getElementById("search-user-btn");

    handleGetUsers(userList);

    userForm.addEventListener("submit", (e) => {
        handleCreateUser(e, userForm, userList);
    });

    updateUserButton.addEventListener("click", () => {
        console.log("update user button clicked");
        handleUpdateUser(userForm, userList);
    });

    deleteUserButton.addEventListener("click", () => {
        handleDeleteUser(userForm, userList);
    });

    cancelUserButton.addEventListener("click", () => {
        userForm.reset();
    });

    searchUserButton.addEventListener("click", () => {
        const searchValue = searchUserInput.value;
        handleGetUsersBySearch(userList, searchValue);
    });
    
}

