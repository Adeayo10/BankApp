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
}


export { handleGetUsers };




