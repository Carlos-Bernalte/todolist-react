import React, { useState} from 'react';
import {
  Card, CardTitle, Label, Button, Form, FormGroup, Input,
  Col, Row
} from 'reactstrap';

import { postNewProject } from "../../utils/projects";


export default function AddProject(props) {


  const [projectName, setProjectName] = useState();

  const addProject = (e) => {
    e.preventDefault();
    console.log(projectName, props.user._id);
    postNewProject(projectName, props.user._id)
      .then((res) => checkPOSTNewProject(res));
  }
  const checkPOSTNewProject = (res) => {
    if (res === "OK") {
      props.handleUpdateMyProjects()
      props.closeAddProject(null);
      setProjectName('')
    }
  }

  return (
    
    <Card body>
      <CardTitle tag="h5">Create New Project</CardTitle>
      <Form>
        <FormGroup>
          <Row >
            <Col>
              <Label for="aName">Name: </Label>
              <Input style={{ height: '30px' }} type="textfield" name="name" id="aMensaje" placeholder="Project name" onChange={(e) => setProjectName(e.target.value)} />
            </Col>
          </Row>

        </FormGroup>

        <Row className="justify-content-md-center"><Button color="primary" onClick={addProject}>Add</Button></Row>

      </Form>
    </Card>

  );
}
