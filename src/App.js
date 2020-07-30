import React, { useState } from 'react';
import Route from './Components/Route';
import MHeader from './Components/Core/Header';
import { Row, Col } from 'reactstrap';
import SideBar from './Components/Core/SideBar';
import './App.css'
 
function App() {

  const[sidebarDrawer,setSidebarDrawer] = useState(false);

  return (
    <>
    <div data-test='app-component' className="app-component">
      <Row>
        <MHeader sidebarFlagFunc={setSidebarDrawer} />
      </Row>
      <br />
      <Row className="main-component">
      {sessionStorage.getItem('token') !== null && typeof(sessionStorage.getItem('token')) !== 'undefined' ? 
        <>
        <Col sm={2}>
        
          <SideBar sidebarFlag={sidebarDrawer} sidebarFlagFunc={setSidebarDrawer} />
          </Col>
          <Col sm={10} className="allcomp">
          <Route />
          </Col>
          </>
          :
          <>
          <Col sm={12} className="allcomp">
          <Route />
          </Col>
          </>
        
        }
      </Row>
    </div>
    </>
  );
}

export default App;