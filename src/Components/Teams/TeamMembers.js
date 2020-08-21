import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { List } from '@material-ui/core';
import User from './User';
import { getTeamUsers, removeTeamMember } from '../../Services/api';

function TeamMembers(props){

    const {teamId,userAddedFlag} = props;
    const [teamMembers,setTeamMembers] = useState(null);
    const [userRemoved,setUserRemoved] = useState(false);

    useEffect(()=>{
        getTeamUsers(teamId).then(res=>{
            setTeamMembers(res);
        })
    },[teamId,userRemoved,userAddedFlag])

    const removeUserFromTeam = (userId) =>{
        setUserRemoved(false);
        removeTeamMember(teamId,userId).then(res=>{
            console.log(res);
            setUserRemoved(true);
        });
    }

    return<>
        <Row>
            <List dense>
                {teamMembers !== null && teamMembers.map(user =>
                    <User user={user} removeMembers={removeUserFromTeam} />
                )}
            </List>
        </Row>
    </>
}

export default TeamMembers;