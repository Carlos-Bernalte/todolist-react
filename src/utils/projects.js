import API from './api';

export {
    getAllProjects,
    deleteProject,
    postNewProject,
    putExistingProject
}

function getAllProjects() {
    return API.get('/Projects').then(res => res.data);
}

function deleteProject(idProject) {
    return API.delete('/Projects/'+idProject).then(result => result.data);
}

function postNewProject(name, owner) {
    return API.post('/Projects', {
        name,
        owner
    }).then(result => result.data);
}

  function putExistingProject(idProject, name) {
    return API.put('/Projects/'+idProject, {
        name
    }).then(result => result.data);
}