import React, { useState} from 'react';
import {
  Card, CardTitle, Label, Button, Form, FormGroup, Input,
  Col, Row
} from 'reactstrap';

import { putExistingProject, deleteProject } from "../../utils/projects";
import { deleteTask } from '../../utils/tasks';

export default function EditProject(props) {


  const [name, setName] = useState(props.project.name);


  const updateProject = () => {
    
    putExistingProject(props.project._id, name)
      .then((res) =>  checkPUTProject(res));
  }
  const deleteProjectSel = () => {
    props.tasks.forEach(function(task, index) {
      deleteTask(task._id);
    })
    deleteProject(props.project._id)
      .then((res) => checkDeleteProject(res));
  }

  //Check the response from the server
  const checkPUTProject = (res) => {
    if (res === "OK"){
      props.handleUpdateMyProjects();
      props.closeUpdateProject(null);
    }
  }
  const checkDeleteProject = (res) => {
    if (res === "OK"){
      props.setProject(null);
      props.handleUpdateMyProjects();
      props.closeUpdateProject(null);
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
                <Button color="danger" onClick={deleteProjectSel}>Delete</Button>
            </Col>
        </Row>

      </Form>
    </Card>

  );
}
