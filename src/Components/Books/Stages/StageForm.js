import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { createStage } from '../../../Services/api';
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

function StageForm(props){

    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const[drawerFlag,setDrawerFlag] = useState(false);

    const stageFormData = (data) =>{
        props.stagecreated(false);
        createStage(data,props.bookId).then(res=>{
            console.log(res);
            props.stagecreated(true);
        });
        props.setDrawerFlag(false);
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
                <div className={classes.headerTitle}>
                <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                    Create Stage
                </div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(stageFormData)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Stage Name" size="small" variant="outlined" 
                fullWidth
                name="StageName"
                defaultValue=""
                error={errors.StageName && errors.StageName.type === 'required'}
                helperText={errors.StageName && "Stage Name is required"}
                />
                }  
                control={control} name="StageName" defaultValue="" rules={{required:true}}
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
            <Button type="submit" variant="contained" color="primary" size="medium">Create Stage</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default StageForm