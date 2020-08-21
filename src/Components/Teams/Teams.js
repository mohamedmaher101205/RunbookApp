import React,{useEffect,useState} from 'react';
import { List, ListItem, ListItemText,Button as MButton} from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import TeamForm from './TeamForm';
import { getAllTeams } from '../../Services/api';

var jwt = require('jsonwebtoken');


function Teams(props){

    const [teams,setTeams] = useState(null);
    const [drawerFlag,setDrawerFlag] = useState(false);
    const [teamCreated,setTeamCreated] = useState(false);

    var token = sessionStorage.getItem('token');
    var tenantId = sessionStorage.getItem('TenantId');

    useEffect(()=>{
        setTeamCreated(false);
        getAllTeams(tenantId).then(res=>{
            setTeams(res);
        });
    },[tenantId, teamCreated]);

    const goToTeam = (path) =>{
        props.onHistory.push(path)
    }

return <>
    <Row>
        <Col sm={10}></Col>
        <Col sm={2}>
            <MButton variant="contained" style={{float:"right"}} size="medium" color="primary" startIcon={<AddIcon /> } onClick={()=>setDrawerFlag(true)}>
                Add Team
            </MButton>
        </Col>
        <TeamForm isTeamCreated={setTeamCreated} setDrawerFlag={setDrawerFlag} drawerFlag={drawerFlag} />
    </Row>
   
        <List dense>
            {teams !== null ? <>
                {teams.map(team=>
                    <ListItem key={team.teamId} button onClick={()=>goToTeam(`team/${team.teamId}`)}> 
                        <ListItemText primary={team.teamName} 
                            secondary={team.description}
                        />
                    </ListItem>
                )}
                </>
            :
            <></>
            }
        </List>
    </>
}

export default Teams;