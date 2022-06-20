import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Modal, Form, FormGroup } from 'reactstrap';

import '../App.css';
import { AiOutlinePlus } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { Link } from 'react-router-dom';
import { BsCollection } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { getAllProjects } from "../utils/projects.js";
import Project from './projects/Project';
import AddProject from './projects/AddProject';
export function Home(props) {

  // const [user, setUser] = useState({
  //   'admin': true,
  //   'email': "carlos@admin.com",
  //   'password': "123",
  //   'username': "tasty",
  //   '__v': 0,
  //   '_id': "62a8d57dc658c9a38209d16d"
  // });
  sessionStorage.setItem("user", props.user);
  console.log("Session: ",props.user);
  const [user, setUser] = useState(sessionStorage.getItem("user"));

  const [showProject, setProject] = useState(null);
  const [projectList, setProjectList] = useState(null);

  const [showAddProjectModal, setShowAddProjectModal] = useState(null);
  const [showProjectsModal, setShowProjectsModal] = useState(null);

  const toggleProject = (project) => {
    setProject(project);
    setShowProjectsModal(null);
  }

  const listAllProjects = () => {
    setShowProjectsModal(
      <Modal isOpen="true">
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowProjectsModal(null)}><ImCross /></Button>
        <Form>
          <FormGroup>
            {projectList.map((proj, index) => {
              return (<Row > <Col>
                <Button color="primary" onClick={() => toggleProject(proj)}>{proj.name}</Button>
                {' '}

              </Col>
              </Row>)
            })}
          </FormGroup>

        </Form>
      </Modal>
    );
  }
  
  const askForCreateProject = () => {
    setShowAddProjectModal(
      <Modal isOpen="true" className={props.className}>
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowAddProjectModal(null)}><ImCross /></Button>
        <AddProject closeAddProject={setShowAddProjectModal} user={user} handleUpdateMyProjects={handleUpdateMyProjects}/>
      </Modal>
    );
  }

  const handleUpdateMyProjects = () => {
    getProjects();
  }
  const getProjects = () => {
    getAllProjects().then((projectList) => {
      setProjectList(projectList);
    });
  }
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <Container fluid>
      {showAddProjectModal}
      {showProjectsModal}
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <div class="sidebar">
            <h1> ToDoList</h1>
            <div class="sidebar-heading bg-light">{user.username.toUpperCase()}</div>
            <div class="list-group list-group-flush">
              {user.admin ? (
                <a class="list-group-item list-group-item-action  p-3" href="#!"><AiOutlineUser />  Users</a>
              ) : (
                <div></div>
              )}
              <a class="list-group-item list-group-item-action  p-3" onClick={() => listAllProjects()}><BsCollection />  Projects</a>

            </div>
            <Button className='flexbox' color="primary" onClick={() => askForCreateProject()}><AiOutlinePlus /></Button>
            <div class="sidebar-footer">
              <Link to="/sign-in"><a class="list-group-item list-group-item-action  p-3" ><AiOutlineLogout />  Logout</a></Link>
            </div>

          </div>
        </Col>
        <Col xs={10} id="page-content-wrapper">
          {showProject ? (
                 <Project project={showProject} />
              ) : (
                <div></div>
              )}
         
        </Col>
      </Row>

    </Container>

  );

}