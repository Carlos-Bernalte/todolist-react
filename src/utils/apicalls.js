import API from './api';

export {
    getAllTasks,
    deleteTask,
    postNewTask,
    putExistingTask
}

function getAllTasks() {
    return API.get('/tasks').then(res => res.data);
}

function deleteTask(idtask) {
    return API.delete('/tasks/'+idtask).then(result => result.data);
}

function postNewTask(name, priority, deathline) {
    return API.post('/tasks', {
        name,
        priority,
        deathline
    }).then(result => result.data);
}

  function putExistingTask(idtask, name,priority,deathline) {
    return API.put('/posts/'+idtask, {
        name,
        priority,
        deathline
    }).then(result => result.data);
}