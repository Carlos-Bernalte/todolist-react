import React, { useState, useEffect } from 'react';
import {
  Row, Col, Card, CardTitle, CardBody,
  Table, Alert, Button, Modal
} from 'reactstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai"
import { ImCross} from "react-icons/im"
import {BiSliderAlt} from "react-icons/bi"

import { deleteUser, getAllUsers } from '../../utils/users.js';
import EditUser from './EditUser';

export default function UsersList(props) {

  const [users, setUsers] = useState([]);
  const [showEditUserModal, setshowEditUserModal] = useState(null);

 
  const getUsers = () => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }

  const handleUpdateUsers = () => {
    getUsers();
  }


  const askForUpdateUser = (user) => {
    setshowEditUserModal(
      <Modal isOpen="true" className={props.className}>
        <Button background-color='#007bff' color='#ffffff' onClick={() => setshowEditUserModal(null)}><ImCross /></Button>
        <EditUser user={user} handleUpdateUsers={handleUpdateUsers} closeEditUser={setshowEditUserModal} />
      </Modal>
    );
  }
  const deleteUserSel = (user) => {
    deleteUser(user._id)
      .then((res) => handleUpdateUsers());

  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {showEditUserModal}
      <Row>
        <Col>
          <Table>
            <tbody>
              {users.map((user, index) => {
                return (
                  <div>
                    <Row>
                      <Col>
                        <Card style={{backgroundColor:colorPriority(user.admin)}}>
                          <CardBody >
                            <Row>
                              <Col>
                                <h4>{user.username}</h4>
                              </Col>
                              <Col>
                                <h4>{user.email}</h4>
                              </Col>
                              <Col align="right">
                                <Button outline color="dark" onClick={() => askForUpdateUser(user)}><FaEdit /></Button>
                                {' '}
                                <Button outline color="dark" onClick={() => deleteUserSel(user)}><FaTrashAlt /></Button>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <br />
                  </div>)
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

function colorPriority(admin){
    var color;
    if(admin){
      color = '#ffc107';
       
    }else{
      color = "#ededed";
      
    }
    return color;
  }
