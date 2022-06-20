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
    return API.get('/users/' + username)
        .then(function (response) {
            if (response.data.length > 0) {
                if(response.data[0].password === password) {
                    return response.data[0];
                }else{
                    return false;
                }
        
            } else {
                return false;  
            }
        }
        ).catch(function (error) {
            console.log(error);
        }
        );
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

  function putExistingUser(iduser,username, password, email) {
    return API.put('/users/'+iduser, {
        username,
        password,
        email,
    }).then(result => result.data);
}