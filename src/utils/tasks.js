import API from './api';

export {
    getAllTasks,
    deleteTask,
    postNewTask,
    putExistingTask
}

function getAllTasks(project_id) {
    return API.get('/tasks/'+project_id).then(res => res.data);
}

function deleteTask(idtask) {
    return API.delete('/tasks/'+idtask).then(result => result.data);
}

function postNewTask(name, priority, deadline,project_id ) {
    return API.post('/tasks', {
        name,
        priority,
        deadline,
        project_id
    }).then(result => result.data);
}

  function putExistingTask(idtask, name,priority,deadline) {
    return API.put('/tasks/'+idtask, {
        name,
        priority,
        deadline
    }).then(result => result.data);
}