import React, { useState } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input} from 'reactstrap';

import { postNewTask } from "../../utils/apicalls.js";

export default function AddTask(props){

  const [name, setName] = useState('');
  const [priority, setPriority] = useState('1');
  const [deathline, setDeathline] = useState('HOY');
  const addTask = (e) => {
    e.preventDefault();
    //Save task in database with post api call
    postNewTask(name, priority, deathline)
      .then((res) => checkPOSTNewTask(res));
  }

  //Check the response from the server
  const checkPOSTNewTask = (res) => {
    if (res === "OK"){
        props.handleUpdateMyTasks();
      }else{

      }
  }

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">New task</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aName">Name: </Label>
            <Input style={{height: '30px'}} type="textfield" name="name" value={name} id="aMensaje" placeholder="Task name" onChange={(e) => setName(e.target.value)}/>
                
          </FormGroup>
          <Button color="secondary" onClick={addTask}>Add</Button>
        </Form>
      </Card>
    </div>
  );
}