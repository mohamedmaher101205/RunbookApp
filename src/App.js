import React, { useState } from 'react';
import Route from './Components/Route';
import MHeader from './Components/Core/Header';
import { Row, Col, Container } from 'reactstrap';
import SideBar from './Components/Core/SideBar';
import './App.css'
 
function App() {

  const[sidebarDrawer,setSidebarDrawer] = useState(false);

  return (
    <>
    <Container fluid={true} data-test='app-component'>
      <Row>
        <MHeader sidebarFlagFunc={setSidebarDrawer} />
      </Row>
      <br />
      <Row>
      <Col sm={2}>
        {sessionStorage.getItem('token') !== null && typeof(sessionStorage.getItem('token')) !== 'undefined' ? 
            <SideBar sidebarFlag={sidebarDrawer} sidebarFlagFunc={setSidebarDrawer} />
          :
          <></>
        }
        </Col>
        <Col sm={10} className="allcomp">
            <Route />
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;