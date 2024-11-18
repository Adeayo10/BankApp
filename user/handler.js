function handleGetUsers(userList){
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            const userLi = document.createElement("li");
            userLi.innerText = user.name;
            userList.appendChild(userLi);
        });
    });
}







