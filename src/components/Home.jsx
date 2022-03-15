import React, { useState } from 'react';
import {Row, Col, Container} from 'reactstrap';
import HeaderDashboard from './HeaderDashboard';
import TaskList from './tasks/TaskList';

export default function Home(props){

  const [show, setShow] = useState(<TaskList />);
  const handleOnShow = (option) => {
    if (option === 1){
      setShow(<TaskList />);
    }else if (option === 2){
      setShow(<TaskList />);
    }
  }
    return (
        <Container>
        <Row>
          <Col><HeaderDashboard onShow= {handleOnShow} /></Col>
        </Row>
        <Row>
          <Col xs="12">
              {show}
            </Col>
        </Row>
      </Container>
    );
  
}