import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Divider, makeStyles } from '@material-ui/core';
import { getAllApplications } from '../../Services/api';
import ApplicationForm from './ApplicationForm';
import AddIcon from '@material-ui/icons/Add';
import {Row, Col} from 'reactstrap';
import ApplicationTypeForm from './ApplicationTypeForm';
import ResourceForm from './ResourceForm';
import ResourceTypeForm from './ResourceTypeForm';
var jwt = require('jsonwebtoken');

const useStyles = makeStyles ({
    root: {
      maxWidth: 250,
      marginBottom : 15
    },
    divider : {
        margin : 5
    }
  });


function ApplicationTable(props){

    const classes = useStyles();
    const [applications,setApplications] = useState(null);
    const [appAdded,setAppAdded] = useState(false);
    const [drawerFlag,setDrawerFlag] = useState(false);
    const [appTypeDrawer,setAppTypeDrawer] = useState(false);
    const [resourceTypeDrawer,setResourceTypeDrawer] = useState(false);
    const [resourceDrawer,setResourceDrawer] = useState(false);

    var token = sessionStorage.getItem('token');
    var tenantId = sessionStorage.getItem('TenantId');
    var user = jwt.decode(token);

      useEffect(()=>{
        getAllApplications(tenantId).then(res=>{
            setApplications(res);
        });
      },[token, appAdded, tenantId]);

    return <>
    {(user.Permissions.includes("Create") || user.IsAdmin.toLowerCase() === 'true') &&
        <>
        <Row>
            <Col sm={7}></Col>
            <Col sm={3}>
                <Button variant="contained" style={{float:"right"}} color="primary" size="medium" startIcon={<AddIcon />} onClick={()=>setAppTypeDrawer(true)}>
                    Add Application Type
                </Button>
            </Col>
            <Col sm={2}>
                <Button variant="contained" style={{float:"right"}} color="primary" size="medium" startIcon={<AddIcon />} onClick={()=>setDrawerFlag(true)}>
                    Add Application
                </Button>
            </Col>
            <ApplicationForm isAppAdded={setAppAdded} drawerFlag={drawerFlag} setDrawerFlag={setDrawerFlag} />
            <ApplicationTypeForm drawerFlag={appTypeDrawer} setDrawerFlag={setAppTypeDrawer} />
        </Row>
        <br />
        <Row>
            <Col sm={7}></Col>
            <Col sm={3}>
                <Button variant="contained" style={{float:"right"}} color="primary" size="medium" startIcon={<AddIcon />} onClick={()=>setResourceTypeDrawer(true)}>
                    Add Resource Type
                </Button>
            </Col>
            <Col sm={2}>
                <Button variant="contained" style={{float:"right"}} color="primary" size="medium" startIcon={<AddIcon />} onClick={()=>setResourceDrawer(true)}>
                    Add Resource
                </Button>
            </Col>
            <ResourceForm drawerFlag={resourceDrawer} setDrawerFlag={setResourceDrawer} />
            <ResourceTypeForm drawerFlag={resourceTypeDrawer} setDrawerFlag={setResourceTypeDrawer} />
        </Row>
        </>
    }
        <br />
        <Row>
            {
                applications !== null && applications.map(app=>
                    <Col sm={3} key={app.appId}>
                    <Card key={app.appId} className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="body1">
                                {app.applicationName}
                            </Typography>
                            <Typography color="textSecondary" component="p" variant="body2">
                                {app.appTypeName}
                            </Typography>
                            <Divider variant="fullWidth" className={classes.divider} />
                            <Typography color="textSecondary" component="p" variant="body2">
                                Description : {app.description}
                            </Typography>
                            <Typography color="textSecondary" component="p" variant="body2">
                                Resources : {app.resources !== null && app.resources.map(resource =>
                                        resource.resourceName
                                    ).join(', ')}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Col>    
                )
            }
    </Row>
    </>
}

export default ApplicationTable;