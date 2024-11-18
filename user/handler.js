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
    userList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.role}</td>  
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    const rows = userList.querySelectorAll("tr");
    rows.forEach(row => {
        row.addEventListener("click", () => {
            const userId = row.getAttribute("data-id");
            const user = users.find(u => u.id === parseInt(userId));
            loadUser(user);
        });
    });
    
    
}


export { handleGetUsers };




