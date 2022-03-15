import React, { useState } from 'react';
import { Navbar,NavLink, NavbarBrand, Nav, NavItem, Row, Col, Container} from 'reactstrap';

function App(props) {

  return (
    <Container>
    <Row>
      <Col>
        <Navbar color="secondary" light expand="md">
        <NavbarBrand><h4 className="text-white">To Do List</h4></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <NavLink href="#" onClick={() => props.history.push("/home")}><span className="text-white">Login</span></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
