import React, { useState } from 'react';
import {
  Card, CardTitle, Label, Button, Form, FormGroup, Input,
  Col, Row
} from 'reactstrap';

import { postNewTask } from "../../utils/tasks.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function AddTask(props) {


  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState();

  const onChangeSelection = (e) => {
    setPriority(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    //Save task in database with post api call
    postNewTask(name, priority, deadline)
      .then((res) => checkPOSTNewTask(res));
  }


  //Check the response from the server
  const checkPOSTNewTask = (res) => {
    if (res === "OK") {
      props.updateMyTasks();
      props.closeCreateTask(null)
    }
  }

  return (
    <Card body>
      <CardTitle tag="h5">New task</CardTitle>
      <Form>
        <FormGroup>
          <Row >
            <Col>
              <Label for="aName">Name: </Label>
              <Input style={{ height: '30px' }} type="textfield" name="name" value={name} id="aMensaje" placeholder="Task name" onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="aDate">Deadline: </Label>
            </Col>
            <Col>
              <Label for="aDate">Priority: </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <DatePicker selected={deadline} placeholderText="Select a deadline" dateFormat="dd-MM-yyyy" minDate={new Date()} onChange={date => setDeadline(date)} />
            </Col>
            <Col>
            <FormGroup>
  
          <Input type="select" name="select" value={priority} onChange={onChangeSelection}>
            <option value='1'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </Input>
        </FormGroup>
            </Col>
          </Row>

        </FormGroup>
        <Row className="justify-content-md-center"><Button color="primary" onClick={addTask}>Add</Button></Row>

      </Form>
    </Card>

  );
}