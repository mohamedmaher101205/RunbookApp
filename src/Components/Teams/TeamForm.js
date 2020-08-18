import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, SwipeableDrawer, IconButton, TextField, Button, Snackbar } from '@material-ui/core';
import { createTeam } from '../../Services/api';

const drawerWidth = 430;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
       // backgroundColor : grey[100],
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
        margin: 10,
        padding : 5
    },
    paper : {
        height : 350,
        margin : 10,
       // overflow: 'auto'
    }
    })
);

function TeamForm(props){

    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const[drawerFlag,setDrawerFlag] = useState(false);
    const[httpStatus,setHttpStatus] = useState('');
    const[httpStatusFlag,setHttpStatusFlag] = useState(false);
    const[httpStatusMessageColor,setHttpMessageColor] = useState('success');

    const teamFormData = (data) =>{
        data.TenantId = Number(sessionStorage.getItem('TenantId'));
        props.isTeamCreated(false);
        createTeam(data).then(res=>{
            if(typeof(res.response) !== 'undefined' && res.response.status === 409){
               setHttpStatus(res.response.data)
               setHttpMessageColor('danger');
               setHttpStatusFlag(true);
            }else{
                setHttpStatus(res);
                setHttpStatusFlag(true);
                setHttpMessageColor('success');
                props.setDrawerFlag(false);
                props.isTeamCreated(true);
            }
        });
        reset();
    }

    const closeDrawer = () =>{
        setDrawerFlag(false);
        props.setDrawerFlag(false);
    }

    useEffect(()=>{
        setDrawerFlag(props.drawerFlag);
    },[props.drawerFlag])

    const handleRegisterStatusClose = () =>{
        setHttpStatusFlag(false);
      }


    return <>
        <Snackbar open={httpStatusFlag} autoHideDuration={6000} anchorOrigin={{vertical:'bottom',horizontal:'right'}} onClose={handleRegisterStatusClose}>
            <Alert color={httpStatusMessageColor} isOpen={httpStatusFlag} toggle={handleRegisterStatusClose}> {httpStatus} </Alert>
        </Snackbar>
        <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
        <Row className={classes.drawerHeader}>
            <Col xs={10}>
                <div className={classes.headerTitle}>
                <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                    Create Team
                </div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(teamFormData)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Team Name" size="small" variant="outlined" 
                fullWidth
                name="TeamName"
                defaultValue=""
                error={errors.TeamName && errors.TeamName.type === 'required'}
                helperText={errors.TeamName && "Team Name is required"}
                />
                }  
                control={control} name="TeamName" defaultValue="" rules={{required:true}}
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField label="Descrption" ref={register({required:true})} size="small" variant="outlined" 
                fullWidth 
                multiline 
                defaultValue=""
                name="Description"
                rows={4} 
                error={errors.Description && errors.Description.type === 'required'}
                helperText={errors.Description && "Description is required"}
                />
            } control={control} name="Description" defaultValue="" rules={{required:true}}
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Button type="submit" variant="contained" color="primary" size="medium">Create Team</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default TeamForm