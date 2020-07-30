import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useForm, Controller} from 'react-hook-form';
import { createCustomApplicationType } from '../../Services/api';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, SwipeableDrawer, IconButton, TextField, Button } from '@material-ui/core';

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

function ApplicationTypeForm(props){
    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const[drawerFlag,setDrawerFlag] = useState(false);

    const ApplicationTypeSubmit = data =>{
        var tenantId = sessionStorage.getItem('TenantId');
        console.log(data);
        createCustomApplicationType(data,tenantId).then(res=>{
            console.log(res);
            props.setDrawerFlag(false);
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

    return <>
        <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
        <Row className={classes.drawerHeader}>
            <Col xs={10}>
                <div className={classes.headerTitle}> <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                Create Application Type</div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(ApplicationTypeSubmit)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Application Type Name" size="small" variant="outlined" 
                fullWidth
                defaultValue=""
                name="AppTypeName"
                error={errors.AppTypeName && errors.AppTypeName.type === 'required'}
                helperText={errors.AppTypeName && "Application Name is required"}
                />
                }  
                control={control} name="AppTypeName" rules={{required:true}} defaultValue=""
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Button type="submit" variant="contained" color="primary" size="medium">Create Application Type</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default ApplicationTypeForm;