import React, { useState } from 'react';
import {
    Card, CardTitle, Label, Button, Form, FormGroup, Input,
    Col, Row
} from 'reactstrap';

import { putExistingUser } from "../../utils/users";

export default function AddTask(props) {


    const [username, setName] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [admin, setAdmin] = useState(props.user.admin);

    const onChangeSelection = (e) => {
        setAdmin(e.target.value);
    };

    const editUser = (e) => {
        e.preventDefault();
        putExistingUser(props.user._id, username, email, admin)
            .then((res) => checkPUTUser(res));
    }

    //Check the response from the server
    const checkPUTUser = (res) => {
        if (res === "OK") {
            props.handleUpdateUsers();
            props.closeEditUser(null)
        }
    }



    return (
        <Card body>
            <CardTitle tag="h5">Edit User</CardTitle>
            <Form>
                <FormGroup>
                    <Row >
                        <Col>
                            <Label for="aName">Username: </Label>
                            <Input style={{ height: '30px' }} type="textfield" name="name" value={username} onChange={(e) => setName(e.target.value)} />
                        </Col>
                        <Col>
                            <Label for="aDate">Admin: </Label>
                            <Input type="select" name="select" value={admin} onChange={onChangeSelection}>
                                <option value='true'>True</option>
                                <option value='false'>False</option>
                            </Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Label for="aName">Email: </Label>
                            <Input style={{ height: '30px' }} type="textfield" name="name" value={email} onChange={(e) => setName(e.target.value)} />
                        </Col>

                    </Row>
                    <Row>

                        <Col>
                            <FormGroup>


                            </FormGroup>
                        </Col>
                    </Row>

                </FormGroup>
                <Row className="justify-content-md-center"><Button color="primary" onClick={editUser}>Update</Button></Row>

            </Form>
        </Card>

    );
}
