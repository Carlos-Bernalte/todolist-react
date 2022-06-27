import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, CardTitle, CardBody,
  Table, Alert, Button, Modal
} from 'reactstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai"
import { ImCross} from "react-icons/im"
import {BiSliderAlt} from "react-icons/bi"
import { getAllTasks, deleteTask } from "../../utils/tasks.js";

import EditTask from '../task/EditTask';
import AddTask from '../task/AddTask';
import EditProject from '../projects/EditProject';
import './Task.css';

export default function Project(props) {

  const [tasks, setTasks] = useState([]);
  const [showEditTaskModal, setShowEditTaskModal] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(null);
  const [showEditProjectModal, setShowEditProjectModal] = useState(null);
 
  const getTasks = () => {

    getAllTasks(props.project._id).then((tasks) => {
      setTasks(tasks);
    });
  }

  const handleUpdateMyTasks = () => {
    getTasks();
  }
  const askForUpdateProject = () => {
    
    setShowEditProjectModal(
      <Modal isOpen="true">
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowEditProjectModal(null)}><ImCross /></Button>
        <EditProject tasks={tasks} closeUpdateProject={setShowEditProjectModal} project={props.project} setProject={props.setProject} handleUpdateMyProjects={props.handleUpdateMyProjects}/>
      </Modal>
    );
  }
  const askForCreateTask = () => {
    setShowAddTaskModal(
      <Modal isOpen="true">
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowAddTaskModal(null)}><ImCross /></Button>
        <AddTask updateMyTasks={handleUpdateMyTasks} closeCreateTask={setShowAddTaskModal} project_id={props.project._id} />
      </Modal>
    );
  }

  const askForUpdateTask = (task) => {
    setShowEditTaskModal(
      <Modal isOpen="true" className={props.className}>
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowEditTaskModal(null)}><ImCross /></Button>
        <EditTask task={task} updateMyTasks={handleUpdateMyTasks} closeEditTask={setShowEditTaskModal} />
      </Modal>
    );
  }
  const deleteTaskSel = (task) => {
    deleteTask(task._id)
      .then((res) => handleUpdateMyTasks());

  }
  
  useEffect(() => {
    getTasks();
  }, [props.project]);

  return (
    <div>
      
      {showAddTaskModal}
      {showEditTaskModal}
      {showEditProjectModal}
      <Row>
        <Col>
          <CardTitle tag="center"><Alert color="secondary">

          <h2><Row><Col align="right"></Col>{props.project.name} <Col align="right"><Button  color="dark" onClick={() => askForUpdateProject()}><BiSliderAlt /></Button></Col></Row></h2> 

          </Alert></CardTitle>
          <Table>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <div>
                    <Row>
                      <Col>
                        <Card style={{backgroundColor:colorPriority(task.priority)}}>
                          <CardBody >
                            <Row>
                              <Col>
                                <h4>{task.name}</h4>
                              </Col>
                              <Col>
                                <h4>{formatDate(task.deadline)}</h4>
                              </Col>
                              <Col align="right">
                                <Button outline color="dark" onClick={() => askForUpdateTask(task)}><FaEdit /></Button>
                                {' '}
                                <Button outline color="dark" onClick={() => deleteTaskSel(task)}><FaTrashAlt /></Button>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <br />
                  </div>)
              })}
              <Button className='flexbox' color="primary" onClick={() => askForCreateTask()}><AiOutlinePlus /></Button>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
function colorPriority(priority){
  var color;
  switch (priority) {
    case "Low":
      color="#6dffe5";
      break;
    case "Medium":
      color="#f3db4d";
      break;
    case "High":
      color="#f06161";
      break;
    default:
      color="#ededed"
      break;
  }
  return color;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [day, month, year].join('-').toString();
}