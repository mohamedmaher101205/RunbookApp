import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GroupForm from './GroupForm';
import { getTenantGroups } from '../../../Services/api';
import GroupUsers from './GroupUsers';
var jwt = require('jsonwebtoken');

function Group(props){
    var token = sessionStorage.getItem('token');

    var user = jwt.decode(token);

    var tenantId = sessionStorage.getItem('TenantId');
    const[groupDrawer,setGroupDrawer] = useState(false);
    const[groups,setGroups] = useState(null);
    const[group,setGroup] = useState(null);
    const[tabValue,setTabValue] = useState(0);

    const handleTabChange = (event,newValue) =>{
        setTabValue(newValue);
    }

    useEffect(()=>{
        getTenantGroups(tenantId).then(res=>{
            setGroups(res);
        })
        setGroup(null);
    },[groupDrawer, tenantId])
    
    return<>
        <Row>
            <Col sm={10}>
                <GroupForm tenantId={tenantId} groupDrawerFlag={groupDrawer} setGroupDrawer={setGroupDrawer} />
            </Col>
            <Col sm={2}>
                {(user.Permissions.includes("Create") || user.IsAdmin.toLowerCase() === 'true') &&
                <Button variant="contained" style={{float:"right"}} size="medium" color="primary" startIcon={<AddIcon /> } onClick={()=>setGroupDrawer(true)}>
                    Create Group
                </Button>
                }
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                <Tabs orientation="horizontal" value={tabValue} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
                    {groups !== null && groups.map(group=>
                        <Tab disableTouchRipple key={group.groupId} label={group.groupName} onClick={()=>setGroup(group)} />
                    )
                    }
                </Tabs>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                {group !== null &&
                    <GroupUsers group={group} />
                }
            </Col>
        </Row>
    </>
}

export default Group;