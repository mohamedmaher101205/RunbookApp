import React, { useEffect, useState } from 'react';
import { Row, Col} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './BookForm.css';
import { CreateBook, getAllEnvironments } from '../../../Services/api';
import { Select, Chip, MenuItem, Input, 
    makeStyles, SwipeableDrawer, IconButton, TextField, Button as MButton, FormControl, InputLabel } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
var jwt = require('jsonwebtoken');

const drawerWidth = 430;

const useStyles = makeStyles (() => ({
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

function BookForm(props){
    const tenantId = sessionStorage.getItem('TenantId');
    const classes = useStyles();
    const {register,handleSubmit,control,reset,errors} = useForm();

   const[environments,setEnvironments] = useState(null);
   const[selectedEnvs,setSelectedEnvs] = useState([]);
   const[drawerFlag,setDrawerFlag] = useState(false);
   
   var token = sessionStorage.getItem('token');
   var user = jwt.decode(token);

    const bookFormData = (data) =>{
        console.log(data);
        const ids = selectedEnvs.map(env=> {return {EnvId : env.envId}});
        //console.log(ids);
        data.Environments = ids;
        data.UserId = Number(user.UserId);
        data.TenantId = Number(tenantId);
        props.isBookCreated(false);
        CreateBook(data).then(res=>{
            console.log(res);
            props.isBookCreated(true);
            props.setDrawerFlag(false);
        });
        setSelectedEnvs([]);
        reset();
    }

    const handleEnvChange = (event) =>{
        setSelectedEnvs(event.target.value);
    }

    useEffect(()=>{
        getAllEnvironments(tenantId).then(res=>{
            setEnvironments(res);
        })
    },[tenantId])

    useEffect(()=>{
        setDrawerFlag(props.drawerFlag);
    },[props.drawerFlag])

    const closeDrawer = () =>{
        setDrawerFlag(false);
        props.setDrawerFlag(false);
    }

    return <>
    <SwipeableDrawer className={classes.drawer} classes={{paper:classes.drawerPaper}} onOpen={()=>setDrawerFlag(true)} open={drawerFlag} anchor="right" onClose={closeDrawer}>
        <Row className={classes.drawerHeader}>
            <Col xs={10}>
                <div className={classes.headerTitle}>
                <AddIcon fontSize="large" color="disabled" style={{fontWeight:'lighter'}} />
                    Create Book
                </div>
            </Col>
            <Col xs={2}>
                <IconButton onClick={closeDrawer}>
                    <CloseIcon color="secondary" />
                </IconButton>
            </Col>
        </Row>
        <form onSubmit={handleSubmit(bookFormData)}>
         <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} label="Book Name" size="small" variant="outlined" 
                fullWidth
                name="BookName"
                defaultValue=""
                error={errors.BookName && errors.BookName.type === 'required'}
                helperText={errors.BookName && "Book Name is required"}
                />
                }  
                control={control} name="BookName" defaultValue="" rules={{required:true}} 
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <Controller as={
                <TextField ref={register({required:true})} type="date" size="small" variant="outlined" 
                fullWidth
                defaultValue=""
                name="TargetedDate"
                error={errors.TargetedDate && errors.TargetedDate.type === 'required'}
                helperText={errors.TargetedDate && "Targeted Date is required"}
                />
            } control={control} name="TargetedDate" defaultValue="" rules={{required:true}}
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
            <Controller as={
            <FormControl variant="outlined" fullWidth >
                <InputLabel>Environments</InputLabel>
                <Select multiple onChange={handleEnvChange} value={selectedEnvs} 
                    name="Environments"
                    
                    renderValue={(selected)=>
                    selected.map(value=><Chip key={value.envId} label={value.environment} />)
                    } input={<Input id="select-multiple-chip" />}>
                    {environments !== null &&
                        environments.map(env=>
                            <MenuItem key={env.envId} value={env}> {env.environment} </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            } control={control} name="Environments" defaultValue={[]} rules={({required:true})}
            />
        </Row>
        <Row className={classes.drawerContainer}>
            <MButton type="submit" variant="contained" color="primary" size="medium">Create Book</MButton>
        </Row>
        </form>
    </SwipeableDrawer>
    </>
}

export default BookForm