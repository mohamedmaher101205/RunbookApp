import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, 
    IconButton, Button } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Row, Col } from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 430;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        //backgroundColor : grey[100],
    },
    drawerHeader : {
        backgroundColor : grey[50]
    },
    headerTitle:{
        fontSize : 25 ,
        marginLeft : 10,
        fontWeight: 'light',
    },
    drawerContainer:{
        margin: 10
    },
    paper : {
        height : 350,
        width : 400,
        maxHeight : 350,
        maxWidth : 400,
        margin : 10,
        overflow: 'auto'
    }
    })
);

function AddUsers(props){
    const[searchKey,setSearchKey] = useState('');
    const[drawerFlag,setDrawerFlag] = useState(false);

    const classes = useStyles();

    useEffect(()=>{
        setDrawerFlag(props.drawerFlag);
    },[props.drawerFlag])

    const handlesearchKey = (e) =>{
        var key = e.target.value;
        setSearchKey(key);
    }

    const closeDrawer = () =>{
        setDrawerFlag(false);
        props.setDrawerFlag(false);
    }

    const AddUsers = () =>{
        props.setDrawerFlag(false);
        setDrawerFlag(false);
    }
    return <>
    <div className={classes.root}>
        <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
            <Row className={classes.drawerHeader}>
                <Col xs={10}>
                    <div className={classes.headerTitle}>
                    <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                        Add Users
                    </div>
                </Col>
                <Col xs={2}>
                    <IconButton onClick={closeDrawer}>
                        <CloseIcon color="secondary" />
                    </IconButton>
                </Col>
            </Row>
            <Row className={classes.drawerContainer}>
                <TextField label="User Email" onChange={(e)=>handlesearchKey(e)} fullWidth value={searchKey} />
            </Row>
        <Row className={classes.drawerContainer}>
            <Col xs={2}>
                <Button color="primary" variant="contained" onClick={AddUsers}>
                    Invite
                </Button>
            </Col>
        </Row>

        </SwipeableDrawer>
    </div>
        
        
    </>
}

export default AddUsers;