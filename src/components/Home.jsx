import React, { useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import TaskList from './tasks/TaskList';
import '../App.css';
import Sidebar from './Sidebar';
export function Home(props) {
  const [showProject, setProject] = useState(null);
  return (

    <Container fluid>
    <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Sidebar />
        </Col>
        <Col  xs={10} id="page-content-wrapper">
          <TaskList />
        </Col> 
    </Row>

</Container>

  );

}