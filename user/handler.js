let users = [];

function handleGetUsers(userList){
    fetch("../db.json")
    .then(resp => resp.json())
    .then(users => {
        users = users.users;
        displayUsers(userList, users);
    });
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
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr data-id="${user.id}">
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
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


export { handleGetUsers };




