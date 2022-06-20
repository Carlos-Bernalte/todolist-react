import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Modal, Label, Input, Form, FormGroup } from 'reactstrap';
import Project from './task/Project';
import '../App.css';
import { AiOutlinePlus } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { Link } from 'react-router-dom';
import { BsCollection } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { getAllProjects, deleteProject, postNewProject } from "../utils/projects.js";
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
export function Home(props) {

  const [user, setUser] = useState({
    'admin': false,
    'email': "carlos@admin.com",
    'password': "123",
    'username': "tasty",
    '__v': 0,
    '_id': "62a8d57dc658c9a38209d16d"
  });
  console.log("HOME", user);
  const [showProject, setProject] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const askForCreate = () => {
    setShowAddProjectModal(
      <Modal isOpen="true">
        <Button background-color='#007bff' color='#ffffff' onClick={() => setShowAddProjectModal(null)}><ImCross /></Button>
        <Form>
          <FormGroup>
            <Row >
              <Col>
                <Label for="aName">Name: </Label>
                <Input style={{ height: '30px' }} type="textfield" name="name" value={projectName} id="aMensaje" placeholder="Task name" onChange={(e) => setProjectName(e.target.value)} />
              </Col>
            </Row>
          </FormGroup>
          <Row className="justify-content-md-center"><Button color="primary" onClick={addProject}>Add</Button></Row>

        </Form>
      </Modal>
    );
  }
  const addProject = (e) => {
    e.preventDefault();
    //Save task in database with post api call
    postNewProject(projectName, user._id)
      .then((res) => checkPOSTNewProject(res));
  }
  const checkPOSTNewProject = (res) => {
    if (res === "OK") {
      handleUpdateMyProjects();
      setShowAddProjectModal(null);
    }
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
      {/* {showProject} */}
      <Row>
        <Col xs={2} id="sidebar-wrapper" >
          <div class="sidebar">
            <Navigation
              // you can use your own router's api to get pathname
              activeItemId="/management/members"

              onSelect={({ itemId }) => {
                // maybe push to the route
              }}
              items={[
                {
                  title: <h2>To Do List</h2>,
                  itemId: '/dashboard',
                  // you can use your own custom Icon component as well
                  // icon is optional
                  // elemBefore: () => <Icon name="inbox" />,
                },
                {
                  title: user.username.toUpperCase(),
                  itemId: '/user',

                },
                {
                  title: 'My Projects',
                  itemId: '/myprojects',
                  subNav: [
                    // projectList.map((project, index) => {
                    //   return ({
                    //     title: 'project.name',
                    //     itemId: '/management/teams',
                    //   })
                    //   })
                  ]
                },
                {
                  title: 'Shared with me',
                  itemId: '/shared',
                  subNav: [
                    {
                      title: 'Teams',
                      itemId: '/management/teams',
                    },
                  ],
                }
              ]}
            />
            <div class="sidebar-footer">
              <Link to="/sign-in"><a class="list-group-item list-group-item-action  p-3" ><AiOutlineLogout />  Logout</a></Link>
            </div>
          </div>

        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Project project={showProject} />
        </Col>
      </Row>

    </Container>
  );

}