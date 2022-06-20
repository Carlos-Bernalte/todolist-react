import React, { useState} from 'react';
import {
  Card, CardTitle, Label, Button, Form, FormGroup, Input,
  Col, Row
} from 'reactstrap';

import { putExistingProject, deleteProject } from "../../utils/projects";


export default function EditProject(props) {


  const [name, setName] = useState();


  const updateProject = (e) => {
    e.preventDefault();
    putExistingProject(props.task._id, name)
      .then((res) => checkPUTTask(res));
  }
  const deleteProject = (e) => {
    e.preventDefault();
    deleteProject(props.project._id)
      .then((res) => checkPUTTask(res));
  }

  //Check the response from the server
  const checkPUTTask = (res) => {
    if (res === "OK"){
      props.closeEditProject(null)
    }
  }

  return (
    
    <Card body>
      <CardTitle tag="h5">Project Settings</CardTitle>
      <Form>
        <FormGroup>
          <Row >
            <Col>
              <Label for="aName">Name: </Label>
              <Input style={{ height: '30px' }} type="textfield" name="name" value={name} id="aMensaje" placeholder="Task name" onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>

        </FormGroup>

        <Row >
            <Col align="center">
                <Button color="primary" onClick={updateProject}>Update</Button>
                {' '}
                <Button color="danger" onClick={deleteProject}>Delete</Button>
            </Col>
        </Row>

      </Form>
    </Card>

  );
}
