import React, { useState } from 'react';
import { Row,Col } from 'reactstrap';
import {Typography, Button} from '@material-ui/core';
import { getTeam } from '../../Services/api';
import AddUser from './AddUser';
import TeamMembers from './TeamMembers';

function Team(props){

    const teamId = props.match.params.id;
    const [team,setTeam] = useState(null);
    const [addMemberDrawer,setAddMemberDrawer] = useState(false);
    const [userAdded,setUserAdded] = useState(null);
    
    useState(()=>{
        getTeam(teamId).then(res=>{
            setTeam(res);
        });
    },[teamId])

    return<>
        <Row>
            <Col sm={4}>
                <Typography color="textPrimary" component="h4" variant="h5">
                    {team !== null && team.teamName} 
                 </Typography>
            </Col>
            <Col sm={4}></Col>
                <AddUser drawerFlag={addMemberDrawer} setDrawerFlag={setAddMemberDrawer} setuserAdded={setUserAdded} teamId={teamId} />
            <Col sm={4}>
                <Button variant="contained" color="primary" size="small" onClick={()=>setAddMemberDrawer(true)} style={{float:"right"}}>
                    Add Member
                </Button>
            </Col>
        </Row>
        <Row>
            <Col sm={9}>
            </Col>
            <Col sm={3} style={{alignContent:'end'}}>
                <Typography style={{textAlign:'center'}} color="textPrimary" component="h5" variant="h6">
                    Members
                </Typography>
                <TeamMembers teamId={teamId} userAddedFlag={userAdded} />
            </Col>
        </Row>
        
    </>
}

export default Team;