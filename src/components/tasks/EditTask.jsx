import React, { useState, useEffect } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { putExistingTask } from "../../utils/apicalls.js";

export default function EditTask(props){

  const [name, setName] = useState(props.task.name);
  const [priority, setPriority] = useState('');
  const [deathline, setDeathline] = useState('');

  const editTask = (e) => {
    e.preventDefault();
    putExistingTask(props.task._id, name, priority, deathline)
      .then((res) => checkPUTTask(res));
  }

  //Check the response from the server
  const checkPUTTask = (res) => {
    if (res === "OK"){
      props.updateMyTasks();
    }else{
      
    }
  }

  useEffect(() =>{
    setName(props.task.name);
    setPriority(props.task.priority);
    setDeathline(props.task.deathline);
  },[props.task]);

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">Edit task</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aName">Name: </Label>
            <Input style={{height: '30px'}} type="textfield" name="name" value={name} id="aMensaje" placeholder="Task name" onChange={(e) => setName(e.target.value)}/>
          </FormGroup>
            <Button color="secondary" onClick={editTask}>Update</Button>
        </Form>
      </Card>
    </div>
  );
}