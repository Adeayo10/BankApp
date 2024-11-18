let users = [];

function handleGetUsers(userList){
    fetch("../db.json")
    .then(resp => resp.json())
    .then(users => {
        users = users.users;
        displayUsers(userList, users);
    });
}




export { handleGetUsers };




