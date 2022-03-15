import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody,
  Table, Alert, Button, Nav, NavItem, NavLink, TabContent,
  TabPane, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import { FaEdit, FaTrashAlt} from "react-icons/fa"

import { getAllTasks, deleteTask } from "../../utils/apicalls.js";

import EditTask from './EditTask';
import AddTask from './AddTask';


export default function TaskList(props){

  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(<Alert color="warning">Select a task for editing</Alert>);
  const [activeTab, setActiveTab] = useState('1');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const getTasks = () => {
    getAllTasks().then((tasks) => {
      setTasks(tasks);
    });
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab)
      setActiveTab(tab);
  }
  const handleUpdateMyTasks = () => {
    getTasks();
  }

  const askForDelete = (task) => {
    setShowDeleteModal(
      <Modal isOpen="true" className={props.className}>
        <ModalHeader>Delete tasks</ModalHeader>
        <ModalBody>
          Task is going to be deleted:<br/><small><strong>{task.name}</strong></small>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deleteTaskSel(task)}>Delete</Button>{' '}
          <Button color="secondary" onClick={() => setShowDeleteModal(null)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
  const deleteTaskSel = (task) => {
    deleteTask(task._id)
      .then((res) => checkDELETETask(res));
      
  }
  //Check the response from server
  const checkDELETETask = (res) => {
    //if ok, remove modal and reset edit component
    if (res === "OK"){
      setShowDeleteModal(null);
      setEdit(<Alert color="warning">Select a task from the list</Alert>);
      handleUpdateMyTasks();
    }else{
      setShowDeleteModal(null);
      setEdit(<Alert color="warning">Error deleting</Alert>);
      handleUpdateMyTasks();
    }
  }
  const handleShowEdit = (task) => {
    setEdit(<EditTask task= {task} updateMyTasks = {handleUpdateMyTasks()} />);
  }

  useEffect(() =>{
    getTasks();
  },[]);
  return (
    <div>
      {showDeleteModal}
      <Row>
        <Col xs="7">
      <CardTitle tag="center"><Alert color="secondary"><strong>Project Name </strong><Badge pill>{tasks.length}</Badge></Alert></CardTitle>
      <Table>
        <tbody>
          { tasks.map((task, index) => {
            return(
              <div>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              {task.name} {task.priority}
                            </Col> 
                            <Col align="right">
                              <Button outline onClick={() => handleShowEdit(task)}><FaEdit /></Button>
                              {' '}
                              <Button outline onClick={() => askForDelete(task)}><FaTrashAlt /></Button>
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
                  <br/>
              </div>)
            })}
          </tbody>
        </Table>
        </Col>
        <Col xs="5">
          <Nav tabs>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                New Task
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                Edit Task
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <AddTask updateMyTasks = {handleUpdateMyTasks()}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  {edit}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      </div>
    );
}