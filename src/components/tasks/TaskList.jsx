import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, CardTitle, Badge, CardBody,
  Table, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"
import {ImCross} from "react-icons/im"
import { getAllTasks, deleteTask } from "../../utils/apicalls.js";

import EditTask from './EditTask';
import AddTask from './AddTask';
import './Task.css';

export default function TaskList(props) {

  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(<Alert color="warning">Select a task for editing</Alert>);
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
      <Modal isOpen="true" className={props.className}>
        <Button color="red" onClick={() => setShowAddTaskModal(null)}><ImCross /></Button>
        <AddTask />
      </Modal>
    );
  }
  const deleteTaskSel = (task) => {
    deleteTask(task._id)
      .then((res) => handleUpdateMyTasks());

  }

  const handleShowEdit = (task) => {
    setEdit(<EditTask task={task} updateMyTasks={handleUpdateMyTasks()} />);
  }

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      {showAddTaskModal}
      <Row>
        <Col >
          <CardTitle tag="center"><Alert color="secondary"><strong>Project Name </strong><Badge pill>{tasks.length}</Badge></Alert></CardTitle>
          <Table>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <div>
                    <Row>
                      <Col>
                        <Card className='auth-card'>
                          <CardBody>
                            <Row>
                              <Col>
                                {task.name} {task.priority}
                              </Col>
                              <Col align="right">
                                <Button outline onClick={() => handleShowEdit(task)}><FaEdit /></Button>
                                {' '}
                                <Button outline onClick={() => deleteTaskSel(task)}><FaTrashAlt /></Button>
                              </Col>
                            </Row>
                            <Col>
                              {task.deathline}
                            </Col>
                            <Row>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <br />
                  </div>)
              })}
              <Button className='flexbox' outline onClick={() => askForCreate()}><AiOutlinePlus /></Button>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}