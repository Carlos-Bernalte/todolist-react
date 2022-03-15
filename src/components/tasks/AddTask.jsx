import React, { useState } from 'react';
import { Card, CardTitle, Label, Button, Form, FormGroup, Input } from 'reactstrap';

import { postNewTask } from "../../utils/apicalls.js";

export default function AddPost(props){

  const [message, setMessage] = useState('');

  const addPost = (e) => {
    e.preventDefault();
    //Save post in database with post api call
    postNewTask(sessionStorage.getItem('email'),sessionStorage.getItem('name'), sessionStorage.getItem('image'), message)
      .then((res) => checkPOSTNewPost(res));
  }

  //Check the response from the server
  const checkPOSTNewPost = (res) => {
    if (res === "OK"){
      //TODO Show Modal when a new post is added
      props.updateMyPosts();
    }else{
      //TODO Show Modal when an error adding a new post occurs
    }
  }

  return (
    <div>
      <Card body>
        <CardTitle tag="h5">New task</CardTitle>
        <Form>
          <FormGroup>
            <Label for="aMensaje">Name:</Label>
            <Input style={{height: '30px'}} type="textfield" name="message" value={message} id="aMensaje" placeholder="Introduce un mensaje" onChange={(e) => setMessage(e.target.value)}/>
          </FormGroup>
          <Button color="primary" onClick={addPost}>Add</Button>
        </Form>
      </Card>
    </div>
  );
}