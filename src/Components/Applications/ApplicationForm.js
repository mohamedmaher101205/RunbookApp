import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useForm, Controller} from 'react-hook-form';
import { getApplicationTypes, createApplication, getResources } from '../../Services/api';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, SwipeableDrawer, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel, ListItemText, Input } from '@material-ui/core';

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

function ApplicationForm(props){
    var tenantId = sessionStorage.getItem('TenantId');
    const classes = useStyles();
    const {register,handleSubmit,reset,control,errors} = useForm();
    const [apptypes,setAppTypes] = useState(null);
    const[drawerFlag,setDrawerFlag] = useState(false);
    const[selectedApp,setSelectedApp] = useState('');
    const[resources,setResources] = useState(null);
    const[selectedResources,setSelectedResources] = useState([]);

    const ApplicationSubmit = data =>{
        var tenantId = sessionStorage.getItem('TenantId');
        data.AppTypeName = selectedApp;
        data.Resources = selectedResources;
        //console.log(data);
        props.isAppAdded(false);
        createApplication(data,tenantId).then(res=>{
            console.log(res);
            props.isAppAdded(true);
            props.setDrawerFlag(false);
        });
        setSelectedApp('');
        reset();
    }

    const handleSelectAppChange = (event) =>{
        setSelectedApp(event.target.value);
    }

    const handleSelectedResources = (event) =>{
        setSelectedResources(event.target.value);
    }

    useEffect(()=>{
        getApplicationTypes(tenantId).then(res=>{
            setAppTypes(res);
        });
        getResources(tenantId).then(res=>{
            setResources(res);
        });
    },[tenantId,props.drawerFlag])

    const closeDrawer = () =>{
        setSelectedResources([]);
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
                Add Application</div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(ApplicationSubmit)}>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Application Name" size="small" variant="outlined" 
                fullWidth
                defaultValue=""
                name="ApplicationName"
                error={errors.ApplicationName && errors.ApplicationName.type === 'required'}
                helperText={errors.ApplicationName && "Application Name is required"}
                />
                }  
                control={control} name="ApplicationName" rules={{required:true}} defaultValue=""
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
                    <InputLabel>Application Type</InputLabel>
                <Select label="Application Type" name="AppTypeName" variant="outlined" fullWidth 
                value={selectedApp} onChange={handleSelectAppChange} defaultValue="">
                    {apptypes !== null &&
                    apptypes.map(app=>
                        <MenuItem key={app.appTypeId} value={app.appTypeName}> {app.appTypeName} </MenuItem>
                    )
                    }
                </Select>
                </FormControl>
            } control={control} name="AppTypeName" defaultValue=""
             />
        </Row>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Resources</InputLabel>
                    <Select multiple name="Resources" onChange={handleSelectedResources}
                        renderValue={(selected) => selected.map(item => item.resourceName).join(', ')} value={selectedResources} input={<Input />}
                    >
                        {resources !== null && resources.map(resource =>(
                            <MenuItem key={resource.resourceId} value={resource}>
                                <ListItemText primary={resource.resourceName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            } control={control} name="Resources" defaultValue={[]}
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Button type="submit" variant="contained" color="primary" size="medium">Create Application</Button>
        </Row>
        </form>
        </SwipeableDrawer>
    </>
}

export default ApplicationForm;