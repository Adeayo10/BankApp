import { handleGetUsers, handleCreateUser, handleUpdateUser } from "../user/handler.js";
export function initializeUserScripts(){
    const userForm = document.getElementById("user-form");
    const userList = document.getElementById("user-list");
    const deleteUserButton = document.getElementById("delete-user");
    const updateUserButton = document.getElementById("update-user");

    handleGetUsers(userList);

    userForm.addEventListener("submit", (e) => {
        handleCreateUser(e, userForm, userList);
    });

    updateUserButton.addEventListener("click", () => {
        console.log("update user button clicked");
        handleUpdateUser(userForm, userList);
    });

    
}

