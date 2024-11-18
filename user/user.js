export function initializeUserScripts(){
    const userForm = document.getElementById("user-form");
    const userList = document.getElementById("user-list");
    const deleteUserButton = document.getElementById("delete-user");
    const updateUserButton = document.getElementById("update-user");

    handleGetUsers(userList);
}