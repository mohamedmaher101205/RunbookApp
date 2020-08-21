import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, makeStyles, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme)=>({
    Button : {
        visibility : "hidden"
    },
    ListItem : {
        "&:hover $Button" : {
            visibility : "inherit"
        }
    }
}))

function User(props){

    const {user,removeMembers} = props;
    const classes = useStyles();

    return<>
        <ListItem key={user.userId} button className={classes.ListItem}>
            <ListItemAvatar>
                <Avatar>{user.firstName[0].toUpperCase()+user.lastName[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={user.userEmail}>{user.firstName+' '+user.lastName}</ListItemText>
            <Button className={classes.Button} color="secondary" size="small" onClick={()=>removeMembers(user.userId)}>
                Remove
            </Button>
        </ListItem>
    </>
}

export default User;