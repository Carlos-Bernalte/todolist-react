import React from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { FaElementor } from 'react-icons/fa';

export default function HeaderDashboard(props){

  return (
    <Navbar color="secondary" light expand="md">
      <NavbarBrand><FaElementor color="white"/><span className="text-white"><strong> To Do List: </strong> {"User"}</span></NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={() => props.onShow(1)}><span className="text-white">Tasks</span></NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink href="#" onClick={() => props.onShow(2)}><span className="text-white">Mis Posts</span></NavLink>
          </NavItem> */}
        </Nav>
      </Collapse>
  </Navbar>
  );
}