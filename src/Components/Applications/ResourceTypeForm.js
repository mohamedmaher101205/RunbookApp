import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useForm, Controller} from 'react-hook-form';
import { createCustomResourceType } from '../../Services/api';
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
        margin: 10
    },
    paper : {
        height : 350,
        margin : 10,
       // overflow: 'auto'
    }
    })
);

function ResourceTypeForm(props){
    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const[drawerFlag,setDrawerFlag] = useState(false);

    const ResourceTypeSubmit = data =>{
        var tenantId = sessionStorage.getItem('TenantId');
        console.log(data);
        createCustomResourceType(data,tenantId).then(res=>{
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
                    Create Resource Type
                </div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(ResourceTypeSubmit)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Resource Type Name" size="small" variant="outlined" 
                fullWidth
                defaultValue=""
                name="ResourceTypeName"
                error={errors.ResourceTypeName && errors.ResourceTypeName.type === 'required'}
                helperText={errors.ResourceTypeName && "Resource Type Name is required"}
                />
                }  
                control={control} name="ResourceTypeName" rules={{required:true}} defaultValue=""
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Button type="submit" variant="contained" color="primary" size="medium">Create Resource Type</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default ResourceTypeForm;