import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddUsers from './AddUsers';

var jwt = require('jsonwebtoken');

function Users(){

    var token = sessionStorage.getItem('token');

    var user = jwt.decode(token);

    const[drawerFlag,setDrawerFlag] = useState(false);

    return<>
        <Row>
            <Col sm={10}>
                <AddUsers drawerFlag={drawerFlag} setDrawerFlag={setDrawerFlag} />
            </Col>
            <Col sm={2}>
                {(user.Permissions.includes("Create") || user.IsAdmin.toLowerCase() === 'true') &&
                <Button variant="contained" style={{float:"right"}} size="medium" startIcon={<AddIcon />} color="primary" onClick={()=>setDrawerFlag(!drawerFlag)} >
                    Add User
                </Button>
                }
            </Col>
        </Row>
    </>
}

export default Users;