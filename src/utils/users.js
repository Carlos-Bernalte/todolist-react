import API from './api';

export {
    existsUser,
    getAllUsers,
    deleteUser,
    postNewUser,
    putExistingUser
}
// Function to return if a user exists sending the username and password provided and router object
function existsUser(username, password) {
    return API.put('/users/' + username,{password}).then(res => res.data);
}
function putExistingUser(iduser,username, email, admin) {
    return API.put('/users/'+iduser, {
        username,
        email,
        admin
    }).then(result => result.data);
}

function getAllUsers() {
    return API.get('/users').then(res => res.data);
}

function deleteUser(iduser) {
    return API.delete('/users/'+iduser).then(result => result.data);
}

function postNewUser(username, password, email) {
    var admin = false;
    return API.post('/users', {
        username,
        password,
        email,
        admin
    }).then(result => result.data);
}

