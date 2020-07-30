import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useForm, Controller} from 'react-hook-form';
import { getResourceTypes, createResource } from '../../Services/api';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, SwipeableDrawer, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

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

function ResourceForm(props){
    var tenantId = sessionStorage.getItem('TenantId');
    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const[drawerFlag,setDrawerFlag] = useState(false);
    const[resourceTypes,setResourceTypes] = useState(null);
    const[selectedResourceType,setSelectedResourceType] = useState(null);

    const ResourceSubmit = data =>{
        data.ResourceTypeId = selectedResourceType.resourceTypeId;
        console.log(data);
        createResource(data,tenantId).then(res=>{
            console.log(res);
            props.setDrawerFlag(false);
        })
        reset();
    }

    const handleSelectAppChange = (event) =>{
        setSelectedResourceType(event.target.value)
    }
    
    useEffect(()=>{
        getResourceTypes(tenantId).then(res=>{
            setResourceTypes(res);
        });
    },[tenantId,props.drawerFlag])

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
                    Add Resource
                </div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(ResourceSubmit)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Resource Name" size="small" variant="outlined" 
                fullWidth
                defaultValue=""
                name="ResourceName"
                error={errors.ResourceName && errors.ResourceName.type === 'required'}
                helperText={errors.ResourceName && "Resource Name is required"}
                />
                }  
                control={control} name="ResourceName" rules={{required:true}} defaultValue=""
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField label="Descrption" ref={register({required:true})} size="small" variant="outlined" 
                fullWidth 
                multiline 
                name="Description"
                rows={4} 
                defaultValue=""
                error={errors.Description && errors.Description.type === 'required'}
                helperText={errors.Description && "Description is required"}
                />
            } control={control} name="Description" rules={{required:true}} defaultValue=""
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Resource Type</InputLabel>
                <Select label="Application Type" name="ResourceTypeId" variant="outlined" fullWidth 
                 onChange={handleSelectAppChange} defaultValue="">
                    {resourceTypes !== null &&
                    resourceTypes.map(resource=>
                        <MenuItem key={resource.resourceTypeId} value={resource}> {resource.resourceTypeName} </MenuItem>
                    )
                    }
                </Select>
                </FormControl>
            } control={control} name="ResourceTypeId" defaultValue=""
             />
        </Row>
        <Row className={classes.drawerContainer}>
            <Button type="submit" variant="contained" color="primary" size="medium">Create Resource</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default ResourceForm;