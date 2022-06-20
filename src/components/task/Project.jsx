import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, CardTitle, Badge, CardBody,
  Table, Alert, Button, Modal
} from 'reactstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { getAllTasks, deleteTask } from "../../utils/tasks.js";

import EditTask from './EditTask';
import AddTask from './AddTask';
import './Task.css';

export default function TaskList(props) {

  const [tasks, setTasks] = useState([]);
  const [showEditTaskModal, setShowEditTaskModal] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(null);

  const getTasks = () => {
    getAllTasks().then((tasks) => {
      setTasks(tasks);
    });
  }

  const handleUpdateMyTasks = () => {
    getTasks();
  }

  const askForCreate = () => {
    setShowAddTaskModal(
      <Modal isOpen="true">
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowAddTaskModal(null)}><ImCross /></Button>
        <AddTask updateMyTasks={handleUpdateMyTasks} closeCreateTask={setShowAddTaskModal} />
      </Modal>
    );
  }

  const askForUpdate = (task) => {
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
  }, []);
  return (
    <div>
      {showAddTaskModal}
      {showEditTaskModal}
      <Row>
        <Col>
          <CardTitle tag="center"><Alert color="secondary"><strong>Project Name </strong><Badge pill>{tasks.length}</Badge></Alert></CardTitle>
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
                                <h1>{task.name}</h1>
                              </Col>
                              <Col>
                                <h2>{formatDate(task.deadline)}</h2>
                              </Col>
                              <Col align="right">
                                <Button outline color="dark" onClick={() => askForUpdate(task)}><FaEdit /></Button>
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
              <Button className='flexbox' color="primary" onClick={() => askForCreate()}><AiOutlinePlus /></Button>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
function colorPriority(priority){
  var color;
  var color2;
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