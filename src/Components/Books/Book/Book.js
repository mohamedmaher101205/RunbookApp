import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { getAllStages, getBookById, getApplicationsByBookId, getAllEnvironments } from '../../../Services/api';
import StageForm from '../Stages/StageForm';
import './Book.css';
import {StatusColor} from '../../../Constants/Status';
import Stage from '../Stages/Stage';
import Application from '../../Applications/Application';
import { Button as MButton, Menu, MenuItem, Typography, Tabs, Tab, Badge, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {ExpandLess,ExpandMore} from '@material-ui/icons';
import AddUsers from '../../Users and Groups/Users/AddUsers';

var jwt = require('jsonwebtoken');

const useStyles = makeStyles((theme) => ({
    Badge:{
        margin : theme.spacing(3.5),
    }
}))

function Book(props){

    var token = sessionStorage.getItem('token');
    var user = jwt.decode(token);

    const classes = useStyles();

    var tenantId = sessionStorage.getItem('TenantId');
    var bookId =  props.match.params.id; //props.bookId; //
    var envId = Number(props.match.params.envid);
   // var bookName = props.match.params.name;

    const [stages,setStages] =useState(null);
    const [stageDrawerFlag,setStageDrawerFlag] = useState(false);
    const [drawerFlagAddUser,setDrawerFlagAddUser] = useState(false);
    const [stageCreatedFlag,setStageCreated] = useState(false);
    const [stage,setStage] = useState(null);
    const [book,setBook] = useState(null);
    const [env,setEnv] = useState({statusId : 0});
    const [openEnvMenu,setOpenEnvMenu] = useState(null);
    const [applicationDrawer,setApplicationDrawer] = useState(false);
    const [tabValue,setTabValue] = useState(0);
    const [bookapplications,setBookApplications] = useState(null);
    const [cuurentEnv,setCurrentEnv] = useState(null);
    const[drawerFlag,setDrawerFlag] = useState(false);

    const [rolelevel,setrolelevel] = useState(null);
    // const [environments,setEnvironments] = useState(null);
 
    useEffect(()=>{
        getAllStages(bookId,envId).then(res=>{
            setStages(res);
            
        });
        getBookById(bookId).then(res=>{
            setBook(res);
        })  
    },[stageCreatedFlag, bookId, envId]);
    // console.log(stages);

    useEffect(()=>{
        if(book !== null ){
            setEnv(book.environments.find(env=>env.envId === envId));
        }
        getAllEnvironments(tenantId).then(res=>{
             setCurrentEnv(res.filter(env => {if(env.envId === envId){return env}})[0]);
        });
    },[book, envId, tenantId])

    useEffect(()=>{
        getApplicationsByBookId(bookId).then(res=>{
            setBookApplications(res);
        })
    },[bookId,applicationDrawer])

    const ToggleEnvMenu = (event) =>{
        setOpenEnvMenu(event.currentTarget);
    }
    const closeEnvMenu = () =>{
        setOpenEnvMenu(null);
    }

    const changeEnv = (env) =>{
        setStage(stages[0]);
        setOpenEnvMenu(null);
        setCurrentEnv(env);
        props.history.push(`/book/${bookId}/env/${env.envId}`);
    }

    const isStageCreated = (val) =>{
        setStageCreated(val);
    }

    const handleTabChange = (event,newValue) =>{
        setTabValue(newValue);
    }

    return <>
        <Row>
            <Col sm={4}>
                <Typography color="textPrimary" component="h4" variant="h5">
                    {book !== null && book.bookName} 
                 </Typography>
            </Col>

            <Col sm={2}>
                <span style={{float:"right"}}>Environment</span>
            </Col>
        </Row>
        <Row>
            <Col sm={4} >
                {bookapplications !== null && bookapplications.map(app=>
                    <Badge className={classes.Badge} badgeContent={app.applicationName} color="primary" key={app.appId} />
                )}
            </Col>
            <Col sm={2}>
                    <Button onClick={ToggleEnvMenu} size="sm" style={{float:"right"}} color={StatusColor[env.statusId]}>
                        {cuurentEnv !== null && cuurentEnv.environment } 
                        {Boolean(openEnvMenu) ? <ExpandLess /> : <ExpandMore /> } 
                    </Button>
                    <Menu open={Boolean(openEnvMenu)} onClose={closeEnvMenu} anchorEl={openEnvMenu} style={{transformOrigin:'bottom'}}>
                        {book !== null && book.environments.length > 0 && 
                        book.environments.map(env=>
                            <MenuItem key={env.envId} onClick={()=>changeEnv(env)}> {env.environment} </MenuItem>    
                        )}
                    </Menu>
            </Col>
            <Col sm={2}>
           
                <AddUsers rolelevel="Book" drawerFlag={drawerFlag} setDrawerFlag={setDrawerFlag} />
                  
                <Button variant="contained" style={{float:"right"}} size="medium" startIcon={<AddIcon /> } color="primary" onClick={()=>setDrawerFlag(!drawerFlag)} >
                    Add User
                </Button>
            </Col>
            <Col sm={2}>
                <Application bookId={bookId} drawerFlag={applicationDrawer} setDrawerFlag={setApplicationDrawer} />
                <MButton variant="contained" style={{float:"right"}} size="medium" color="primary" startIcon={<AddIcon /> } onClick={()=>setApplicationDrawer(true)}>
                    Add Applications
                </MButton>
            </Col>
            <Col sm={2}>
                <StageForm bookId={bookId} setDrawerFlag={setStageDrawerFlag} drawerFlag={stageDrawerFlag} stagecreated={setStageCreated} />
                <MButton variant="contained" style={{float:"inherit"}} size="medium" color="primary" startIcon={<AddIcon />} onClick={()=>setStageDrawerFlag(true)}>
                    Add Stage
                </MButton>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                <Tabs orientation="horizontal" value={tabValue} indicatorColor="primary" textColor="primary"  onChange={handleTabChange}>
                    {stages !== null && stages.map(stage=>
                        <Tab key={stage.stageId} label={stage.stageName}  onClick={()=>setStage(stage)} />    
                    )}
                </Tabs>
            </Col>
        </Row>
        <Row>
            <Col sm={12}>
                {stage !== null &&
                    <Stage stage={stage} stagecreated={isStageCreated} stages={stages} bookId={bookId} env={env} envId={envId} />
                }
            </Col>
        </Row>
    </>
}

export default Book;